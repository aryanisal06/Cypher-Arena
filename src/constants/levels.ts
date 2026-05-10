export interface Level {
  id: number;
  title: string;
  icon: string;
  path?: string;
  x: number;
  y: number;
  unit?: string;
  unitColor?: string;
}

export const levels: Level[] = [
  // Unit 1: The Outreach
  { id: 1, title: "Phishing 101 (Learn)", icon: "school", path: "/lesson/phishing", x: 50, y: 156, unit: "Unit 1: Entry Point Defense", unitColor: "border-primary" },
  { id: 2, title: "Phishing Analysis (Lab)", icon: "science", path: "/lab/phishing-analysis", x: 75, y: 300 },

  // Unit 2: Core Infrastructure
  { id: 3, title: "Terminal Basics (Lab)", icon: "terminal", path: "/lab/terminal", x: 45, y: 550, unit: "Unit 2: System Architecture", unitColor: "border-cyber-blue" },
  { id: 4, title: "Python Basics (Lab)", icon: "hub", path: "/lab/python", x: 25, y: 690 },
  { id: 5, title: "Cryptography (Lab)", icon: "enhanced_encryption", path: "/lab/crypto", x: 55, y: 830 },
  { id: 6, title: "Social Engineering (Scenario)", icon: "psychology", path: "/scenario/social-media", x: 75, y: 970 },

  // Unit 3: Cyber Warfare
  { id: 7, title: "Capture The Flag (Challenge)", icon: "flag", path: "/lab/ctf", x: 50, y: 1220, unit: "Unit 3: Offensive Operations", unitColor: "border-purple-500" },
  { id: 8, title: "SQL Injection (Lab)", icon: "database", path: "/lab/sqli", x: 25, y: 1360 },
  { id: 9, title: "Password Security (Lab)", icon: "key", path: "/lab/password", x: 55, y: 1500 },
  { id: 10, title: "Web Protocols (Lab)", icon: "public", path: "/lab/protocols", x: 80, y: 1640 },

  // Unit 4: System Hardening
  { id: 11, title: "OSINT Mastery (Lab)", icon: "visibility", path: "/lab/osint", x: 50, y: 1900, unit: "Unit 4: Information Gathering", unitColor: "border-orange-500" },
  { id: 12, title: "Linux Hardening (Lab)", icon: "shield", path: "/lab/hardening", x: 25, y: 2040 },
  { id: 13, title: "Permissions (Lab)", icon: "admin_panel_settings", path: "/lab/permissions", x: 55, y: 2180 },

  // Unit 5: Network Exploration
  { id: 14, title: "Wi-Fi Security (Scenario)", icon: "wifi_lock", path: "/lab/wifi", x: 75, y: 2430, unit: "Unit 5: Wireless Exploits", unitColor: "border-blue-400" },
  { id: 15, title: "Packet Sniffing (Lab)", icon: "visibility", path: "/lab/packets", x: 45, y: 2570 },
  { id: 16, title: "Firewall Ops (Lab)", icon: "wall", path: "/lab/firewall", x: 20, y: 2710 },

  // Unit 6: The Deep End
  { id: 17, title: "Cloud Security (Lab)", icon: "cloud", path: "/lab/cloud", x: 50, y: 2980, unit: "Unit 6: Modern Infrastructure", unitColor: "border-pink-500" },
  { id: 18, title: "API Vulnerabilities (Lab)", icon: "api", path: "/lab/api", x: 75, y: 3120 },
  { id: 19, title: "Malware Analysis (Lab)", icon: "bug_report", path: "/lab/malware", x: 45, y: 3260 },
  { id: 20, title: "Advanced CTF (World Boss)", icon: "stars", path: "/lab/ctf-pro", x: 55, y: 3400 },
];
