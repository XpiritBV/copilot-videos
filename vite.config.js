import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine the base path based on the environment
const base = process.env.NODE_ENV === 'github-pages' ? '/copilot-videos/' : '';

export default defineConfig({
  plugins: [react()],
  base: base,
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
  define: {
    'process.env.BUILDNUMBER': JSON.stringify(process.env.BUILDNUMBER) || 999,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || "default",
  }
});
