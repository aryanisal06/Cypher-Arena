import "dotenv/config";
import express from "express";
import cors from 'cors';
import { createServer as createViteServer } from "vite";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
const app = express();

// 1. Initialize Google Auth Client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 2. Initialize Neon Postgres Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
export default app;

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://yourdomain.com"],
  credentials: true // ← This is crucial for cookies/auth tokens
}));


async function startServer() {

  const PORT = 3000;


  app.set("trust proxy", 1);
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(express.json({ limit: "10kb" }));

  // Rate Limiters
  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: { error: "Too many requests, please try again later." },
  });

  const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    message: { error: "Too many login attempts, please try again later." },
  });

  app.use("/api/", globalLimiter);

  // Validation Schemas
  const AuthSchema = z.object({
    email: z.string().email("Invalid email address").max(100),
    password: z.string().min(8, "Password must be at least 8 characters").max(100),
  }).strict();
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or whatever email provider you use
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // ==========================================
  // ROUTE 1: REGISTER WITH NEON
  // ==========================================
  app.post("/api/auth/register", authLimiter, async (req, res) => {
    try {
      const { email, password } = AuthSchema.parse(req.body);
      const normalizedEmail = email.toLowerCase().trim();

      // Check if user exists in Neon
      const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [normalizedEmail]);
      if (existingUser.rows.length > 0) {
        return res.status(409).json({ error: "An account with this email already exists." });
      }

      // Hash password and insert into Neon
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [normalizedEmail, hashedPassword]
      );

      res.status(201).json({ success: true, message: "Registration successful!" });
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.issues[0].message });
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==========================================
  // ROUTE 2: STANDARD LOGIN WITH NEON
  // ==========================================
  app.post("/api/auth/login", authLimiter, async (req, res) => {
    try {
      const { email, password } = AuthSchema.parse(req.body);
      const normalizedEmail = email.toLowerCase().trim();

      // Find user in Neon
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [normalizedEmail]);
      const user = result.rows[0];

      // Check password and issue JWT
      if (user && await bcrypt.compare(password, user.password)) {
        if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        return res.json({ success: true, token });
      }

      res.status(401).json({ error: "Invalid email or password." });
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: "Invalid input format" });
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // ==========================================
  // ROUTE 3: GOOGLE AUTH WITH NEON
  // ==========================================
  app.post("/api/auth/google", authLimiter, async (req, res) => {
    try {
      const { token } = req.body;
      if (!token) return res.status(400).json({ error: "Google token required." });

      // Verify Google Token
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload || !payload.email) return res.status(400).json({ error: "Invalid Google payload." });

      const email = payload.email.toLowerCase().trim();

      // Check if user exists in Neon
      let result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      let user = result.rows[0];

      // If they don't exist, create an account for them in Neon automatically
      if (!user) {
        const dummyHash = await bcrypt.hash(Math.random().toString(36), 10);
        const insertResult = await pool.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
          [email, dummyHash]
        );
        user = insertResult.rows[0];
      }

      // Issue Cypher Arena JWT
      if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");
      const cypherToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({ success: true, token: cypherToken });
    } catch (error) {
      console.error("Google Auth Error:", error);
      res.status(401).json({ error: "Google authentication failed." });
    }
  });

  // ==========================================
  // ROUTE 4: GET PROFILE DATA (PROTECTED)
  // ==========================================
  app.get("/api/profile/me", authenticateToken, async (req, res) => {
    try {
      const result = await pool.query("SELECT id, email FROM users WHERE id = $1", [req.user.userId]);

      const user = result.rows[0];
      if (!user) return res.status(404).json({ error: "User not found" });

      const gamerTag = user.email.split('@')[0];

      res.json({
        username: gamerTag,
        email: user.email,
        level: "Level 1: Novice Hacker",
        xp: 0,
        streak: 0,
        modulesDone: 0
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // --- Route 1: Request Password Reset ---
  app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
      // 1. Check if user exists
      const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (userResult.rows.length === 0) {
        // Security best practice: Don't reveal if the email exists or not
        return res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
      }

      const userId = userResult.rows[0].id;

      // 2. Generate a secure random token
      const resetToken = crypto.randomBytes(32).toString('hex');

      // 3. Set expiration time (e.g., 1 hour from now)
      const expireTime = new Date();
      expireTime.setHours(expireTime.getHours() + 1);

      // 4. Save token and expiry to database
      await pool.query(
        'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE id = $3',
        [resetToken, expireTime, userId]
      );

      // 5. Send the email
      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      console.log("🛠️ TEST: Reset Link Generated ->", resetLink);
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Cypher Arena - Password Reset Request',
        text: `You requested a password reset. Click the link below to set a new password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email. This link will expire in 1 hour.`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });

    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ error: 'Server error during password reset request.' });
    }
  });

  // --- Route 2: Set the New Password ---
  app.post('/api/auth/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
      // 1. Find user with this token AND ensure the token hasn't expired
      const userResult = await pool.query(
        'SELECT id FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()',
        [token]
      );

      if (userResult.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired reset token.' });
      }

      const userId = userResult.rows[0].id;

      // 2. Hash the new password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // 3. Update password in DB and clear the token so it can't be used again
      await pool.query(
        'UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2',
        [hashedPassword, userId]
      );

      res.status(200).json({ message: 'Password successfully reset! You can now log in.' });

    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ error: 'Server error while resetting password.' });
    }
  });

  // ==========================================
  // ROUTE 5: GET ARENA PROGRESS (PROTECTED)
  // ==========================================
  app.get("/api/arena/progress", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;

      const userResult = await pool.query(
        "SELECT xp, lives, current_streak FROM users WHERE id = $1",
        [userId]
      );

      const levelsResult = await pool.query(
        "SELECT level_id, stars, completed FROM user_levels WHERE user_id = $1",
        [userId]
      );

      res.json({
        stats: userResult.rows[0],
        completedLevels: levelsResult.rows
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch arena progress" });
    }
  });
  app.post("/api/arena/complete", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const { levelId } = req.body;

      // 1. Mark the level as completed in the user_levels table
      // (Using ON CONFLICT so it updates if it already exists, or inserts if it's new)
      await pool.query(
        `INSERT INTO user_levels (user_id, level_id, completed, stars) 
       VALUES ($1, $2, true, 3) 
       ON CONFLICT (user_id, level_id) 
       DO UPDATE SET completed = true`,
        [userId, levelId]
      );

      // 2. Add 100 XP to the user's total stats
      await pool.query(
        `UPDATE users SET xp = xp + 100 WHERE id = $1`,
        [userId]
      );

      res.status(200).json({ message: "Progress saved successfully!" });
    } catch (error) {
      console.error("Error saving progress:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  // ==========================================
  // ROUTE 6: COMPLETE A LAB/NODE (PROTECTED)
  // ==========================================
  app.post("/api/arena/complete", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const { levelId, starsEarned, xpEarned } = req.body;

      await pool.query(`
        INSERT INTO user_levels (user_id, level_id, stars, completed)
        VALUES ($1, $2, $3, true)
        ON CONFLICT (user_id, level_id)
        DO UPDATE SET
          stars = GREATEST(user_levels.stars, EXCLUDED.stars),
          completed = true
      `, [userId, levelId, starsEarned]);

      await pool.query(
        "UPDATE users SET xp = xp + $1 WHERE id = $2",
        [xpEarned, userId]
      );

      res.json({ success: true, message: "Progress saved!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save progress" });
    }
  });

  // ==========================================
  // VITE & STATIC FILES
  // ==========================================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Augment Express Request to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


// JWT authentication middleware
const authenticateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid Token" });
    req.user = user;
    next();
  });
};


startServer();