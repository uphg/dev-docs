# 框架设计概览

## 命令式和声明式

假如要实现以下功能

1. 获取 id 为 app 的 div 标签
2. 它的文本内容为 hello world
3. 为其绑定点击事件
4. 当点击时弹出提示：ok

jQuery 命令式

```jsx
$('#app')
  .text('hello world')
  .on('click', () => { alert('ok') })
```

原生 JS 命令式

```jsx
const div = document.querySelector('#app')
div.innerText = 'hello world'
div.addEventListener('click', () => { alert('ok') })
```

Vue 声明式

```html
<div @click="() => alert('ok')">hello world</div>
```

总结

- 命令式更加关注实现过程，符合我们的逻辑直觉
- 而声明式只关注结果，至于实现过程，我们并不关心
- Vue.js 的内部实现是命令式的，而暴露给用户的却更加声明式
- 命令式代码性能总是优于声明式，但声明式的代码可维护性更高

## 虚拟 DOM

虚拟 DOM 与其他方式渲染对比

- 原生 JavaScript：心智负担大，可维护性差，性能高
- innerHTML：心智负担中等，可维护性中等（需要使用原生 JavaScript 绑定事件），代码过多时性能差
- 虚拟 DOM：心智负担小，可维护性强，性能中等

## 运行时和编译时

设计一个框架有三种选择：纯运行时的、运行时 + 编译时、纯编译时的

### 纯运行时的框架

只提供树形结构对象（AST）转换为 DOM 元素的功能

```jsx
// 树形结构
const obj = {
  tag: 'div',
  children: [
    { tag: 'span', children: 'hello world' }
  ]
}

// 渲染函数
function Render(obj, root) {
  const el = document.createElement(obj.tag)
  if (typeof obj.children === 'string') {
    const text = document.createTextNode(obj.children)
    el.appendChild(text)
  } else if (obj.children) {
    // 数组，递归调用 Render，使用 el 作为 root 参数
    obj.children.forEach((child) => Render(child, el))
  }

  // 将元素添加到 root
  root.appendChild(el)
}
```

手写树型结构的数据对象太麻烦，不直观，能不能用类似 HTML 标签的结构描述树形对象呢？

### **运行时 + 编译时**

创建一个 Compiler 用于将 HTML 字符串编译为树形结构

```jsx
const html = `
<div>
  <span>hello world</span>
</div>
`
// 调用 Compiler 编译得到树型结构的数据对象
const obj = Compiler(html)
// 再调用 Render 进行渲染
Render(obj, document.body)
```

此时框架就变成了**运行时 + 编译时**的框架：

- 它既支持运行时，用户可以直接提供树形结构对象
- 又支持编译时，用户可以提供 HTML 字符串，将其编译为数据对象再调用运行时函数
- 准确来说，上面代码其实是**运行时编译**，在代码运行的时候才开始编译，会产生一定的性能开销

### 纯编译时

将 HTML 直接转换为命令式代码，就称为纯编译时，如下：

```html
<div>
  <span> hello world </span>
</div>
```

编译为

```js
const div = document.createElement('div')
const span = document.createElement('span')
span.innerText = 'hello world'
div.appendChild(span)
document.body.appendChild(div)
```

特点：

- 只需要一个 Compiler 函数，连 Render 都不需要
- 不支持任何运行时内容，用户的代码通过编译器编译后才能运行

**总结**

- 运行时：只提供树形结构对象（AST）转换为 DOM 元素的功能（性能较差）
- 运行时+编译时：提供 HTML 字符串转 树形结构 再转为 DOM 元素的功能（可以在编译时标记需要优化的代码，在运行时优化性能）
- 编译时：将 HTML 直接转换为 DOM 元素（命令式代码）灵活性较差，代码必须编译后再运行

## 框架设计的核心要素

- 热更新支持
- 警告信息，在开发环境中为用户提供友好的警告信息的同时，不会增加生产环境代码的体积。
- 良好的 Tree-Shaking

### **Tree-Shaking**

Tree-Shaking 指的就是消除那些永远不会被执行的代码，也就是排除 dead code

想要实现 Tree-Shaking，模块必须是 ESM（ES Module），因为 Tree-Shaking 依赖 ESM 的静态结构

例如以下代码

```jsx
// input.js
import { foo } from './utils.js'
foo()

// utils.js
export function foo(obj) {
  obj && obj.foo
}
export function bar(obj) {
  obj && obj.bar
}
```

运行 `npx rollup input.js -f esm -o bundle.js` 打包后的 bundle.js

```jsx
// bundle.js
function foo(obj) {
  obj && obj.foo
}
foo()
```

其实上面的代码，`foo()` 的调用也是没有意义的，它只是访问了一下 [obj.foo](http://obj.foo) 并没有执行内容，此时可以添加  注释，表示这是没有意义的代码

```jsx
import {foo} from './utils'

/*#__PURE__*/ foo()
```

注释代码 `/#__PURE**__**/`，其作用就是告诉 rollup.js，对于 foo 函数的调用不会产生副作用，你可以放心地对其进行 Tree-Shaking，此时再次执行构建命令并查看 bundle.js 文件，就会发现它的内容是空的，这说明 Tree-Shaking 生效了。

**副作用代码**

副作用就是，当调用函数的时候会对外部产生影响，例如修改了全局变量

### 错误提示

Vue 利用 Tree-Shaking 机制，配合构建工具预定义常量，例如 `__DEV__` 常量，从而实现只在开发环境中打印警告信息，而生产环境则不包含该代码（优化代码体积）

```jsx
if (__DEV__ && !res) {
  warn(`Failed to mount app: mount target selector "${container}" returned null.`)
}

// 开发环境
if (true && !res) {
  warn(`Failed to mount app: mount target selector "${container}" returned null.`)
}

// 生产环境（这段代码会被 Tree-Shaking 优化掉，俗称：dead code）
if (false && !res) {
  warn(`Failed to mount app: mount target selector "${container}" returned null.`)
}
```

### esm-browser & esm-bundler 的区别

package.json 的配置示例

```jsx
{
  "main": "index.js",
  "module": "dist/vue.runtime.esm-bundler.js",
}
```

如果项目使用 webpack 构建，它会自动去找 module 配置的 vue.runtime.esm-bundler.js

它们的区别

- esm-bundler 字样的 ESM 资源是给 rollup.js 或 webpack 等打包工具使用的
- esm-browser 字样的 ESM 资源是直接给浏览器 `<script type="module">` 引用的

esm-bundler 的作用

```jsx
// 将以下代码
if (__DEV__) {
  warn(`useCssModule() is not supported in the global build.`)
}

// 转化为
if ((process.env.NODE_ENV !== 'production')) {
  warn(`useCssModule() is not supported in the global build.`)
}
```

这样做的好处是，用户可以通过 webpack 配置自行决定构建资源的目标环境

### 服务端渲染

为了支持服务端渲染，还要输出这样的代码

```jsx
const Vue = require('vue')
```

服务端渲染在 Node.js 环境中运行，该环境资源的模块格式是 CommonJS，简称 cjs

### 特性支持

框架有时会提供多种特性开关，类似上文的 `__DEV__` ，如果你不需要该功能，可以选择是否关闭，比如 `__VUE_OPTIONS_API__` 表示是否支持 Options API（选项 API），由于 Vue 3 的 Options API 底层也是用 Composition API 实现，所以如果不支持  Options API 可以减少代码体积。示例：

```jsx
// support for 2.x options
if (__VUE_OPTIONS_API__) { // 注意这里
  currentInstance = instance
  pauseTracking()
  applyOptions(instance, Component)
  resetTracking()
  currentInstance = null
}
```

### 全局错误处理

封装错误处理函数示例

```jsx
// utils.js
let handleError = null
export default {
  foo(fn) {
    callWithErrorHandling(fn)
  },
  // 用户可以调用该函数注册统一的错误处理函数
  registerErrorHandler(fn) {
    handleError = fn
  }
}
function callWithErrorHandling(fn) {
  try {
    fn && fn()
  } catch (e) {
    // 将捕获到的错误传递给用户的错误处理程序
    handleError(e)
  }
}
```

使用

```jsx
import utils from 'utils.js'
// 注册错误处理程序
utils.registerErrorHandler((e) => {
  console.log(e)
})
utils.foo(() => {/*...*/})
utils.bar(() => {/*...*/})
```

在 Vue.js 中，也可以注册统一的错误处理函数

```jsx
import App from 'App.vue'
const app = createApp(App)
app.config.errorHandler = () => {
  // 错误处理程序
}
```