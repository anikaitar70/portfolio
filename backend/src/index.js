import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import { assertProductionConfig, config, ensureDirs } from "./config.js";
import ingestRouter from "./routes/ingest.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

assertProductionConfig();
ensureDirs();

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "32kb" }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "portfolio-api" });
});

app.use("/api/v1/ingest", ingestRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);

app.use(
  "/admin",
  express.static(path.join(__dirname, "../public/admin"), {
    index: "index.html",
  })
);

app.use((err, _req, res, _next) => {
  if (err?.message === "CORS not allowed") {
    return res.status(403).json({ error: "CORS not allowed" });
  }

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

app.listen(config.port, "127.0.0.1", () => {
  console.log(`portfolio-api listening on http://127.0.0.1:${config.port}`);
});
