// Optional override for hosting setups that serve assets from another domain.
// Leave unset to resolve assets against whatever origin the site is served from
// (localhost, preview, or your own host).
const ASSET_BASE_URL = (import.meta.env.VITE_ASSET_BASE_URL ?? "").replace(/\/$/, "");

export function getAssetUrl(asset: { url: string } | string) {
  const raw = typeof asset === "string" ? asset : asset.url;
  if (!raw) return raw;

  // Absolute URLs and data/blob URIs are used as-is.
  if (/^(https?:)?\/\//i.test(raw) || /^(data|blob):/i.test(raw)) return raw;

  // Normalize any relative form ("./images/x", "../images/x", "images/x")
  // into a root-relative path so it resolves the same on every sub-route.
  const url = "/" + raw.replace(/^(\.{1,2}\/)+/, "").replace(/^\/+/, "");

  if (ASSET_BASE_URL) {
    return `${ASSET_BASE_URL}${url}`;
  }

  return url;
}