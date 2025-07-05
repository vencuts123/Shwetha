import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mochaPlugins } from "@getmocha/vite-plugins";
import process from "process";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [...mochaPlugins({}), react()],
  server: {
    port: 3000, // or
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
});
