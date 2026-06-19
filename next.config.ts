import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProd ? { output: "export" as const } : {}),
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
