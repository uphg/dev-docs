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
      { text: 'Vue.js 设计思路', link: '/vue/design-ideas' },
      { text: '响应系统的作用与实现', link: '/vue/response-system' },
      { text: '非原始值响应方案', link: '/vue/non-primitive-response' }
    ]
  }
]

const React = [
  {
    text: 'React',
    items: [
      { text: 'Lisp 入门', link: '/react/lisp' },
      { text: '面向对象核心', link: '/react/object-oriented-core' }
    ]
  }
]

const ReactNative = [
  {
    text: 'React Native',
    items: [
      { text: '环境搭建', link: '/react-native/environment-setup'},
    ]
  }
]


/**
 * 全栈
 * -------------------------------------------------------------------------- */

const Nodejs = [
  {
    text: 'Node.js 全解',
    items: [
      { text: 'Node.js 技术架构', link: '/nodejs/nodejs-technical-architecture'},
      { text: '文件模块', link: '/nodejs/nodejs-fs-file'},
      { text: '静态服务器', link: '/nodejs/static-server' },
      { text: '命令行翻译工具', link: '/nodejs/nodejs-fanyi' },
      { text: '操作数据库', link: '/nodejs/operational-database' },
      { text: '数据库基础知识', link: '/nodejs/database-basics' },
      { text: 'Stream 入门', link: '/nodejs/stream-getting-started' },
      { text: '子进程', link: '/nodejs/child-process' },
      { text: 'Express 全解', link: '/nodejs/express' },
      { text: 'Koa 全解', link: '/nodejs/koa' },
      { text: 'Next.js 全解', link: '/nodejs/nextjs' },
      { text: 'TypeORM 数据库实践', link: '/nodejs/TypeORM-database-practice' },
      { text: '数据库设计与搭建', link: '/nodejs/database-design-and-build' },
      { text: '博客系统搭建', link: '/nodejs/blog-system-building' },
    ]
  },
  {
    text: 'Webpack 源码',
    items: [
      { text: 'AST、babel、依赖', link: '/nodejs/webpack-ast-babel-and-rely' },
      { text: 'Webpack 核心原理', link: '/nodejs/webpack-core' },
      { text: 'Loader 原理', link: '/nodejs/webpack-loader-principle' },
      { text: 'Webpack 源码阅读', link: '/nodejs/webpack-source' }
    ]
  }
]

const FullStack = [
  {
    text: '记账',
    items: [
      { text: 'Docker 环境搭建', link: '/full-stack/docker-env' }
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
    activeMatch: '/vanilla/|/typescript/|/vue/',
    items: [
      { text: 'JavaScript', link: JavaScript[0].items[0].link },
      { text: 'TypeScript', link: TypeScript[0].items[0].link },
      { text: 'Vue', link: Vue[0].items[0].link },
      { text: 'React', link: React[0].items[0].link },
      { text: 'React Native', link: ReactNative[0].items[0].link }
    ]
  },
  {
    text: '全栈',
    activeMatch: '/nodejs/|/full-stack/',
    items: [
      { text: 'Node.js', link: Nodejs[0].items[0].link },
      { text: '全栈项目', link: FullStack[0].items[0].link },
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
  '/react/': React,
  '/react-native/': ReactNative,
  '/nodejs/': Nodejs,
  '/other/': Other,
  '/full-stack/': FullStack
}