<!-- ---
title: Node.js 技术架构
date: 2021-07-17T16:46:12+08:00
tags:
  - Node.js
--- -->

# Node.js 技术架构

## API 文档

- 官方地址：[中文文档](http://nodejs.cn/api/)/[英文文档](https://nodejs.org/api/)
- [devdocs.io](https://devdocs.io/) 搜索功能便捷，支持夜间模式，并且可以离线观看

## Node.js 是什么

- **是一个平台**
  - 让多种技术组合起来
  - 让 JavaScript 也能调用系统接口、开发后端应用

- **Node.js 用到了哪些技术**
  - V8引擎
  - libuv
  - C/C++ 实现的 c-ares、http-parser、OpenSSL、zlib 等库

## Node.js 不是什么

- **不是 web 框架**
  - Node.js 并不是 web 后端框架
  - 所以你不能把 Node.js 与 Flask 或 Spring 对比

- **不是编程语言**
  - Node.js 并不是后端的 JS
  - 所以你不能把 Node.js 与 Python 或 PHP 对比

## Node.js 技术架构

```mermaid
graph TD
    direction TB

    subgraph "底层基础库"
        V8[JS引擎: V8]
        libuv[跨平台异步I/O: libuv] -->|依赖| c-ares[DNS解析: c-ares]
        OpenSSL[加密解密: OpenSSL]
        http_parser[HTTP协议解析: http_parser]
        zlib[压缩/解压缩: zlib]
    end

    subgraph "Node.js 绑定层"
        NodeBindings[Node.js Bindings\n(JS与C/C++通信接口)] -->|封装| libuv
        NodeBindings -->|封装| http_parser
        NodeBindings -->|封装| OpenSSL
        NodeBindings -->|封装| zlib
        NodeBindings -->|对接| V8[通过V8 API]
    end

    subgraph "Node.js 内置模块"
        http模块[http 模块] -->|调用| NodeBindings
        fs模块[fs 模块] -->|调用| NodeBindings
        stream模块[stream 模块] -->|抽象| http模块
        stream模块 -->|抽象| fs模块
    end

    subgraph "上层应用与扩展"
        JS应用[JavaScript 应用] -->|使用| http模块
        JS应用 -->|使用| fs模块
        JS应用 -->|使用| stream模块
        CPlugins[C/C++ 插件] -->|通过| NodeBindings[与JS交互]
        CPlugins -->|直接调用| libuv
        CPlugins -->|直接调用| OpenSSL
        CPlugins -->|直接调用| zlib
    end

    classDef engine fill:#f96,stroke:#333
    classDef lib fill:#6cf,stroke:#333
    classDef binding fill:#fc6,stroke:#333
    classDef module fill:#9f6,stroke:#333
    classDef app fill:#c9f,stroke:#333

    class V8 engine
    class libuv,c-ares,OpenSSL,http_parser,zlib lib
    class NodeBindings binding
    class http模块,fs模块,stream模块 module
    class JS应用,CPlugins app
```

http 模块、fs 模块、stream 模块

- **Node.js bindings**

  让 JS 和 C/C++ 通信

- **C/C++ 插件**

  自定义其他能力

- JS 引擎

  V8

- 跨平台异步I/O能力

  libuv

- DNS 解析

  c-ares

- 加密解密

  OpenSSL

- 其他...

  http_parser、zlib

随着 Node.js 的版本已经从 0.8 升级到 12.11.1，其架构也在一直变化中。如果你想看源码，推荐看 [Node.js v0.10.0](https://github.com/nodejs/node/tree/v0.10.0) 版本，因为这个版本使用了很久，而且源码相对最新版较少。

如果想要了解更多，可以看 [深入理解Node.js：核心思想与源码分析](https://github.com/yjhjstz/deep-into-node)

## 什么是 bindings

### 背景

- C/C++ 实现了一个 http_parser 库， 很高效
- 你只会写 JS，但想使用这个库
- 直接调用肯定不会成功，于是就需要一个中间的桥梁

### bindings

- Node.js 用 C++ 对 `http_parser` 进行封装，使它符合某些要求，封装的文件名就叫做 `http_parser_bindings.cpp`
- 用 Node.js 提供的编译工具将其编译为 `.node` 文件，JS 代码就可以直接 require 这个 `.node` 文件
- 这样 JS 就能调用 C++ 库，中间的桥梁就是 binding
- 由于 Node.js 提供了很多 binding，所以要加个 s，这就是 **`bindings`** 的由来

## JS 与 C++ 交互案例

- JS 调用 C++ 代码：[官方示例](http://nodejs.cn/api/addons.html#addons_function_arguments)
- C++ 调用 JS 代码：[官方示例](http://nodejs.cn/api/addons.html#addons_callbacks)


## 什么是 EventLoop

**Event 表示事件**，如：
- 计时器到期，要执行一个事件
- 文件读取完毕或出错，要执行一个事件
- socket 有内容了，关闭了，要执行一个事件

**Loop 就是循环**，如：
- while(true) 循环（死循环）
- Node.js 需要按照顺序轮询每种事件，这种事件往往都是循环，所以叫 loop

**EventLoop**
- 操作系统触发事件，JS 处理事件，EventLoop 就是对事件处理顺序的管理
- 通常 EventLoop 会停留在 poll 阶段，不停的问操作系统，接下来有没有事情做

EventLoop 执行顺序图示

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

::: details 图示

![EventLoop 执行顺序图示](../../_images/nodejs-eventloop-process.jpg)

:::

## Node.js 工作流程

![Node.js 工作流程](../../_images/nodejs-process.jpg)

## setTimeout & setImmediate 的执行顺序

下面的代码中，那个函数先执行

```js
setTimeout(f1, 0)
setImmediate(f2)
```

一般情况下都是 `setImmediate(f2)` 先执行，因为它处在 check 阶段，只有在 Node.js 第一次运行时，会先进入 timers 阶段

end 。。。

<style lang="scss" scoped>
.flexible-container {
  min-width: 690px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;

  & > .flexible-table {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    text-align: center;

    .flexible-table__title > b {
      font-size: 26px;
      font-weight: 500;
    }

    p {
      margin: 0;
    }

    & > li {
      margin: 0;
      padding: 10px 0;
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
    }
    &:nth-child(1) > li {
      width: 100%;
    }
      
    &:nth-child(2) > li {
      width: 50%;
    }
      
    &:nth-child(3) > li {
      flex-grow: 1;
    }
  }
    
}
</style>