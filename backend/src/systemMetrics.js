import fs from "fs";
import os from "os";
import { execSync } from "child_process";
import { statfs } from "fs/promises";
import path from "path";
import { config, dbPath, resumePath } from "./config.js";
import { getDbInfo } from "./db.js";

function isLinux() {
  return process.platform === "linux";
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function bytesToGb(bytes) {
  return Math.round((bytes / 1024 / 1024 / 1024) * 100) / 100;
}

function formatBytes(bytes) {
  if (bytes == null || Number.isNaN(bytes)) return "—";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${Math.round(value * 10) / 10} ${units[unit]}`;
}

function readCpuTimes() {
  const stat = readFileSafe("/proc/stat");
  if (!stat) return null;

  const line = stat.split("\n")[0];
  const parts = line.split(/\s+/).slice(1).map(Number);
  const idle = parts[3] + (parts[4] || 0);
  const total = parts.reduce((sum, value) => sum + value, 0);
  return { idle, total };
}

async function getCpuUsage(sampleMs = 500) {
  const first = readCpuTimes();
  if (!first) {
    return { usagePercent: null, sampleMs, note: "CPU metrics available on Linux only" };
  }

  await new Promise((resolve) => setTimeout(resolve, sampleMs));
  const second = readCpuTimes();
  if (!second) return { usagePercent: null, sampleMs };

  const totalDelta = second.total - first.total;
  const idleDelta = second.idle - first.idle;
  const usagePercent =
    totalDelta > 0
      ? Math.round(((totalDelta - idleDelta) / totalDelta) * 1000) / 10
      : 0;

  return { usagePercent, sampleMs };
}

function getCpuInfo() {
  const cpus = os.cpus();
  return {
    cores: cpus.length,
    model: cpus[0]?.model ?? "Unknown",
    speedMhz: cpus[0]?.speed ?? null,
  };
}

function getLoadAverage() {
  const [one, five, fifteen] = os.loadavg();
  const cores = os.cpus().length || 1;

  return {
    oneMinute: Math.round(one * 100) / 100,
    fiveMinutes: Math.round(five * 100) / 100,
    fifteenMinutes: Math.round(fifteen * 100) / 100,
    cores,
    oneMinutePercent: Math.round((one / cores) * 1000) / 10,
  };
}

function getMemoryInfo() {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;

  const meminfo = readFileSafe("/proc/meminfo");
  let available = free;
  let swapTotal = null;
  let swapFree = null;

  if (meminfo) {
    const readValue = (key) => {
      const match = meminfo.match(new RegExp(`^${key}:\\s+(\\d+)`, "m"));
      return match ? Number(match[1]) * 1024 : null;
    };

    available = readValue("MemAvailable") ?? available;
    swapTotal = readValue("SwapTotal");
    swapFree = readValue("SwapFree");
  }

  const swapUsed =
    swapTotal != null && swapFree != null ? swapTotal - swapFree : null;

  return {
    totalBytes: total,
    usedBytes: used,
    freeBytes: free,
    availableBytes: available,
    usedPercent: Math.round((used / total) * 1000) / 10,
    availablePercent: Math.round((available / total) * 1000) / 10,
    totalGb: bytesToGb(total),
    usedGb: bytesToGb(used),
    availableGb: bytesToGb(available),
    swap:
      swapTotal != null
        ? {
            totalBytes: swapTotal,
            usedBytes: swapUsed,
            freeBytes: swapFree,
            usedPercent:
              swapTotal > 0
                ? Math.round((swapUsed / swapTotal) * 1000) / 10
                : 0,
          }
        : null,
  };
}

async function getDiskUsage(targetPath) {
  try {
    const resolved = path.resolve(targetPath);
    const stats = await statfs(resolved);
    const blockSize = stats.bsize;
    const totalBytes = stats.blocks * blockSize;
    const freeBytes = stats.bavail * blockSize;
    const usedBytes = totalBytes - freeBytes;

    return {
      path: resolved,
      totalBytes,
      usedBytes,
      freeBytes,
      usedPercent:
        totalBytes > 0 ? Math.round((usedBytes / totalBytes) * 1000) / 10 : 0,
      total: formatBytes(totalBytes),
      used: formatBytes(usedBytes),
      free: formatBytes(freeBytes),
    };
  } catch (error) {
    return {
      path: targetPath,
      error: error.message,
    };
  }
}

function getNetworkStats() {
  const netdev = readFileSafe("/proc/net/dev");
  if (!netdev) return null;

  let receivedBytes = 0;
  let transmittedBytes = 0;

  for (const line of netdev.split("\n").slice(2)) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const colonIndex = trimmed.indexOf(":");
    if (colonIndex === -1) continue;

    const iface = trimmed.slice(0, colonIndex).trim();
    if (iface === "lo") continue;

    const values = trimmed
      .slice(colonIndex + 1)
      .trim()
      .split(/\s+/)
      .map(Number);

    receivedBytes += values[0] || 0;
    transmittedBytes += values[8] || 0;
  }

  return {
    receivedBytes,
    transmittedBytes,
    received: formatBytes(receivedBytes),
    transmitted: formatBytes(transmittedBytes),
  };
}

function getServiceStatus(serviceName) {
  if (!isLinux()) return { name: serviceName, status: "unknown" };

  try {
    const status = execSync(`systemctl is-active ${serviceName}`, {
      encoding: "utf8",
    }).trim();
    return { name: serviceName, status };
  } catch {
    return { name: serviceName, status: "inactive" };
  }
}

function getFileInfo(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return {
      path: filePath,
      exists: true,
      sizeBytes: stat.size,
      size: formatBytes(stat.size),
      updatedAt: stat.mtime.toISOString(),
    };
  } catch {
    return { path: filePath, exists: false };
  }
}

function getProcessInfo() {
  const memory = process.memoryUsage();
  return {
    pid: process.pid,
    uptimeSeconds: Math.floor(process.uptime()),
    nodeVersion: process.version,
    memory: {
      rssBytes: memory.rss,
      heapUsedBytes: memory.heapUsed,
      heapTotalBytes: memory.heapTotal,
      externalBytes: memory.external,
      rss: formatBytes(memory.rss),
      heapUsed: formatBytes(memory.heapUsed),
      heapTotal: formatBytes(memory.heapTotal),
    },
  };
}

export async function getSystemMetrics() {
  const [cpuUsage, diskRoot, diskWebRoot, diskDataDir] = await Promise.all([
    getCpuUsage(),
    getDiskUsage("/"),
    getDiskUsage(config.webRoot),
    getDiskUsage(config.dataDir),
  ]);

  const memory = getMemoryInfo();
  const load = getLoadAverage();
  const cpu = getCpuInfo();

  return {
    collectedAt: new Date().toISOString(),
    host: {
      hostname: os.hostname(),
      platform: process.platform,
      arch: os.arch(),
      release: os.release(),
      uptimeSeconds: Math.floor(os.uptime()),
      uptimeHours: Math.round((os.uptime() / 3600) * 10) / 10,
    },
    cpu: {
      ...cpu,
      usagePercent: cpuUsage.usagePercent,
      usageSampleMs: cpuUsage.sampleMs,
      load,
    },
    memory,
    disk: {
      root: diskRoot,
      webRoot: diskWebRoot,
      dataDir: diskDataDir,
    },
    network: getNetworkStats(),
    services: [
      getServiceStatus("portfolio-api"),
      getServiceStatus("nginx"),
    ],
    process: getProcessInfo(),
    application: {
      env: config.nodeEnv,
      webRoot: config.webRoot,
      dataDir: config.dataDir,
      database: {
        ...getDbInfo(),
        file: getFileInfo(dbPath),
      },
      resume: getFileInfo(resumePath),
    },
  };
}

export { formatBytes };
