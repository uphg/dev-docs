# Vue2 API

## 全局 API

### Vue.extend(options)

- 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
- `data` 选项是特例，需要注意 - 在 `Vue.extend()` 中它必须是函数

  ```vue
  <div id="mount-point"></div>
  ```

  ```js
  // 创建构造器
  var Profile = Vue.extend({
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function () {
      return {
        firstName: 'Walter',
        lastName: 'White',
        alias: 'Heisenberg'
      }
    }
  })
  // 创建 Profile 实例，并挂载到一个元素上。
  new Profile().$mount('#mount-point')
  ```

### Vue.nextTick([callback, context])

- 全局调用，会返回一个 Promise

  ```js
  // 修改数据
  vm.msg = 'Hello'
  Vue.nextTick(function () {
    // DOM 更新了
  })

  // 作为一个 Promise 使用
  Vue.nextTick()
    .then(function () {
      // DOM 更新了
    })
  ```

### Vue.set(target, propertyName/index, value)

- 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
- 这个方法主要是解决 Vue 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`)。

### Vue.delete(target, propertyName/index)

- 删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。
- 这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。

### Vue.directive(id, \[definition\])

- 注册或获取全局指令。

  ```js
  // 注册
  Vue.directive('my-directive', {
    bind() {},
    inserted() {},
    update() {},
    componentUpdated() {},
    unbind() {}
  })

  // 注册 (指令函数)
  Vue.directive('my-directive', function () {
    // 这里将会被 `bind` 和 `update` 调用
  })

  // 获取，返回已注册的指令
  var myDirective = Vue.directive('my-directive')
  ```

### Vue.mixin(mixin)

- 全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。
- 插件作者可以使用混入，向组件注入自定义的行为。**不推荐在应用代码中使用**。

### vm.$mount(\[elementOrSelector\])

- 使用 `vm.$mount()` 手动地挂载一个未挂载的实例。

  ```js
  var MyComponent = Vue.extend({
    template: '<div>Hello!</div>'
  })

  // 方法一：创建并挂载到 #app (会替换 #app)
  new MyComponent().$mount('#app')

  // 方法二：同上
  new MyComponent({ el: '#app' })

  // 方法三：在文档之外渲染并且随后挂载
  var component = new MyComponent().$mount()
  document.getElementById('app').appendChild(component.$el)
  ```


## 生命周期

参考：[生命周期图示](https://v2.cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

### beforeCreate

- 在实例初始化之后,进行数据侦听和事件/侦听器的配置（watch）之前同步调用。
- 会在实例初始化完成、`props` 解析之后、`data()` 和 `computed` 等选项处理之前立即调用。

### created

- 在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 `$el` property 目前尚不可用。

### beforeMount

在挂载开始之前被调用：相关的 `render` 函数首次被调用。

**该钩子在服务器端渲染期间不被调用。**

### mounted

实例被挂载后调用，这时 `el` 被新创建的 `vm.$el` 替换了。如果根实例挂载到了一个文档内的元素上，当 `mounted` 被调用时 `vm.$el` 也在文档内。

注意 `mounted` **不会**保证所有的子组件也都被挂载完成。如果你希望等到整个视图都渲染完毕再执行某些操作，可以在 `mounted` 内部使用 [vm.$nextTick](https://v2.cn.vuejs.org/v2/api/#vm-nextTick)：

```
mounted: function () {
  this.$nextTick(function () {
    // 仅在整个视图都被渲染之后才会运行的代码
  })
}
```

**该钩子在服务器端渲染期间不被调用。**

### beforeUpdate

在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。

**该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行。**

### updated

在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。

当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用[计算属性](https://v2.cn.vuejs.org/v2/api/#computed)或 [watcher](https://v2.cn.vuejs.org/v2/api/#watch) 取而代之。

注意，`updated` **不会**保证所有的子组件也都被重新渲染完毕。如果你希望等到整个视图都渲染完毕，可以在 `updated` 里使用 [vm.$nextTick](https://v2.cn.vuejs.org/v2/api/#vm-nextTick)：

```
updated: function () {
  this.$nextTick(function () {
    //  仅在整个视图都被重新渲染之后才会运行的代码     
  })
}
```

**该钩子在服务器端渲染期间不被调用。**


### activated

被 keep-alive 缓存的组件激活时调用。

**该钩子在服务器端渲染期间不被调用。**

### deactivated

被 keep-alive 缓存的组件失活时调用。

**该钩子在服务器端渲染期间不被调用。**

### beforeDestroy

实例销毁之前调用。在这一步，实例仍然完全可用。

**该钩子在服务器端渲染期间不被调用。**

### destroyed

实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

**该钩子在服务器端渲染期间不被调用。**

### errorCaptured

在捕获一个来自后代组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 `false` 以阻止该错误继续向上传播。

::: tip

你可以在此钩子中修改组件的状态。因此在捕获错误时，在模板或渲染函数中有一个条件判断来绕过其它内容就很重要；不然该组件可能会进入一个无限的渲染循环。

:::


**错误传播规则**

- 默认情况下，如果全局的 `config.errorHandler` 被定义，所有的错误仍会发送它，因此这些错误仍然会向单一的分析服务的地方进行汇报。
- 如果一个组件的 inheritance chain (继承链)或 parent chain (父链)中存在多个 `errorCaptured` 钩子，则它们将会被相同的错误逐个唤起。
- 如果此 `errorCaptured` 钩子自身抛出了一个错误，则这个新错误和原本被捕获的错误都会发送给全局的 `config.errorHandler`。
- 一个 `errorCaptured` 钩子能够返回 `false` 以阻止错误继续向上传播。本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的 `errorCaptured` 钩子和全局的 `config.errorHandler`。

## 实例属性

### vm.$el

组件实例使用的根 DOM 元素。

### vm.$options

当前 Vue 实例的初始化选项

```js
new Vue({
  customOption: 'foo',
  created() {
    console.log(this.$options.customOption) // => 'foo'
  }
})
```

### vm.$parent

父实例，如果当前实例有的话。

### vm.$root

当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。

### vm.$children

当前实例的直接子组件。**需要注意 `$children` 并不保证顺序，也不是响应式的。**

### vm.$slots

访问被插槽分发的内容。具名插槽会有对应的 property (例如：`v-slot:foo`对应 `vm.$slots.foo`)。default 表示默认插槽内容。

**请注意插槽不是响应性的**

### vm.$refs

一个对象，持有注册过 `ref` attribute 的所有 DOM 元素和组件实例。

### vm.$attrs

包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (`class` 和 `style` 除外)。可以通过 `v-bind="$attrs"` 传入内部组件。

### vm.$listeners

包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。可以通过 `v-on="$listeners"` 传入内部组件。

## 实例方法

### vm.$nextTick

可以在当前组件实例调用。

```js
new Vue({
  // ...
  methods: {
    // ...
    example() {
      this.message = 'changed'
      this.$nextTick(function () {
        // `this` 绑定到当前实例
        this.doSomethingElse()
      })
    }
  }
})
```

### vm.$set

语法

```js
vm.$set(target, propertyName/index, value)
```

### vm.$delete

语法

```js
vm.$delete(target, propertyName/index)
```

## Vuex

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。

### State

存储应用程序状态的对象。Vuex 鼓励将 state 视为只读对象，不应直接修改 state 中的属性。应该使用 mutations 或 actions 来修改状态。

### Getter

可以认为是 state 的计算属性。getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

### Mutation

用于修改 state 状态的同步操作。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state, value) {
      state.count += value;
    },
    decrement(state, payload) {
      state.count -= payload;
    }
  }
})
```

### Action

用于处理异步操作和触发 Mutation 的函数。

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

```js

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})
```

### Modules

将应用程序的状态划分为多个独立的模块，每个模块负责管理自己的状态和行为，从而使得代码更加模块化和可维护。

使用 namespaced（命名空间）将每个模块分割

```js
const modules = {
  account: {
    namespaced: true,
    state: () => ({
      name: 'Jack'
    }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
    getters: {
      isAdmin () { ... } // -> getters['account/isAdmin']
    },
    actions: {
      login () { ... } // -> dispatch('account/login')
    },
    mutations: {
      login () { ... } // -> commit('account/login')
    },
  },
  tags: {
    namespaced: true,
    ...
  },
  settings: {
    namespaced: true,
    ...
  }
}

const store = new Vuex.Store({
  modules,
})

store.state.account.name // -> account 的状态
```

## Vue Router

Vue Router 是 Vue.js 官方的路由管理器。

它的主要功能有：

- 动态路由匹配。
- HTML5 History 模式或 hash 模式。
- 导航守卫。
- 路由懒加载。

### 动态路由匹配

```js
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

### 编程式的导航

- 声明式：`<router-link :to="...">`
- 编程式：`router.push(...)`

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

### 重定向

重定向也是通过 `routes` 配置来完成，下面例子是从 `/a` 重定向到 `/b`：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

### 别名

`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样。

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

### 路由组件传参

使用 props 给当前路由组件传参

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

### HTML5 History 模式

Vue Router 默认使用 hash 模式模拟完整的 URL，所以当 URL 改变时页面不会重新加载。

如果觉得这样的路由很丑，可以使用 history 模式。该模式 利用 [`history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) API 来完成 URL 跳转而无须重新加载页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

