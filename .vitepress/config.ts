import { defineConfig } from 'vitepress'
import navbar from './navbar'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/dev-docs/',
  title: "Dev Docs",
  description: "A development document of my own",
  srcDir: './src',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: navbar,
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/uphg/dev-docs/edit/master/src/:path',
    }
  }
})


