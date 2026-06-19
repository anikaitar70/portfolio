const SESSION_KEY = "portfolio_session_id";
const API_BASE = "/api/v1/ingest";

function getSessionId() {
  if (typeof window === "undefined") return null;

  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

function getIngestKey() {
  return process.env.NEXT_PUBLIC_TELEMETRY_KEY || "";
}

export async function trackEvent(
  type: "pageview" | "error",
  payload: {
    path?: string;
    referrer?: string;
    message?: string;
    stack?: string;
    metadata?: Record<string, unknown>;
  }
) {
  const ingestKey = getIngestKey();
  if (!ingestKey) return;

  try {
    await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Ingest-Key": ingestKey,
      },
      body: JSON.stringify({
        type,
        sessionId: getSessionId(),
        path: payload.path,
        referrer: payload.referrer,
        message: payload.message,
        stack: payload.stack,
        metadata: payload.metadata,
      }),
      keepalive: true,
    });
  } catch {
    // Telemetry should never break the site.
  }
}

export function trackPageView(path: string) {
  trackEvent("pageview", {
    path,
    referrer: document.referrer || undefined,
  });
}

export function trackClientError(message: string, stack?: string, path?: string) {
  trackEvent("error", {
    path: path || window.location.pathname,
    message,
    stack,
  });
}

export function initTelemetry() {
  if (typeof window === "undefined") return;

  trackPageView(window.location.pathname);

  window.addEventListener("error", (event) => {
    trackClientError(
      event.message,
      event.error?.stack,
      window.location.pathname
    );
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message =
      reason instanceof Error
        ? reason.message
        : typeof reason === "string"
          ? reason
          : "Unhandled promise rejection";

    trackClientError(
      message,
      reason instanceof Error ? reason.stack : undefined,
      window.location.pathname
    );
  });
}
