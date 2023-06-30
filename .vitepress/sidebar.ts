export default {
  '/sundries/': [
    {
      text: '杂项',
      items: [
        { text: 'Git 配置', link: '/sundries/git-config' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'Examples',
      items: [
        { text: 'Markdown Examples', link: '/markdown-examples' },
        { text: 'Runtime API Examples', link: '/api-examples' }
      ]
    }
  ],
  '/frontend/': [
    {
      text: 'JavaScript',
      items: [
        { text: '常用 API 实现', link: '/frontend/api-implemented' },
      ]
    },
    {
      text: 'TypeScript',
      collapsed: false,
      items: [
        { text: '数据类型', link: '/frontend/typescript' },
        { text: '联合类型', link: '/frontend/typescript-union' },
        { text: '交叉类型', link: '/frontend/typescript-cross' },
        { text: '类型兼容', link: '/frontend/typescript-compatible' },
        { text: '函数', link: '/frontend/typescript-function' },
        { text: '泛型', link: '/frontend/typescript-generics' },
        { text: 'Class', link: '/frontend/typescript-class' },
        { text: '类型体操', link: '/frontend/typescript-gymnastics' },
        { text: '在项目中使用 TypeScript', link: '/frontend/use-typescript-in-project' },
        { text: 'TypeScript Config', link: '/frontend/typescript-config' }
      ]
    },
    {
      text: 'Vue',
      items: [
        { text: '框架设计概览', link: '/frontend/vue-design-overview' },
      ]
    },
  ]
}