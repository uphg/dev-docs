import { defineConfig } from 'vitepress'
import navbar from './navbar'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/dev-docs/',
  // head: [
  //   [
  //     'link',
  //     {
  //       href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap',
  //       rel: 'stylesheet'
  //     }
  //   ]
  // ],
  title: "My Awesome Project",
  description: "A VitePress Site",
  srcDir: './src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: navbar,

    sidebar: sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})


