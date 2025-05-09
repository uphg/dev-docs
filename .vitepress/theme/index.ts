
// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import './style.css'
import { h } from 'vue'
import Image from './components/Image.vue'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('Image', Image)
  }
}
