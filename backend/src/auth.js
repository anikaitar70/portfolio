import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "./config.js";

export function hashIp(ip) {
  return crypto.createHash("sha256").update(`${ip}:${config.jwtSecret}`).digest("hex");
}

export function signToken(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

export async function verifyAdminPassword(password) {
  if (!config.adminPasswordHash) {
    return false;
  }

  return bcrypt.compare(password, config.adminPasswordHash);
}

export function isAllowedOrigin(origin) {
  if (!origin) return false;
  return config.allowedOrigins.includes(origin);
}

export function validateIngestKey(key) {
  if (!config.ingestKey) return false;
  if (!key || key.length !== config.ingestKey.length) return false;
  return crypto.timingSafeEqual(Buffer.from(key), Buffer.from(config.ingestKey));
}
