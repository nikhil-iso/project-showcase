import { createFileRoute } from "@tanstack/react-router";
import { canonicalUrl } from "../lib/site";

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${canonicalUrl("/sitemap.xml")}
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(robotsTxt, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
