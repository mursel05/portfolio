import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

export const posthogLoggerProvider =
  posthogToken && posthogHost
    ? new LoggerProvider({
        resource: resourceFromAttributes({ "service.name": "portfolio" }),
        processors: [
          new BatchLogRecordProcessor({
            exporter: new OTLPLogExporter({
              url: `${posthogHost.replace(/\/$/, "")}/i/v1/logs`,
              headers: {
                Authorization: `Bearer ${posthogToken}`,
                "Content-Type": "application/json",
              },
              timeoutMillis: 2000,
            }),
          }),
        ],
      })
    : undefined;

export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  if (!posthogLoggerProvider) {
    if (process.env.NODE_ENV !== "production") {
      if (!posthogToken) {
        console.warn(
          "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
        );
      }
      if (!posthogHost) {
        console.warn(
          "NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_HOST is configured",
        );
      }
    }
  }
}
