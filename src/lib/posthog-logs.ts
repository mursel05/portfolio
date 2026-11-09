import { SeverityNumber } from "@opentelemetry/api-logs";
import { posthogLoggerProvider } from "../../instrumentation";

const posthogLogger = posthogLoggerProvider?.getLogger("portfolio.posthog");

export async function flushPostHogLogs() {
  await posthogLoggerProvider?.forceFlush().catch(() => undefined);
}

export function logContactSubmissionAccepted() {
  posthogLogger?.emit({
    body: "Contact submission accepted",
    severityNumber: SeverityNumber.INFO,
    attributes: {
      "http.route": "/api/contact",
      "contact.channel": "website",
    },
  });
}

export function logContactMessageDeliveryFailed() {
  posthogLogger?.emit({
    body: "Contact message delivery failed",
    severityNumber: SeverityNumber.ERROR,
    attributes: {
      "http.route": "/api/contact",
      "email.provider": "resend",
    },
  });
}

export function logContactMessageDelivered() {
  posthogLogger?.emit({
    body: "Contact message delivered",
    severityNumber: SeverityNumber.INFO,
    attributes: {
      "http.route": "/api/contact",
      "email.provider": "resend",
    },
  });
}
