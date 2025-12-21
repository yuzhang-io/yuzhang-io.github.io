import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // For GitHub user/organization pages:
  site: "https://yuzhang-io.github.io",
  base: "/",

  vite: {
    plugins: [tailwindcss()],
  },
});