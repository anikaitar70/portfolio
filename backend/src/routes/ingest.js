import { Router } from "express";
import rateLimit from "express-rate-limit";
import { insertEvent } from "../db.js";
import { hashIp, isAllowedOrigin, validateIngestKey } from "../auth.js";

const router = Router();

const ingestLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many events" },
});

router.post("/", ingestLimiter, (req, res) => {
  const origin = req.headers.origin;
  const ingestKey = req.headers["x-ingest-key"];

  if (!isAllowedOrigin(origin)) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  if (!validateIngestKey(ingestKey)) {
    return res.status(401).json({ error: "Invalid ingest key" });
  }

  const { type, path, referrer, sessionId, message, stack, metadata } = req.body ?? {};

  if (type !== "pageview" && type !== "error") {
    return res.status(400).json({ error: "Invalid event type" });
  }

  if (type === "pageview" && typeof path !== "string") {
    return res.status(400).json({ error: "Pageview requires path" });
  }

  if (type === "error" && typeof message !== "string") {
    return res.status(400).json({ error: "Error event requires message" });
  }

  const safePath = typeof path === "string" ? path.slice(0, 500) : null;
  const safeMessage = typeof message === "string" ? message.slice(0, 2000) : null;
  const safeStack = typeof stack === "string" ? stack.slice(0, 8000) : null;
  const safeReferrer =
    typeof referrer === "string" ? referrer.slice(0, 500) : null;
  const safeSessionId =
    typeof sessionId === "string" ? sessionId.slice(0, 64) : null;

  insertEvent({
    type,
    path: safePath,
    referrer: safeReferrer,
    userAgent: req.headers["user-agent"]?.slice(0, 500) ?? null,
    sessionId: safeSessionId,
    message: safeMessage,
    stack: safeStack,
    metadata:
      metadata && typeof metadata === "object" ? metadata : undefined,
    ipHash: hashIp(req.ip || "unknown"),
  });

  return res.status(202).json({ ok: true });
});

export default router;
