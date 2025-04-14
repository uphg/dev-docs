# Vue 押题

## Vue 2 生命周期有哪些

常用的

- beforeCreate（SSR）
- created（SSR）
- beforeMount
- Mounted
- beforeUpdate
- updated
- beforeDestroy
- Destroyed

特殊的

- ****[activated](https://v2.cn.vuejs.org/v2/api/#activated)****：keep-alive 缓存的组件激活时调用。
- ****[deactivated](https://v2.cn.vuejs.org/v2/api/#deactivated)****：keep-alive 缓存的组件失活时调用。
- [errorCaptured](https://v2.cn.vuejs.org/v2/api/#errorCaptured)（**2.5.0+**）捕获来自任何后代组件的错误时调用。

官方的一张图清晰的展示了生命周期

![lifecycle.png](https://v2.cn.vuejs.org/images/lifecycle.png)

## Vue 2 组件间通信方式有哪些

1. 父子组件使用 props 和事件（on）进行通信
2. 爷孙组件：
    1. 使用 provide + inject 通信
    2. 嵌套使用父子组件通信（不推荐）
3. 任意组件（没有父子关系）
    1. 使用 `event.$on` + `event.$emit`（$on 仅在 Vue 2 可用，缺点是多了会很乱，难以维护）
    2. 使用 Vuex 通信（Vue3 可以用 Pinia 代替 Vuex）

## Vuex 是什么？主要用来干什么的？

Vuex 是一个专为 Vue.js 应用程序开发的****状态管理模式****。它主要是为了解决在大型应用中的全局状态共享问题。

它包括以下几个 API：Store/State/Getter/Mutation/Action/Module

1. Store 是一个容器，包含所有以下内容
2. State 用来存储应用程序状态
3. Getter 用来读取派生状态，基于 state 的计算属性。
4. Mutation 用于同步提交状态变更，是 Vuex 中唯一允许修改 state 的方式。
5. Action 用于异步变更状态，但它提交的是 mutation，而不是直接变更状态。
6. modules 用于将 store 分割为多个子模块，每个子模块拥有自己的 state、mutations、actions、getters 等。更好的管理和组织大型应用。

**常见追问：Mutation 和 Action 为什么要分开？**

- 为了让代码更易于维护。（但 Pinia 就把 Mutation 和 Action 合并了，所以并不如此）
- mutations 用于同步操作，而 actions 用于异步操作。
- 此外，actions 可以包含任意的业务逻辑，而 mutations 应该保持功能单一性。

## VueRouter 用过吗？怎么理解？

1. 背下文档第一句：Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成
2. 它包括以下几个主要功能：`router-link` `router-view` 嵌套路由、History 模式、路由导航守卫、路由懒加载
3. Hash 模式和 History 模式的区别？
    1. Hash 模式使用 Hash 映射，一个用的 History API
    2. Hash 不需要后端 nginx 配合，History 需要
4. 导航守卫如何实现登录控制？
    
    ```jsx
    router.beforeEach((to, from, next) => {
      if (to.path === '/login') return next()
      if (to是受控页面 && 没有登录) return next('/login')
      next()
    })
    ```
    

## Vue 2 如何实现数据响应式

1. 在 Vue2 中，通常使用 `v-model` 或 `.sync` 来实现数据响应式。其中，`v-model` 实际上是 `v-bind:value` 和 `v-on:input` 的语法糖。
2. `v-bind:value` 通过使用 `Object.defineProperty` API 给 data 创建 getter 和 setter，实现了从 data ⇒ UI 的单向响应
3. `v-on:input` 通过模板编译器向 DOM 添加事件监听器，以便在 DOM 触发 input 事件时修改 data，从而实现了从 UI ⇒ data 的单向响应
4. 这两者结合起来就是数据响应式的实现方式

## Vue 3 为什么使用 Proxy 代替 Object.defineProperty

### 短答案

1. Proxy 可以处理动态创建的 data 属性，无需像 Vue 2 一样使用 `Vue.set` ****来赋值
2. 基于性能考虑，Vue 2 需要篡改数组的 7 个 API 实现数组响应，而 Vue 3 用 Proxy 不需要
3. `Object.defineProperty` 需要提前递归遍历 data 做到响应式，而 Proxy 可以在真正用到深层数据的时候再做响应式（惰性的）

### 长答案

Vue2 数据响应式

- 首先 Object.defineProperty 只支持对象读取，写入 代理：getter、setter。
- 通过数组的方法去更改数组或直接删除 data 数据，无法实现响应式，因为 Object.defineProperty 不支持。
- 因此 Vue2 中数组操作的 API 方法需要自己实现，例如 push、pop 等。
- 且由于无法监听到属性删除和新增，需要使用 Vue 实现的 API `Vue.detele`、`Vue.set` 完成。

Vue3 数据响应式，使用 Proxy 实现，支持以下功能拦截

- `get(target, propKey, receiver)`、`set(target, propKey, value, receiver)`。
- `has(target, propKey)`：拦截`propKey in proxy`。
- `deleteProperty(target, propKey)`：拦截 `delete proxy[propKey]` 的操作。
- `ownKeys(target)`：拦截 `Object.keys(proxy)`、`for...in` 循环、`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)` 等。
- `apply(target, object, args)`：拦截 Proxy 实例作为函数调用的操作，比如 `proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。

**所以，为什么 Vue3 使用 Proxy 代替 Object.defineProperty？**

- 功能更强大：Proxy 比 Object.defineProperty 提供了更多的功能和灵活性。Proxy 可以拦截并自定义对象上的各种操作，包括属性访问、赋值、删除等。这意味着 Vue 3 可以更好地跟踪对象的变化，并能够提供更多的响应式行为。
- 更好的性能：与 Object.defineProperty 相比，Proxy 通常具有更高的性能。Proxy 在底层实现上能够更高效地拦截对象操作，因此在大多数情况下，Vue 3 使用 Proxy 可以获得更好的性能表现。
- 更好的错误检测：Proxy 提供了更好的错误检测和调试能力。当使用 Object.defineProperty 时，如果出现错误，通常很难追踪和诊断问题。而使用 Proxy，可以更容易地捕获和处理错误，提供更好的开发者体验。
- 更好的浏览器支持：Object.defineProperty 在某些旧版本的浏览器中存在兼容性问题。Proxy 是 ES6 的一部分，并且在现代浏览器中得到广泛支持，这使得 Vue 3 可以更好地适应多种浏览器环境。

> 总结：Vue 3 选择使用 Proxy 替代 Object.defineProperty 是为了提供更好的功能、性能和开发者体验，并且更好地适应现代浏览器环境。
> 

## Vue 3 为什么使用 Composition API

答案参考尤雨溪的博客：[Vue Function-based API RFC - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/68477600)

使用 Composition API 主要用来替代 Vue 2 中的 mixins、高阶组件、extends 和 Renderless Components 等，它有以下优点：

1. 数据来源更清晰，不会出现模版中的数据来源不清晰的问题。
2. 不会出现命名空间冲突的情况（mixin 很容易命名冲突）。
3. 性能更好。
4. 此外，Composition API 更适合 TypeScript 类型检查。

## Vue 3 对比 Vue 2 做了哪些改动？

Vue 3 相对于 Vue 2，做了以下几个改动（记不住可以只记前5条）：

1. 使用 `Proxy` 代替 `Object.defineProperty` 实现响应式，提供更好的性能和更好的类型推断
2. `v-model:value` 代替 Vue2 的 `v-model` 和 `.sync`
3. 组件允许多个根元素
4. 新增 `Teleport` 组件
5. 使用 `createApp()` 代替 `new Vue()`
6. `destroyed` 生命周期被改为 `unmounted` 了（它的 before 同理）
7. ref 属性支持函数（VNode 节点中的 ref）
8. 改进了模板编译器和渲染器，现在支持静态提升和一些编译时优化，使渲染性能更好
9. 全局 API 发生了变化，如 **`Vue.config`** 改为 **`app.config`**、**`Vue.directive`** 改为 **`app.directive`** 等
10. 更好的 TypeScript 支持，包括更好的类型推断和更准确的类型定义。

## Vue2 & Vue3 中 `v-if` 与 `v-for` 的优先级

- **在 Vue2 中：** 当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。请查阅[列表渲染指南](https://v2.cn.vuejs.org/v2/guide/list.html#v-for-object)以获取详细信息。
- **在 Vue3 中：** 当 `v-if` 和 `v-for` 同时存在于一个元素上的时候，`v-if` 会首先被执行。请查看[列表渲染指南](https://cn.vuejs.org/guide/essentials/list.html#v-for-with-v-if)获取更多细节。