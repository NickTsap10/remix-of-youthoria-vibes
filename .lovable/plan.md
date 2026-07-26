## 1. "Book Your Podcast" button (Episodes page)

- Add a prominent CTA at the very top of the Episodes page, above the heading, alongside the eyebrow label.
- Styled with the existing turquoise primary button style, full-width on mobile and inline on desktop, with a small calendar/mic icon.
- Opens an external booking link in a new tab. Since the URL isn't decided yet, it goes into `src/lib/socials.ts` as a single `booking` constant with a placeholder — swapping it later is a one-line change, and the button is hidden if the placeholder is still empty (so no dead link ships).
- Bilingual label added to the i18n dictionary (Greek + English).

## 2. Remove the donation pop-up

- Delete `src/components/site/DonationPopup.tsx`.
- Remove its import and render from `src/routes/__root.tsx`.
- Remove the now-unused `popup.*` translation keys.
- The donate buttons in the nav and footer stay as they are (only the modal is removed).

## 3. Fix image asset paths

Current issue: `src/lib/assets.ts` prefixes every CDN asset with a hardcoded absolute origin from the original project's preview URL (`id-preview--14d1222e-...lovable.app`). On this remixed project those images are loading cross-origin from a different project, which will break locally and on your own hosting.

- Change `getAssetUrl` to return the asset path as-is (a root-relative `/__l5e/...` URL), so images resolve against whatever origin the site is served from — localhost, preview, or your host.
- Optionally allow an override via an env var (`VITE_ASSET_BASE_URL`) for cases where assets must be served from a different domain; unset by default.
- Sweep the codebase for any other hardcoded absolute image URLs (team photos, brand logo, map) and route them all through `getAssetUrl`.

Note: the asset files themselves live on Lovable's CDN under `/__l5e/assets-v1/...`. If you deploy outside Lovable hosting, those paths won't exist on your server — in that case I'd re-import the images into `src/assets` as regular bundled files so they ship with your build. Tell me if you're deploying to an external host and I'll do that instead.

## Technical details

- Files touched: `src/routes/episodes.tsx`, `src/lib/socials.ts`, `src/lib/i18n.tsx`, `src/routes/__root.tsx`, `src/lib/assets.ts`; delete `src/components/site/DonationPopup.tsx`.
- No backend or data changes.
