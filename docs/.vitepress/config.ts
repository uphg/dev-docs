import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dev Docs",
  description: "A Development document that is biased towards the front end",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/guide/' },
      { text: 'Cross Platform', link: '/cross-platform/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/guide/markdown-examples' },
            { text: 'Runtime API Examples', link: '/guide/api-examples' }
          ]
        },
      ],
      '/cross-platform/': [
        {
          text: 'Cross Platform',
          items: [
            { text: '常用 API', link: '/cross-platform/uniapp/api' },
            { text: '安卓本地打包', link: '/cross-platform/uniapp/android-packaging' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
