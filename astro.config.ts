import {defineConfig} from "astro/config";

// https://astro.build/config
export default defineConfig({
    site: "https://zackrauen.com",
    // Static output — the site is fully generated at build time and deployed
    // as static assets (matches the previous Eleventy + Cloudflare setup).
    output: "static",
    server: {
        port: 6767,
    },
    build: {
        // Emit assets alongside pages so relative references stay predictable.
        format: "directory",
    },
});
