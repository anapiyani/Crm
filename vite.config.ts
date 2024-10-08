import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "@fullcalendar/core",
      "@fullcalendar/daygrid",
      "@fullcalendar/react",
      "@mui/material/Radio",
      "@mui/material/RadioGroup",
      "@mui/material/FormControlLabel",
    ],
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
});
