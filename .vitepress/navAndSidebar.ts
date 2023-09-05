import { DefaultTheme } from "vitepress"

const frontend = [
  {
    text: 'Vue.js',
    collapsed: false,
    items: createItems('/frontend/vue/', [
      { text: 'Vue2 API', link: '/vue2-api' },
      { text: 'Vue3 API', link: '/vue3-api' },
    ])
  },
  {
    text: 'Vue 设计与实现',
    collapsed: false,
    items: createItems('/frontend/vue/', [
      { text: '框架设计概览', link: '/design-overview' },
      { text: 'Vue.js 设计思路', link: '/design-ideas' },
      { text: '响应系统的作用与实现', link: '/response-system' },
      { text: '非原始值 & 原始值响应方案', link: '/non-primitive-response' },
      { text: '渲染器', link: '/renderer' },
      { text: 'Diff 算法', link: '/diff' },
    ])
  },
  {
    text: 'React',
    collapsed: false,
    items: createItems('/frontend/react/', [
      { text: 'Lisp 入门', link: '/lisp' },
      { text: '面向对象核心', link: '/object-oriented-core' },
      { text: 'React Hooks API', link: '/hooks.md' },
      { text: 'useState 实现原理', link: '/use-state.md' },
    ])
  },
  {
    text: 'React Native',
    collapsed: false,
    items: createItems('/frontend/react-native/', [
      { text: '环境搭建', link: '/environment-setup'},
    ])
  },
  {
    text: 'JavaScript',
    collapsed: false,
    items: createItems('/frontend/', [
      { text: 'Iterable object（可迭代对象）', link: '/vanilla/iterable-object' },
      { text: 'Generator', link: '/vanilla/generators' },
      { text: '异步迭代和 generator', link: '/vanilla/async-iterators-generators' },
      { text: 'Proxy 和 Reflect', link: '/vanilla/proxy' },
      { text: '常用方法实现', link: '/vanilla/api-implemented' },
      { text: 'ES6 常用 API', link: '/vanilla/es6' },
    ]) 
  },
  {
    text: 'TypeScript',
    collapsed: false,
    items: createItems('/frontend/', [
      { text: '类型基础', link: '/typescript/basics' },
      { text: '类型兼容', link: '/typescript/compatible' },
      { text: '函数', link: '/typescript/function' },
      { text: '泛型', link: '/typescript/generics' },
      { text: 'Class', link: '/typescript/class' },
      { text: '类型体操', link: '/typescript/gymnastics' },
      { text: '在项目中使用', link: '/typescript/used-in-the-project' },
      { text: 'TypeScript Config', link: '/typescript/config' }
    ])
  },
]

const fullStack = [
  {
    text: '记账项目',
    collapsed: false,
    items: createItems('/full-stack/bookkeeping/', [
      { text: 'Docker 环境搭建', link: '/docker-env' },
      { text: 'Docker 操作手册', link: 'docker' },
      { text: 'RESTful API', link: '/restful-api' },
      { text: '后端单元测试', link: '/backend-unit-tests' },
      { text: '部署上线', link: '/deployment-online' },
      { text: 'Rails 密钥管理', link: '/rails-key-management' },
      { text: '部署到云服务器', link: '/deploy-cloud-server' },
      { text: '使用 Rails 发送邮件', link: '/rails-send-email' },
      { text: 'JWT 的定义与用法', link: '/jwt-usage' },
      { text: 'Rails 手册', link: '/rails' },
      { text: 'Ruby 笔记', link: '/ruby' },
      { text: '你会做WEB上的用户登录功能吗？（转）', link: '/web-login' }
    ])
  },
  {
    text: 'Web 性能优化',
    collapsed: false,
    items: createItems('/full-stack/', [
      { text: 'HTTP', link: '/http' },
      { text: '浏览器渲染原理', link: '/browser-rendering-principle' },
      { text: '开发者工具', link: '/dev-tools' },
      { text: '什么是连接复用', link: '/connection-multiplexing' },
      { text: '多路复用', link: '/multiplexing' },
      { text: 'Web 性能优化', link: '/web-perf-optimization' }
    ])
  },
  {
    text: 'Node.js 全解',
    collapsed: true,
    items: createItems('/full-stack/nodejs/', [
      { text: 'Node.js 技术架构', link: '/nodejs-technical-architecture'},
      { text: '文件模块', link: '/nodejs-fs-file'},
      { text: '静态服务器', link: '/static-server' },
      { text: '命令行翻译工具', link: '/nodejs-fanyi' },
      { text: '操作数据库', link: '/operational-database' },
      { text: '数据库基础知识', link: '/database-basics' },
      { text: 'Stream 入门', link: '/stream-getting-started' },
      { text: '子进程', link: '/child-process' },
      { text: 'Express 全解', link: '/express' },
      { text: 'Koa 全解', link: '/koa' },
      { text: 'Next.js 全解', link: '/nextjs' },
      { text: 'TypeORM 数据库实践', link: '/TypeORM-database-practice' },
      { text: '数据库设计与搭建', link: '/database-design-and-build' },
      { text: '博客系统搭建', link: '/blog-system-building' },
    ])
  },
  {
    text: 'Webpack 源码',
    collapsed: true,
    items: createItems('/full-stack/nodejs/', [
      { text: 'AST、babel、依赖', link: '/webpack-ast-babel-and-rely' },
      { text: 'Webpack 核心原理', link: '/webpack-core' },
      { text: 'Loader 原理', link: '/webpack-loader-principle' },
      { text: 'Webpack 源码阅读', link: '/webpack-source' }
    ])
  },
  {
    text: '其他',
    collapsed: true,
    items: createItems('/full-stack/nodejs/', [
      { text: 'Node.js 环境搭建', link: '/node-env-setup' }
    ])
  }
]

const Other = [
  {
    text: '环境配置',
    items: [
      { text: 'Git 配置', link: '/other/git-config' },
      { text: 'ChatGPT 常用提示语', link: '/other/prompt' }
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
    activeMatch: '/frontend/',
    link: frontend[0].items[0].link!
  },
  {
    text: '全栈',
    activeMatch: '/full-stack/',
    link: fullStack[0].items[0].link!
  },
  {
    text: '杂项',
    activeMatch: '/other/',
    link: Other[0].items[0].link!
  }
]

export const sidebar = {
  '/frontend/': frontend,
  '/full-stack/': fullStack,
  '/other/': Other,
}

function createItems(pathPrefix: string, list: DefaultTheme.SidebarItem[]): DefaultTheme.SidebarItem[] {
  return list.map(item => ({ ...item, link: `${pathPrefix}${item.link}`.replace(/\/\//g, '/') }))
}