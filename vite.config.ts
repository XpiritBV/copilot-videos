import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

// Determine the base path based on the environment
const base = process.env.NODE_ENV === 'production' ? '/copilot-videos/' : '';

export default defineConfig({
  plugins: [react()],
  base: base,
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
});
