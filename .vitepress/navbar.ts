import sidebar from './sidebar'

export default [
  { text: '首页', link: '/' },
  { text: '前端', activeMatch: '/frontend/', link: sidebar['/frontend/'][0].items[0].link },
  { text: '后端', activeMatch: '/backend/', link: '/backend/' },
  { text: '跨端', activeMatch: '/cross-end/', link: '/cross-end/' },
  { text: '杂项', activeMatch: '/sundries/', link: sidebar['/sundries/'][0].items[0].link }
]
