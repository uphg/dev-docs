export const nav = [
  {
    "text": "首页",
    "link": "/"
  },
  {
    "text": "前端工程化",
    "items": [
      {
        "text": "JavaScript",
        "activeMatch": "/front-end/js/",
        "link": "front-end/js/iterable-object"
      },
      {
        "text": "TypeScript",
        "activeMatch": "/front-end/ts/",
        "link": "front-end/ts/basics"
      },
      {
        "text": "Vue.js ",
        "activeMatch": "/front-end/vue/",
        "link": "front-end/vue/design/design-overview"
      },
      {
        "text": "React.js",
        "activeMatch": "/front-end/react/",
        "link": "front-end/react/base/lisp"
      }
    ]
  },
  {
    "text": "后端体系",
    "items": [
      {
        "text": "Node.js",
        "activeMatch": "/back-end/nodejs/",
        "link": "back-end/nodejs/guide/node-env-setup"
      }
    ]
  },
  {
    "text": "项目实战",
    "activeMatch": "/project/",
    "link": "project/bookkeeping/docker-env"
  }
]
export const sidebar = {
  "/front-end/js/": [
    {
      "text": "JavaScript 基础",
      "items": [
        {
          "text": "Iterable object（可迭代对象）",
          "link": "/front-end/js/iterable-object"
        },
        {
          "text": "Generator",
          "link": "/front-end/js/generators"
        },
        {
          "text": "异步迭代和 generator",
          "link": "/front-end/js/async-iterators-generators"
        },
        {
          "text": "Proxy 和 Reflect",
          "link": "/front-end/js/proxy"
        },
        {
          "text": "常用方法实现",
          "link": "/front-end/js/api-implemented"
        },
        {
          "text": "ES6 常用 API",
          "link": "/front-end/js/es6"
        }
      ],
      "link": "/front-end/js/"
    }
  ],
  "/front-end/ts/": [
    {
      "text": "TypeScript 基础",
      "items": [
        {
          "text": "类型基础",
          "link": "/front-end/ts/basics"
        },
        {
          "text": "类型兼容",
          "link": "/front-end/ts/compatible"
        },
        {
          "text": "函数",
          "link": "/front-end/ts/function"
        },
        {
          "text": "泛型",
          "link": "/front-end/ts/generics"
        },
        {
          "text": "Class",
          "link": "/front-end/ts/class"
        },
        {
          "text": "类型体操",
          "link": "/front-end/ts/gymnastics"
        },
        {
          "text": "在项目中使用",
          "link": "/front-end/ts/used-in-the-project"
        },
        {
          "text": "TypeScript Config",
          "link": "/front-end/ts/config"
        }
      ],
      "link": "/front-end/ts/"
    }
  ],
  "/front-end/vue/": [
    {
      "text": "Vue 设计与实现",
      "link": "/front-end/vue/design/",
      "items": [
        {
          "text": "框架设计概览",
          "link": "/front-end/vue/design/design-overview"
        },
        {
          "text": "Vue.js 设计思路",
          "link": "/front-end/vue/design/design-ideas"
        },
        {
          "text": "响应系统的作用与实现",
          "link": "/front-end/vue/design/response-system"
        },
        {
          "text": "非原始值 & 原始值响应方案",
          "link": "/front-end/vue/design/non-primitive-response"
        },
        {
          "text": "渲染器",
          "link": "/front-end/vue/design/renderer"
        },
        {
          "text": "Diff 算法",
          "link": "/front-end/vue/design/diff"
        }
      ]
    }
  ],
  "/front-end/react/": [
    {
      "text": "React 基础",
      "link": "/front-end/react/base/",
      "collapsed": false,
      "items": [
        {
          "text": "Lisp 入门",
          "link": "/front-end/react/base/lisp"
        },
        {
          "text": "面向对象核心",
          "link": "/front-end/react/base/object-oriented-core"
        },
        {
          "text": "useState 实现原理",
          "link": "/front-end/react/base/use-state.md"
        },
        {
          "text": "React Hooks API",
          "link": "/front-end/react/base/hooks.md"
        },
        {
          "text": "React 状态管理",
          "link": "/front-end/react/base/status-management.md"
        }
      ]
    },
    {
      "text": "React Native",
      "collapsed": false,
      "link": "/front-end/react/native/",
      "items": [
        {
          "text": "环境搭建",
          "link": "/front-end/react/native/environment-setup"
        }
      ]
    }
  ],
  "/back-end/nodejs/": [
    {
      "text": "Node.js 全解",
      "link": "/back-end/nodejs/guide",
      "items": [
        {
          "text": "Node.js 环境搭建",
          "link": "/back-end/nodejs/guide/node-env-setup"
        },
        {
          "text": "Node.js 技术架构",
          "link": "/back-end/nodejs/guide/nodejs-technical-architecture"
        },
        {
          "text": "文件模块",
          "link": "/back-end/nodejs/guide/nodejs-fs-file"
        },
        {
          "text": "静态服务器",
          "link": "/back-end/nodejs/guide/static-server"
        },
        {
          "text": "命令行翻译工具",
          "link": "/back-end/nodejs/guide/nodejs-fanyi"
        },
        {
          "text": "操作数据库",
          "link": "/back-end/nodejs/guide/operational-database"
        },
        {
          "text": "数据库基础知识",
          "link": "/back-end/nodejs/guide/database-basics"
        },
        {
          "text": "Stream 入门",
          "link": "/back-end/nodejs/guide/stream-getting-started"
        },
        {
          "text": "子进程",
          "link": "/back-end/nodejs/guide/child-process"
        },
        {
          "text": "Express 全解",
          "link": "/back-end/nodejs/guide/express"
        },
        {
          "text": "Koa 全解",
          "link": "/back-end/nodejs/guide/koa"
        },
        {
          "text": "Next.js 全解",
          "link": "/back-end/nodejs/guide/nextjs"
        },
        {
          "text": "TypeORM 数据库实践",
          "link": "/back-end/nodejs/guide/TypeORM-database-practice"
        },
        {
          "text": "数据库设计与搭建",
          "link": "/back-end/nodejs/guide/database-design-and-build"
        },
        {
          "text": "博客系统搭建",
          "link": "/back-end/nodejs/guide/blog-system-building"
        }
      ]
    },
    {
      "text": "Webpack 源码解析",
      "link": "/back-end/nodejs/webpack",
      "collapsed": false,
      "items": [
        {
          "text": "AST、babel、依赖",
          "link": "/back-end/nodejs/webpack/webpack-ast-babel-and-rely"
        },
        {
          "text": "Webpack 核心原理",
          "link": "/back-end/nodejs/webpack/webpack-core"
        },
        {
          "text": "Loader 原理",
          "link": "/back-end/nodejs/webpack/webpack-loader-principle"
        },
        {
          "text": "Webpack 源码阅读",
          "link": "/back-end/nodejs/webpack/webpack-source"
        }
      ]
    }
  ],
  "/project/": [
    {
      "text": "山竹记账",
      "link": "/project/bookkeeping/",
      "items": [
        {
          "text": "Docker 环境搭建",
          "link": "/project/bookkeeping/docker-env"
        },
        {
          "text": "Docker 操作手册",
          "link": "/project/bookkeeping/docker"
        },
        {
          "text": "RESTful API",
          "link": "/project/bookkeeping/restful-api"
        },
        {
          "text": "后端单元测试",
          "link": "/project/bookkeeping/backend-unit-tests"
        },
        {
          "text": "部署上线",
          "link": "/project/bookkeeping/deployment-online"
        },
        {
          "text": "Rails 密钥管理",
          "link": "/project/bookkeeping/rails-key-management"
        },
        {
          "text": "部署到云服务器",
          "link": "/project/bookkeeping/deploy-cloud-server"
        },
        {
          "text": "使用 Rails 发送邮件",
          "link": "/project/bookkeeping/rails-send-email"
        },
        {
          "text": "JWT 的定义与用法",
          "link": "/project/bookkeeping/jwt-usage"
        },
        {
          "text": "Rails 手册",
          "link": "/project/bookkeeping/rails"
        },
        {
          "text": "Ruby 笔记",
          "link": "/project/bookkeeping/ruby"
        },
        {
          "text": "工厂模式",
          "link": "/project/bookkeeping/factory-pattern"
        },
        {
          "text": "你会做WEB上的用户登录功能吗？（转）",
          "link": "/project/bookkeeping/web-login"
        }
      ]
    }
  ]
}