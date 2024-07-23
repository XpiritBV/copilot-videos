import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basename from './react-config';
import rewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
  plugins: [react(), rewriteAll()],
  base: basename,
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
  define: {
    'process.env.BUILDNUMBER': JSON.stringify(process.env.BUILDNUMBER) || 999,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || "default",
  }
});
