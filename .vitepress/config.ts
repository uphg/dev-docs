import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'url'
import { nav, sidebar } from './navAndSidebar'
import { withMermaid } from "vitepress-plugin-mermaid";


// https://vitepress.dev/reference/site-config
export default defineConfig(withMermaid({
  base: '/dev-docs/',
  title: "Dev Docs",
  description: "A development document of my own",
  srcDir: './src',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/uphg/dev-docs' }
    ],
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/uphg/dev-docs/edit/master/src/:path',
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url))
      }
    }
  },
  mermaid: {}
}))


