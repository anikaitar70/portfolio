import "dotenv/config";
import fs from "fs";
import path from "path";

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || "",
  jwtSecret: process.env.JWT_SECRET || "",
  ingestKey: process.env.INGEST_KEY || "",
  webRoot: process.env.WEB_ROOT || path.resolve("../out"),
  dataDir: process.env.DATA_DIR || path.resolve("./data"),
  resumeFilename: process.env.RESUME_FILENAME || "Anikait_Resume.pdf",
  cookieName: "portfolio_admin",
  jwtExpiresIn: "12h",
};

export function assertProductionConfig() {
  if (config.nodeEnv !== "production") return;

  required("JWT_SECRET");
  required("INGEST_KEY");
}

export const resumeDir = path.join(config.webRoot, "resume");
export const resumePath = path.join(resumeDir, config.resumeFilename);
export const dbPath = path.join(config.dataDir, "analytics.db");

export function ensureDirs() {
  fs.mkdirSync(config.dataDir, { recursive: true });
  fs.mkdirSync(resumeDir, { recursive: true });
}
