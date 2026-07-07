const LOVABLE_ASSET_ORIGIN = "https://id-preview--14d1222e-1db0-4912-9fe2-7966c5ee0a20.lovable.app";

export function getAssetUrl(asset: { url: string } | string) {
  const url = typeof asset === "string" ? asset : asset.url;

  if (url.startsWith("/__l5e/")) {
    return `${LOVABLE_ASSET_ORIGIN}${url}`;
  }

  return url;
}