import fs from "fs";
import path from "path";
import { Router } from "express";
import multer from "multer";
import { getDashboardStats, getDbInfo } from "../db.js";
import { config, resumePath } from "../config.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed"));
      return;
    }
    cb(null, true);
  },
});

function isPdf(buffer) {
  return buffer.length >= 4 && buffer.subarray(0, 4).toString() === "%PDF";
}

router.use(requireAdmin);

router.get("/dashboard", (_req, res) => {
  res.json(getDashboardStats());
});

router.get("/diagnostics", (_req, res) => {
  const dbInfo = getDbInfo();
  let resume = null;

  try {
    const stat = fs.statSync(resumePath);
    resume = {
      path: resumePath,
      sizeBytes: stat.size,
      updatedAt: stat.mtime.toISOString(),
    };
  } catch {
    resume = { path: resumePath, exists: false };
  }

  res.json({
    service: {
      nodeVersion: process.version,
      uptimeSeconds: Math.floor(process.uptime()),
      memory: process.memoryUsage(),
      env: config.nodeEnv,
      webRoot: config.webRoot,
      dataDir: config.dataDir,
    },
    database: dbInfo,
    resume,
  });
});

router.post("/resume", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "PDF file is required" });
  }

  if (!isPdf(req.file.buffer)) {
    return res.status(400).json({ error: "Invalid PDF file" });
  }

  fs.mkdirSync(path.dirname(resumePath), { recursive: true });
  fs.writeFileSync(resumePath, req.file.buffer);

  const stat = fs.statSync(resumePath);

  return res.json({
    ok: true,
    sizeBytes: stat.size,
    updatedAt: stat.mtime.toISOString(),
    url: `/resume/${config.resumeFilename}`,
  });
});

export default router;
