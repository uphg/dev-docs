import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'url'
// import { nav, sidebar } from './navAndSidebar'
import { withMermaid } from "vitepress-plugin-mermaid";
import { create } from 'domain';
import { createNavbar, createSidebar } from './shared/navigation';
import { menu } from './menu';
// import { nav } from './navbar'

const nav = createNavbar(menu)
const sidebar = createSidebar(menu)

// console.log('# nav')
// console.log(JSON.stringify(nav, null, 2))
console.log('# sidebar')
console.log(JSON.stringify(sidebar, null, 2))

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
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/vitepress-plugin-mermaid')) {
              return 'vitepress-plugin-mermaid'
            }
            if (id.includes('node_modules/vue')) {
              return 'vue'
            }
            if (id.includes('node_modules/minisearch')) {
              return 'minisearch'
            }
            if (id.includes('node_modules/micromark')) {
              return 'micromark'
            }
            if (id.includes('node_modules/elkjs')) {
              return 'elkjs'
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url))
      }
    }
  },
  mermaid: {},
}))


