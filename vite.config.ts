// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    server: {
      proxy: {
        // Proxy Lovable-hosted assets so `npm run dev` locally can load images
        // referenced via .asset.json (/__l5e/assets-v1/...). In Lovable's own
        // preview this route is handled by the platform; locally it 404s
        // without this proxy.
        "/__l5e": {
          target: "https://id-preview--14d1222e-1db0-4912-9fe2-7966c5ee0a20.lovable.app",
          changeOrigin: true,
          secure: true,
        },
      },
    },
  },
});
