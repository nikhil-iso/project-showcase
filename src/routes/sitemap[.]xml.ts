import { createFileRoute } from "@tanstack/react-router";
import { canonicalUrl } from "../lib/site";

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${canonicalUrl("/")}</loc>
  </url>
  <url>
    <loc>${canonicalUrl("/team")}</loc>
  </url>
</urlset>`;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(sitemap, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
