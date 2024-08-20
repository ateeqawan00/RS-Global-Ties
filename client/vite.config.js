import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteCompressionPlugin from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteCompressionPlugin()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: () => 'everything.js',
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  assetsInclude: /\.(png|jpe?g|gif|svg)$/i,
});
