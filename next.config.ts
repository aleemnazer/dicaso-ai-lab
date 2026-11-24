import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// cacheComponents / partialPrefetching are intentionally disabled: the
// OpenNext Cloudflare adapter does not support Cache Components yet and the
// deployed Worker hangs on every request when they are enabled.
// Track: https://github.com/opennextjs/opennextjs-cloudflare/pull/1318
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
