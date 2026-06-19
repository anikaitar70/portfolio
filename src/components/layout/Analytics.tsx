"use client";

import { useEffect } from "react";
import { initTelemetry } from "@/lib/telemetry";

export function Analytics() {
  useEffect(() => {
    initTelemetry();
  }, []);

  return null;
}
