// Optional override for hosting setups that serve assets from another domain.
// Leave unset to resolve assets against whatever origin the site is served from
// (localhost, preview, or your own host).
const ASSET_BASE_URL = (import.meta.env.VITE_ASSET_BASE_URL ?? "").replace(/\/$/, "");

export function getAssetUrl(asset: { url: string } | string) {
  const url = typeof asset === "string" ? asset : asset.url;

  if (ASSET_BASE_URL && url.startsWith("/")) {
    return `${ASSET_BASE_URL}${url}`;
  }

  return url;
}