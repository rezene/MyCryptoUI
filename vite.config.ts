import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
      styles: { configFile: 'src/scss/variables.scss' }, // Still used by Vuetify
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['mixed-decls', 'global-builtin', 'legacy-js-api', 'import'], // Suppress @import warning
        additionalData: `
          @use 'sass:math';
          @use 'sass:map';
          @use 'sass:meta';
          @use 'vuetify/lib/styles/tools/functions' as *;
        `,
      },
    },
  },
  optimizeDeps: {
    exclude: ['vuetify'],
    entries: ['./src/**/*.vue'],
  },
});