export const CANONICAL_ORIGIN = "https://nikhil-eng.com";

export function canonicalUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${CANONICAL_ORIGIN}${normalizedPath}`;
}
