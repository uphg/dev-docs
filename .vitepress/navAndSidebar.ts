/**
 * 前端
 * -------------------------------------------------------------------------- */

const JavaScript = [
  {
    text: 'JavaScript',
    items: [
      { text: 'Iterable object（可迭代对象）', link: '/vanilla/iterable-object' },
      { text: 'Generator', link: '/vanilla/generators' },
      { text: '异步迭代和 generator', link: '/vanilla/async-iterators-generators' },
      { text: 'Proxy 和 Reflect', link: '/vanilla/proxy' },
      { text: '常用方法实现', link: '/vanilla/api-implemented' },
    ]
  }
]

const TypeScript = [
  {
    text: 'TypeScript',
    collapsed: false,
    items: [
      { text: '类型基础', link: '/typescript/basics' },
      { text: '类型兼容', link: '/typescript/compatible' },
      { text: '函数', link: '/typescript/function' },
      { text: '泛型', link: '/typescript/generics' },
      { text: 'Class', link: '/typescript/class' },
      { text: '类型体操', link: '/typescript/gymnastics' },
      { text: '在项目中使用', link: '/typescript/used-in-the-project' },
      { text: 'TypeScript Config', link: '/typescript/config' }
    ]
  }
]

const Vue = [
  {
    text: 'Vue',
    items: [
      { text: '框架设计概览', link: '/vue/design-overview' },
    ]
  }
]


/**
 * 跨端
 * -------------------------------------------------------------------------- */

const ReactNative = [
  {
    text: 'React Native',
    items: [
      { text: '环境搭建', link: '/react-native/environment-setup'},
    ]
  }
]

/**
 * 杂项
 * -------------------------------------------------------------------------- */

const Other = [
  {
    text: '环境配置',
    items: [
      { text: 'Git 配置', link: '/other/git-config' }
    ]
  }
]

export const nav = [
  {
    text: '首页',
    link: '/'
  },
  {
    text: '前端',
    activeMatch: '/vanilla/|/typescript/|/vue/',
    items: [
      { text: 'JavaScript', link: JavaScript[0].items[0].link },
      { text: 'TypeScript', link: TypeScript[0].items[0].link },
      { text: 'Vue', link: Vue[0].items[0].link }
    ]
  },
  {
    text: '跨端',
    activeMatch: '/react-native/',
    items: [
      { text: 'React Native', link: ReactNative[0].items[0].link }
    ]
  },
  {
    text: '杂项',
    activeMatch: '/other/',
    link: Other[0].items[0].link
  }
]

export const sidebar = {
  '/vanilla/': JavaScript,
  '/typescript/': TypeScript,
  '/vue/': Vue,
  '/react-native/': ReactNative,
  '/other/': Other
}