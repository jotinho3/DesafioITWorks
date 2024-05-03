import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200 // Aqui podemos escolher qual a PORT do localhost, o desafio pediu a porta 4200.
  }
})
