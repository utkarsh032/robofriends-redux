import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    // Tachyons still ships old IE hacks like `*zoom: 1`; strip them instead of failing the build.
    lightningcss: { errorRecovery: true },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    restoreMocks: true,
    unstubGlobals: true,
  },
})
