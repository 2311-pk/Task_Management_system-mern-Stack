
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],  resolve: {
    // Ensure node_modules is included
    modules: ['node_modules'],
    // Ensure Vite resolves .jsx files
    extensions: ['.js', '.jsx'],
  },
  build: {
    rollupOptions: {
      external: ['react-chartjs-2'],
    },
  },
});
