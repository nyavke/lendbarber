import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// На GitHub Pages сайт открывается по /lendbarber/, поэтому base должен совпадать
// с именем репозитория, иначе ассеты будут искаться в корне домена.
export default defineConfig({
  base: '/lendbarber/',
  plugins: [react()],
})
