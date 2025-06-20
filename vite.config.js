import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/Twenty-Dots/", // <--- ADD THIS LINE
  plugins: [react()],
})