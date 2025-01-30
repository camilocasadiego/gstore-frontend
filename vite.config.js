import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer', // Asegúrate de que el alias esté configurado
    },
  },
  optimizeDeps: {
    include: ['buffer'], // Incluye buffer en las dependencias optimizadas
  },
});