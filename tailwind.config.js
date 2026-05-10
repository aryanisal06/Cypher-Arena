/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Your signature neon hacker green
        primary: {
          DEFAULT: '#00ff41',
          dim: 'rgba(0, 255, 65, 0.2)',
        },
        // True terminal black
        dark: '#0a0a0a',
      },
      boxShadow: {
        // The magic "Glow" effects
        'neon-green': '0 0 10px rgba(0, 255, 65, 0.4), 0 0 20px rgba(0, 255, 65, 0.2)',
        'neon-green-strong': '0 0 15px rgba(0, 255, 65, 0.6), 0 0 30px rgba(0, 255, 65, 0.4)',
      },
      fontFamily: {
        // A monospace font is essential for the hacker vibe
        mono: ['"Fira Code"', 'monospace', 'Courier New'],
      }
    },
  },
  plugins: [],
}