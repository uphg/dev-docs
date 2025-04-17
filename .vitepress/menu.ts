import path from "path";
import { text } from "stream/consumers";

export const menu = [
  {
    text: '首页',
    path: '/'
  },
  {
    text: '前端工程化',
    path: '/front-end/',
    items: [
      {
        text: 'JavaScript',
        path: '/js/',
        items: [
          {
            text: 'JavaScript 基础',
            link: '/base/',
            items: [
              { text: 'Iterable object（可迭代对象）', link: '/iterable-object' },
              { text: 'Generator', link: '/generators' },
              { text: '异步迭代和 generator', link: '/async-iterators-generators' },
              { text: 'Proxy 和 Reflect', link: '/proxy' },
              { text: '常用方法实现', link: '/api-implemented' },
              { text: 'ES6 常用 API', link: '/es6' }
            ]
          },
          {
            text: 'JavaScript 设计模式',
            link: '/design-patterns/',
            items: [
              { text: 'JavaScript 设计模式笔记一', link: '/overview' },
              { text: '工厂模式', link: '/factory' },
            ]
          }
        ]
      },
      {
        text: 'TypeScript',
        path: '/ts/',
        items: [
          {
            text: 'TypeScript 基础',
            link: '/',
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
      },
      {
        text: 'Vue.js ',
        path: '/vue/',
        items: [
          {
            text: 'Vue 设计与实现',
            link:'/design/',
            items: [
              { text: '框架设计概览', link: '/design-overview' },
              { text: 'Vue.js 设计思路', link: '/design-ideas' },
              { text: '响应系统的作用与实现', link: '/response-system' },
              { text: '非原始值 & 原始值响应方案', link: '/non-primitive-response' },
              { text: '渲染器', link: '/renderer' },
              { text: 'Diff 算法', link: '/diff' },
            ]
          }
        ]
      },
      {
        text: 'React.js',
        path: '/react/',
        items: [
          {
            text: 'React 基础',
            link: '/base/',
            items: [
              { text: 'Lisp 入门', link: '/lisp' },
              { text: '面向对象核心', link: '/object-oriented-core' },
              { text: 'useState 实现原理', link: '/use-state.md' },
              { text: 'React Hooks API', link: '/hooks.md' },
              { text: 'React 状态管理', link: '/status-management.md' },
            ]
          },
          {
            text: 'React Native',
            link: '/native/',
            items: [
              { text: '环境搭建', link: '/environment-setup'},
            ]
          },
        ]
      },
      {
        text: '前端工具',
        path: '/tools/',
        collapsed: false,
        items: [
          {
            text: 'Webpack 源码解析',
            link: '/webpack',
            items: [
              { text: 'AST、babel、依赖', link: '/webpack-ast-babel-and-rely' },
              { text: 'Webpack 核心原理', link: '/webpack-core' },
              { text: 'Loader 原理', link: '/webpack-loader-principle' },
              { text: 'Webpack 源码阅读', link: '/webpack-source' }
            ]
          }
        ]
      }
    ]
  },
  {
    text: '后端体系',
    path: '/back-end/',
    items: [
      {
        text: 'Node.js',
        path: '/nodejs/',
        items: [
          {
            text: 'Node.js 全解',
            link: '/guide',
            items: [
              { text: 'Node.js 环境搭建', link: '/node-env-setup' },
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
            ]
          }
        ]
      },
      {
        text: 'Python',
        path: '/py/',
        items: [
          {
            text: 'Python 全解',
            link: '/guide/',
            items: [
              { text: '安装 Python', link: '/py-install' },
              { text: 'Python 基础', link: '/py-base' },
              { text: '函数', link: '/py-function' },
              { text: '高级特性', link: '/py-features' },
              { text: '函数式编程', link: '/py-functional' },
              { text: '模块详解', link: '/py-module' },
              { text: '面向对象编程', link: '/py-oop' },
              { text: '面向对象高级编程', link: '/py-oop-advanced' }
            ]
          }
        ]
      }
    ]
  },
  {
    text: 'DevOps',
    path: '/dev-ops/',
    items: [
      {
        text: 'IDE 配置集合',
        path: '/ide-config/',
        collapsed: false,
        items: [
          {
            text: 'IDE 配置',
            link: '/',
            items: [
              { text: 'VSCode 配置', link: '/vscode' },
            ]
          }
        ]
      },
      {
        text: 'Web 性能优化',
        path: '/web-perf/',
        items: [
          {
            text: 'Web 性能优化',
            link: '/',
            items: [
              { text: 'DNS 与 TCP', link: '/dns-tcp' },
              { text: 'HTTP', link: '/http' },
              { text: '浏览器渲染原理', link: '/browser-rendering-principle' },
              { text: '开发者工具', link: '/dev-tools' },
              { text: '什么是连接复用', link: '/connection-multiplexing' },
              { text: '多路复用', link: '/multiplexing' },
              { text: 'WebSocket', link: '/websocket' }
            ]
          }
        ]
      }
    ]
  },
  {
    text: '项目实战',
    path: '/project/',
    items: [
      {
        text: '山竹记账',
        link:'/bookkeeping/',
        collapsed: false,
        items: [
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
        ]
      }
    ]
  },
  {
    text: '面试宝典',
    path: '/interview/',
    items: [
      {
        text: '金三银四',
        link: '/',
        collapsed: false,
        items: [
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
        ]
      }
    ]
  },
  {
    text: '异常处理',
    path: '/errors/',
    items: [
      {
        text: '错误处理',
        link: '/',
        collapsed: false,
        items: [
          { text: 'Git 错误处理', link: '/git' },
          { text: 'Node.js 错误处理', link: '/node' },
          { text: 'Vite 错误处理', link: '/vite' },
          { text: 'VSCode 错误处理', link: '/vscode' },
          { text: 'Windows 错误处理', link: '/windows' }
        ]
      }
    ]
  }
]