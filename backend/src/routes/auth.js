import { Router } from "express";
import rateLimit from "express-rate-limit";
import { config } from "../config.js";
import { signToken, verifyAdminPassword, verifyToken } from "../auth.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts" },
});

router.post("/login", loginLimiter, async (req, res) => {
  const { password } = req.body ?? {};

  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const valid = await verifyAdminPassword(password);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken({ role: "admin" });

  res.cookie(config.cookieName, token, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 12 * 60 * 60 * 1000,
    path: "/",
  });

  return res.json({ ok: true });
});

router.post("/logout", (_req, res) => {
  res.clearCookie(config.cookieName, { path: "/" });
  return res.json({ ok: true });
});

router.get("/me", (req, res) => {
  const token = req.cookies?.[config.cookieName];
  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    verifyToken(token);
    return res.json({ authenticated: true });
  } catch {
    return res.status(401).json({ authenticated: false });
  }
});

export default router;
