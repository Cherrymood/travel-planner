import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    allowedHosts: ["travel-planner.horodnycha.com"],
  },
  optimizeDeps: {
    exclude: ["@react-oauth/google"],
  },
});
