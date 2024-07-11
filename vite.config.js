import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine the base path based on the environment
const base = process.env.NODE_ENV === 'production' ? '' : '/';

export default defineConfig({
  plugins: [react()],
  base: base,
});
