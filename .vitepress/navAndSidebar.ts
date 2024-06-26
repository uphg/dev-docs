import { DefaultTheme } from "vitepress"

const DesignPatterns = [
  {
    text: 'JavaScript 设计模式',
    items: createItems('/design-patterns/', [
      { text: 'JavaScript 设计模式笔记一', link: '/overview' },
      { text: '工厂模式', link: '/factory' },
    ]) 
  },
]

const web = [
  {
    text: 'JavaScript',
    collapsed: false,
    items: createItems('/web/', [
      { text: 'Iterable object（可迭代对象）', link: '/iterable-object' },
      { text: 'Generator', link: '/generators' },
      { text: '异步迭代和 generator', link: '/async-iterators-generators' },
      { text: 'Proxy 和 Reflect', link: '/proxy' },
      { text: '常用方法实现', link: '/api-implemented' },
      { text: 'ES6 常用 API', link: '/es6' },
    ]) 
  },
  {
    text: 'TypeScript',
    collapsed: false,
    items: createItems('/typescript/', [
      { text: '类型基础', link: '/basics' },
      { text: '类型兼容', link: '/compatible' },
      { text: '函数', link: '/function' },
      { text: '泛型', link: '/generics' },
      { text: 'Class', link: '/class' },
      { text: '类型体操', link: '/gymnastics' },
      { text: '在项目中使用', link: '/used-in-the-project' },
      { text: 'TypeScript Config', link: '/config' }
    ])
  },
]

const vue = [
  {
    text: 'Vue.js',
    collapsed: false,
    items: createItems('/vue/', [
      { text: 'Vue2 API', link: '/vue2-api' },
      { text: 'Vue3 API', link: '/vue3-api' },
    ])
  },
  {
    text: 'Vue 设计与实现',
    collapsed: false,
    items: createItems('/vue/', [
      { text: '框架设计概览', link: '/design-overview' },
      { text: 'Vue.js 设计思路', link: '/design-ideas' },
      { text: '响应系统的作用与实现', link: '/response-system' },
      { text: '非原始值 & 原始值响应方案', link: '/non-primitive-response' },
      { text: '渲染器', link: '/renderer' },
      { text: 'Diff 算法', link: '/diff' },
    ])
  },
]

const react = [
  {
    text: 'React',
    collapsed: false,
    items: createItems('/react/', [
      { text: 'Lisp 入门', link: '/lisp' },
      { text: '面向对象核心', link: '/object-oriented-core' },
      { text: 'useState 实现原理', link: '/use-state.md' },
      { text: 'React Hooks API', link: '/hooks.md' },
      { text: 'React 状态管理', link: '/status-management.md' },
    ])
  },
  {
    text: 'React Native',
    collapsed: false,
    items: createItems('/react/', [
      { text: '环境搭建', link: '/environment-setup'},
    ])
  },
]

const fullStack = [
  {
    text: '环境搭建',
    collapsed: false,
    items: createItems('/full-stack/', [
      { text: 'Git 使用手册', link: '/git-config' },
      { text: 'Node.js 环境搭建', link: '/nodejs/node-env-setup' },
      { text: 'Mac 开发环境搭建', link: '/mac-env' },
    ])
  },
  {
    text: 'Web 性能优化',
    collapsed: true,
    items: createItems('/full-stack/', [
      { text: 'DNS 与 TCP', link: '/dns-tcp' },
      { text: 'HTTP', link: '/http' },
      { text: '浏览器渲染原理', link: '/browser-rendering-principle' },
      { text: '开发者工具', link: '/dev-tools' },
      { text: '什么是连接复用', link: '/connection-multiplexing' },
      { text: '多路复用', link: '/multiplexing' },
      { text: 'Web 性能优化', link: '/web-perf-optimization' },
      { text: 'WebSocket', link: '/websocket' }
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
    text: '记账项目',
    collapsed: true,
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
      { text: '工厂模式', link: '/factory-pattern' },
      { text: '你会做WEB上的用户登录功能吗？（转）', link: '/web-login' }
    ])
  }
]

const interview = [
  {
    text: '金九银十',
    items: createItems('/interview/', [
      { text: 'HTML + CSS', link: '/html-css' },
      { text: 'JavaScript 基础篇', link: 'js-base' },
      { text: 'JavaScript 手写篇', link: 'js-handwriting' },
      { text: 'DOM 押题', link: '/dom' },
      { text: 'HTTP 押题', link: '/http' },
      { text: 'Vue 押题', link: '/vue' },
      { text: 'React 押题', link: '/react' },
      { text: 'Node.js 押题', link: '/nodejs' },
      { text: '算法押题', link: '/arithmetic' },
      { text: '刁钻题', link: '/tricky' },
      { text: '其他问题合集', link: '/other' },
      { text: 'HTTP 相关问题', link: '/http-parse' },
    ])
  }
]

const errors = [
  {
    text: '编程报错',
    items: [
      { text: 'Node.js', link: '/errors/node' },
      { text: 'Vite', link: '/errors/vite' },
      { text: 'Git', link: '/errors/git' },
      { text: 'VSCode', link: '/errors/vscode' }
    ]
  },
  {
    text: '系统/环境错误',
    items: [
      { text: 'Windows', link: '/errors/windows' },
    ]
  }
]

const other = [
  {
    text: '环境配置',
    items: [
      { text: 'ChatGPT 常用提示语', link: '/other/prompt' }
    ]
  }
]

const config = [
  {
    text: 'IDE 配置合集',
    items: [
      { text: 'VSCode 配置', link: '/config/vscode' }
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
    activeMatch: '/web/|/typescript/',
    link: web[0].items[0].link
  },
  {
    text: 'Vue.js',
    activeMatch: '/vue/',
    link: vue[0].items[0].link
  },
  {
    text: 'React.js',
    activeMatch: '/react/',
    link: react[0].items[0].link
  },
  {
    text: '全栈',
    activeMatch: '/full-stack/',
    link: fullStack[0].items[0].link!
  },
  {
    text: '报错集合',
    activeMatch: '/errors/',
    link: errors[0].items[0].link
  },
  {
    text: '其他',
    items: [
      {
        text: '配置集合',
        activeMatch: '/config/',
        link: config[0].items[0].link!
      },
      {
        text: '金九银十',
        activeMatch: '/interview/',
        link: interview[0].items[0].link!
      },
      {
        text: '杂项',
        activeMatch: '/other/',
        link: other[0].items[0].link!
      }
    ]
  }
]

export const sidebar = {
  '/': web,
  '/vue/': vue,
  '/react/': react,
  '/full-stack/': fullStack,
  '/other/': other,
  '/interview/': interview,
  '/errors/': errors,
  '/config/': config,
  '/design-patterns/': DesignPatterns
}

function createItems(pathPrefix: string, list: DefaultTheme.SidebarItem[]): DefaultTheme.SidebarItem[] {
  return list.map(item => ({ ...item, link: `${pathPrefix}${item.link}`.replace(/\/\//g, '/') }))
}