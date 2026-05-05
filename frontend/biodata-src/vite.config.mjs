import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  root: __dirname,
  base: "/biodata/",
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "../biodata"),
    emptyOutDir: true,
    sourcemap: false,
  },
});
