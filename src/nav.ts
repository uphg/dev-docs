import { NavData } from '../types/nav'

export const data: NavData = [
  {
    text: '首页',
    link: '/'
  },
  {
    text: '前端',
    link: '/web/',
    activeMatch: '/web/|/typescript/',
    items: [
      {
        text: 'JavaScript',
        link: '/web/',
        collapsed: false,
        items: [
          {
            text: 'JavaScript 基础',
            items: [
              { text: 'Iterable object（可迭代对象）', link: '/iterable-object' },
              { text: 'Generator', link: '/generators' },
              { text: '异步迭代和 generator', link: '/async-iterators-generators' },
              { text: 'Proxy 和 Reflect', link: '/proxy' },
              { text: '常用方法实现', link: '/api-implemented' },
              { text: 'ES6 常用 API', link: '/es6' }
            ]
          }
        ]
      },
      {
        text: 'TypeScript',
        link: '/typescript/',
        collapsed: false,
        items: [
          {
            text: 'TypeScript 基础',
            items: [
              { text: '类型基础', link: '/basics' },
              { text: '类型兼容', link: '/compatible' },
              { text: '函数', link: '/function' },
              { text: '泛型', link: '/generics' },
              { text: 'Class', link: '/class' },
              { text: '类型体操', link: '/gymnastics' },
              { text: '在项目中使用', link: '/used-in-the-project' },
              { text: 'TypeScript Config', link: '/config' }
            ]
          }
        ]
      }
    ]
  },
  {
    text: 'Vue.js',
    link: '/vue/',
    activeMatch: '/vue/',
    items: [
      {
        text: 'Vue API',
        collapsed: false,
        items: [
          {
            text: 'Vue.js API',
            items: [
              { text: 'Vue2 API', link: '/vue2-api' },
              { text: 'Vue3 API', link: '/vue3-api' }
            ]
          }
        ]
      },
      {
        text: 'Vue 设计与实现',
        collapsed: false,
        items: [
          {
            text: '框架设计',
            items: [
              { text: '框架设计概览', link: '/design-overview' },
              { text: 'Vue.js 设计思路', link: '/design-ideas' },
              { text: '响应系统的作用与实现', link: '/response-system' },
              { text: '非原始值 & 原始值响应方案', link: '/non-primitive-response' },
              { text: '渲染器', link: '/renderer' },
              { text: 'Diff 算法', link: '/diff' }
            ]
          }
        ]
      }
    ]
  },
  {
    text: 'React',
    link: '/react/',
    activeMatch: '/react/',
    items: [
      {
        text: 'React 基础',
        collapsed: false,
        items: [
          {
            text: 'React 核心概念',
            items: [
              { text: 'Lisp 入门', link: '/lisp' },
              { text: '面向对象核心', link: '/object-oriented-core' },
              { text: 'useState 实现原理', link: '/use-state' },
              { text: 'React Hooks API', link: '/hooks' },
              { text: 'React 状态管理', link: '/status-management' }
            ]
          }
        ]
      },
      {
        text: 'React Native',
        collapsed: false,
        items: [
          {
            text: '入门指南',
            items: [
              { text: '环境搭建', link: '/environment-setup' }
            ]
          }
        ]
      }
    ]
  },
  {
    text: '全栈',
    link: '/full-stack/',
    activeMatch: '/full-stack/',
    items: [
      {
        text: '环境搭建',
        collapsed: false,
        items: [
          {
            text: '基础配置',
            items: [
              { text: 'Git 使用手册', link: '/git-config' },

              { text: 'Mac 开发环境搭建', link: '/mac-env' }
            ]
          }
        ]
      },
      {
        text: 'Web 性能优化',
        collapsed: true,
        items: [
          {
            text: '性能优化基础',
            items: [
              { text: 'DNS 与 TCP', link: '/dns-tcp' },
              { text: 'HTTP', link: '/http' },
              { text: '浏览器渲染原理', link: '/browser-rendering-principle' },
              { text: '开发者工具', link: '/dev-tools' },
              { text: '什么是连接复用', link: '/connection-multiplexing' },
              { text: '多路复用', link: '/multiplexing' },
              { text: 'Web 性能优化', link: '/web-perf-optimization' },
              { text: 'WebSocket', link: '/websocket' }
            ]
          }
        ]
      },
      {
        text: 'Node.js 全解',
        collapsed: true,
        items: [
          {
            text: 'Node.js 基础',
            items: [
              { text: 'Node.js 环境搭建', link: '/nodejs/node-env-setup' },
              { text: 'Node.js 技术架构', link: '/nodejs-technical-architecture' },
              { text: '文件模块', link: '/nodejs-fs-file' },
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
              { text: '博客系统搭建', link: '/blog-system-building' }
            ]
          }
        ]
      }
    ]
  },
  {
    text: '设计模式',
    link: '/design-patterns/',
    items: [
      {
        text: 'JavaScript 设计模式',
        items: [
          {
            text: '基础',
            items: [
              { text: 'JavaScript 设计模式笔记一', link: '/overview' },
              { text: '工厂模式', link: '/factory' }
            ]
          }
        ]
      }
    ]
  },
  {
    text: '面试题',
    link: '/interview/',
    items: [
      {
        text: '金九银十',
        items: [
          {
            text: '前端基础',
            items: [
              { text: 'HTML + CSS', link: '/html-css' },
              { text: 'JavaScript 基础篇', link: '/js-base' },
              { text: 'JavaScript 手写篇', link: '/js-handwriting' },
              { text: 'DOM 押题', link: '/dom' },
              { text: 'HTTP 押题', link: '/http' },
              { text: 'Vue 押题', link: '/vue' },
              { text: 'React 押题', link: '/react' },
              { text: 'Node.js 押题', link: '/nodejs' },
              { text: '算法押题', link: '/arithmetic' },
              { text: '刁钻题', link: '/tricky' },
              { text: '其他问题合集', link: '/other' },
              { text: 'HTTP 相关问题', link: '/http-parse' }
            ]
          }
        ]
      }
    ]
  },
  {
    text: '报错集合',
    link: '/errors/',
    activeMatch: '/errors/',
    items: [
      {
        text: '编程报错',
        items: [
          {
            text: '常见错误',
            items: [
              { text: 'Node.js', link: '/node' },
              { text: 'Vite', link: '/vite' },
              { text: 'Git', link: '/git' },
              { text: 'VSCode', link: '/vscode' }
            ]
          }
        ]
      },
      {
        text: '系统/环境错误',
        items: [
          {
            text: '系统相关',
            items: [
              { text: 'Windows', link: '/windows' }
            ]
          }
        ]
      }
    ]
  },
  {
    text: '其他',
    items: [
      {
        text: '配置集合',
        link: '/config/',
        activeMatch: '/config/',
        items: [
          {
            text: 'IDE 配置',
            items: [
              { text: 'VSCode 配置', link: '/vscode' }
            ]
          }
        ]
      },
      {
        text: '其他工具',
        link: '/other/',
        items: [
          {
            text: '工具配置',
            items: [
              { text: 'ChatGPT 常用提示语', link: '/prompt' }
            ]
          }
        ]
      }
    ]
  }
];