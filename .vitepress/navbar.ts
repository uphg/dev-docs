import sidebar from './sidebar'

export default [
  { text: '首页', link: '/' },
  { text: '前端', link: sidebar['/frontend/'][0].items[0].link },
  { text: '跨端', link: '/cross-end/' },
  { text: '全栈', link: '/full-stack/' },
  { text: '杂项', link: '/sundries/' }
]
