import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["d7a7-2401-4900-1ce1-106e-477-efa6-2702-ce59.ngrok-free.app"]
  }
});