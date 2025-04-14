# Web 性能优化

前提条件（只能使用 HTTP 1.1 不能使用 HTTP 2）

## 资源合并

- CSS 雪碧图（已过时）
- Icon Font（已过时）
- SVG Symbols

## 资源内联化

- 小图片 -> data URL
- 小 CSS 文件 -> `<style>代码</style>`
- 小 JS 文件 -> `<script>代码</script>`

## 资源压缩

通过 nginx、Apache、Node.js 实现 gzip 压缩减小文件大小来优化请求速度。

## 代码精简

- HTML：删除空格、删除闭合标签的 "/"。
- CSS：删除未引用（不推荐，可能有动态 CSS）。
- JS：缩短变量名、Tree Shaking。
- SVG：删除 SVG 中无用标签、属性。
- 图片：减小图片体积，分为有损和无损两种，优先使用无损。

## CDN 负载均衡

- Cookie Free
- 并行请求/多路复用（HTTP2）
- 下载速度更快

CDN 内容分发网络

- 如何把文件上传到 CDN？
- 在发布时，用命令行上传文件。
- 修改 HTML 页面请求中对应静态资源网址。

## HTTP 缓存

- 用户第一次请求网址。
- 缓存 1.css、2.js、3.png。
- index.html 永远不会缓存。
- 更新时 index.html 请求新的文件名即可。

Cache-Control 值含义

- public：公开内容，中间的设备都可以对内容进行缓存。
- private：只能在当前用户浏览器和服务器缓存。
- max-age：缓存时间。
- must-revalidate：对过期的缓存经行重新校验。

内容协商（重新校验缓存）

- 服务器返回 304，直接用之前的缓存。
- 服务器返回 200 + 新的文件，根据新响应的 Cache-Control 决定删除或覆盖之前的文件（max-age: 0 就删除，负责就覆盖）。
- 服务器会根据请求头的 If-None-Match：ETag 判断文件是否改变，如果没变就返回 304 否则返回新的内容。

HTTP 各版本缓存方案

| 版本     | 缓存                                        | 内容协商                                                     |
| -------- | ------------------------------------------- | ------------------------------------------------------------ |
| HTTP 1.1 | Cache-Control: max-age: 3600<br>Etag: XXX   | 请求头：If-None-Match: XXX<br>响应：304 + 空 / 200 + 新内容  |
| HTTP 1.0 | Expire: 时间点 A<br>Last-Modified：时间点 B | 请求头：If-Modified-Since：时间点 B<br>响应：304 + 空 / 200 + 新内容 |

## 如何禁用缓存

### 服务端禁用缓存

首先，即使你没有添加 Cache-Control 头，你的请求也会被浏览器缓存（比如 301... 等等）。

所以如果想要禁用缓存，需要在响应头中添加如下内容。

```
Cache-Control: max-age: 0, must-revalidate
```

上面的内容表示，缓存立即失效，并且需要内容协商。根据 MDN 的说法，以下两种写法与上面的结果相同。

```
Cache-Control: no-cache // 不缓存，但可以内容协商
Cache-Control: no-store // 不缓存，并且不能内容协商
```

### 浏览器禁用缓存

第一种方法是，在请求时在请求后添加一个随机数参数，如下

```
axios.get('a/?_=1')
```

第二种方法是添加一个 Header 头

```
xhr.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0")
```

## 代码执行顺序

在 HTML 中，加载 CSS 总是要在 JS 之前，这样可以保证用户打开页面后不会产生（白屏/闪烁）。

```html
<head>
  <link rel="stylesheet" href="1.css">
</head>
<body>
  <div id="app"></div>
  <script src="1.js"></script>
</body>
```

当然，如果有内联的 JS 内容，需要写在 `<head>` 首位，因为内联的 JS 如果不放在首位，需要等待其他的 `.css` 或 `.js` 文件下载。

```html
<head>
  <script>
    // ...内联 JS
  </script>
  <link rel="stylesheet" href="1.css">
</head>
<body>
  <div id="app"></div>
  <script src="1.js"></script>
</body>
```

## 白屏与闪烁

假如有以下代码

```html
// index.html
<html lang="en">
<head>
  <title>Document</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  我应该是红色的 
  <hr>
  控制台应该有log
  <script src="/main.js"></script>
</body>
</html>

// style.css
body {
  color: red;
}

// main.js
console.log('hi')
```

其中 CSS 因为网络原因，请求慢了 10 秒，此时打开浏览器，会导致页面白屏 10 秒。

但是，不同浏览器在 index.html 中 link 标签位置不同的情况下，展示方式也是不同的，如下：

- FireFox 中，如果 link 标签在 body，则会先加载 html 内容，再渲染 CSS（页面白屏）。
- FireFox 中，如果 link 标签在 head，则等待 CSS 请求完成后渲染内容（内容闪烁）。
- Chrome 中，不论 link 在 body 还是 head，都会等待 CSS 请求完成后再渲染（页面白屏）。

## 代码拆分

- JS 每次变动我们都要重新请求 JS 文件，如果文件较大，可能用户每次都需要下载。
- 可以将 JS 内容分模块加载（require、modules）。
- runtime-xxx.js （require 等 Webpack 自带运行时帮助函数）。
- render-xxx.js（第三方库 Vue、Vuex、等）。
- common-xxx.js（Element UI、Antd 等公共库、公共方法）。
- page-index-xxx.js（每个页面的 js）。
- 以上内容均可以通过 Webpack 等打包工具配置。

CSS 拆分，也是同理，分类如下：

- reset/normolize.css
- render-xxx.css
- common-xxx.css
- page-admin-xxx.css

## 动态导入

通过动态导入实现只有在打开对应功能/页面时，才导入对应代码，可以优化首页加载速度。

lodash 动态导入

```js
const array = [1, 2, 3]
import('lodash').then(_ => {
  const value = _.cloneDeep(array)
})
```

Vue Router 动态导入（包括加载状态、报错状态组件）

```js
const router = new VueRouter({
  routes: [
    { path: '/home', component: () => import('./Home.vue') },
    {
      path: '/about',
      component: () => ({
        component: import('./About.vue'),
        loading: LoadingComponent,
        error: ErrorComponent
      })
    }
  ]
})
```

React 动态导入

```jsx
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('./routes/Home'))
const About = lazy(() => import('./routes/About'))

const App = () => (
  <Router>
    <Suspense fallback={LoadingComponent}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route/>
      <Switch>
    </Suspense>
  </Router>
)
```

## 图片懒加载

只有用户屏幕滚动到该图片时，才加载该图片

```js
<img src="product.jpg">
<img src="placeholder.png" data-src="product.jpg">

// js 实现
window on scroll
  findImage().each img
    new Image()
      .src = img.dataset.src
      .onload img.src = img.dataset.src
```

## 预加载

在用户查看对应内容前就加载该内容，比如用户滚动到当前屏幕的一半时，就加载下一屏图片。或在看小说时，当用户翻页到第一页，就可以预加载第二页内容。

## CSS 优化

- 删除无用的 CSS（Webpack 插件）。
- 使用更高效的选择器（尽量使用更准确的选择器）。
- 减少重排（reflow/relayout）有些 CSS 的修改会导致页面重排，如 left，可以改为 `transform: translateX()`。
- 不要使用 `@import url.css`，它只能串行执行，不能并行执行。
- 启用 GPU 硬件加速（添加 `transform: translate3d(0, 0, 0)`）
- 尽量使用缩写（`#FFFFFF => #fff，0.1 => .1`）

## JS 代码优化技巧

- 尽量不使用全局变量。
- 尽量减少 DOM 操作。
- 不要在页面中插入大量 HTML（例如：`innerHtml = "一万个节点..."`）
- 尽量减少重排（可以使用节流、防抖降低重排频率）。
- 尽量减少闭包的使用，避免内存泄漏（实际上是 IE 浏览器的 bug）
- 面试：使用虚拟滚动列表（参考：[新手也能看懂的虚拟滚动实现方法](https://juejin.cn/post/6844904183582162957)）。