import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lulanao.com.br',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
