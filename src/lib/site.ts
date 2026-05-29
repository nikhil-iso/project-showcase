export const CANONICAL_ORIGIN = "https://www.nikhil-eng.com";

export function canonicalUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${CANONICAL_ORIGIN}${normalizedPath}`;
}
