import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // --- TAMBAHKAN BARIS INI AGAR MUNCUL DI NPM RUN DEV ---
      devOptions: {
        enabled: true
      },
      // ----------------------------------------------------
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jsx}']
      },
      manifest: {
        name: 'RS Budi Asih Trenggalek',
        short_name: 'RSBA Mobile',
        description: 'Layanan Pintar RS Budi Asih Trenggalek',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})