import { config } from "../config.js";
import { verifyToken } from "../auth.js";

export function requireAdmin(req, res, next) {
  const token =
    req.cookies?.[config.cookieName] ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.slice(7)
      : null);

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    req.admin = verifyToken(token);
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
}
