// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure that all 404 requests are served with index.html to handle client-side routing
    rollupOptions: {
      input: "./index.html",
    },
  },
  // This makes sure that Vite serves index.html for all unknown routes
  server: {
    historyApiFallback: true,
  },
});
