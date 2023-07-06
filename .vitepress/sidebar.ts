export default {

  '/frontend/': [
    {
      text: 'JavaScript',
      items: [
        { text: 'Iterable object（可迭代对象）', link: '/frontend/iterable-object' },
        { text: 'Generator', link: '/frontend/generators' },
        { text: '异步迭代和 generator', link: '/frontend/async-iterators-generators' },
        { text: 'Proxy 和 Reflect', link: '/frontend/proxy' },
        { text: '常用方法实现', link: '/frontend/api-implemented' },
      ]
    },
    {
      text: 'TypeScript',
      collapsed: false,
      items: [
        { text: '类型基础', link: '/frontend/typescript-basics' },
        { text: '类型兼容', link: '/frontend/typescript-compatible' },
        { text: '函数', link: '/frontend/typescript-function' },
        { text: '泛型', link: '/frontend/typescript-generics' },
        { text: 'Class', link: '/frontend/typescript-class' },
        { text: '类型体操', link: '/frontend/typescript-gymnastics' },
        { text: '在项目中使用', link: '/frontend/use-typescript-in-project' },
        { text: 'TypeScript Config', link: '/frontend/typescript-config' }
      ]
    },
    {
      text: 'Vue',
      items: [
        { text: '框架设计概览', link: '/frontend/vue-design-overview' },
      ]
    },
  ],
  '/sundries/': [
    {
      text: '环境配置',
      items: [
        {  },
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
}