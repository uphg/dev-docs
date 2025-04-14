# Vue.js 设计思路

<!-- Mimic vue -->

## 声明式描述 UI

Vue3 使用以下方式描述 UI

- 使用与 HTML 标签一致的方式来描述 DOM 元素和 DOM 属性，例如 `<div id="app"></div>`。
- 使用 `:` 或者 `v-bind` 描述动态绑定属性，例如 `<div :id="dynamicId"></div>`
- 使用 `@` 或 `v-on` 描述事件绑定，例如点击事件 `<div @click="handler"></div>`

除了使用以上的方式，还可以使用 JavaScript 对象描述：

```js
const title = {
  tag: 'h1',
  props: {
    onClick: handler
  },
  children: [
    { tag: 'span' }
  ]
}
```

对应的 Vue.js 模板方式

```html
<h1 @click="handler"><span></span></h1>
```

封装一个根据 level 区分标题等级的组件

```js
// 使用模板
<h1 v-if="level === 1"></h1>
<h2 v-else-if="level === 2"></h2>
<h3 v-else-if="level === 3"></h3>
<h4 v-else-if="level === 4"></h4>
<h5 v-else-if="level === 5"></h5>
<h6 v-else-if="level === 6"></h6>

// 使用 JavaScript 对象
let level = 3
const title = {
  tag: `h${level}`
}
```

可以看出 **JavaScript 对象相对模板更加灵活**，实际应用中，Vue 中会用 h 函数返回对象，如下

```js
import { h } from 'vue'

export default {
  render() {
    return h('h1', { onClick: handler }) // 虚拟 DOM
  }
}
```

## 渲染器

一个简单的渲染器

```js
function renderer(vnode, container) {
  const el = document.createElement(vnode.tag)
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      el.addEventListener(
        key.substr(2).toLowerCase(), // 事件名称 onClick ---> click
        vnode.props[key]
      )
    }
  }

  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => renderer(child, el))
  }

  container.appendChild(el)
}

// 使用
const vnode = {
  tag: 'div',
  props: {
    onClick: () => alert('hello')
  },
  children: 'click me'
}
renderer(vnode, document.body) // body 作为挂载点
```

让渲染器支持函数组件/对象组件

```js
function renderer(vnode, container) {
  if (typeof vnode.tag === 'string') {
    mountElement(vnode, container)
  } else if (typeof vnode.tag === 'function') {
    const component = vnode.tag()
    renderer(component, container)
  } else  if (typeof vnode.tag === 'object') { // 如果是对象，说明 vnode 描述的是组件
    const subtree = vnode.tag.render()
    renderer(subtree, container)
  }
}

function mountElement(vnode, container) {
  const el = document.createElement(vnode.tag)
  for (const key in vnode.props) {
    // 处理事件
    if (/^on/.test(key)) {
      el.addEventListener(
        key.substr(2).toLowerCase(), // 事件名称 onClick ---> click
        vnode.props[key]
      )
    }
  }
  // 处理 children
  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => renderer(child, el))
  }
  container.appendChild(el)
}
```

使用

```js
// 函数形式
const MyComponent1 = function () {
  return {
    tag: 'div',
    props: {
      onClick: () => alert('Function Component hello')
    },
    children: 'Click Function Component'
  }
}

// 对象形式
const MyComponent2 = {
  render() {
    return {
      tag: 'div',
      props: {
        onClick: () => alert('Object Component hello')
      },
      children: 'Click Object Component'
    }
  }
}

const vnode1 = {
  tag: MyComponent1
}

const vnode2 = {
  tag: MyComponent2
}

renderer(vnode1, document.body)
renderer(vnode2, document.body)
```

## 模板编译器

将 template 模板转为 render 函数，这就是**编译器**的功能

```js
// 模板语法
<div @click="handler">
  click me
</div>

// 转为渲染函数
render() {
  return h('div', { onClick: handler }, 'click me')
}
```

Vue 中的模板编译器会对模板经行优化，假如有以下模板

```js
<div :class="className">hi</div>
```

编译器可以根据 Vue 的动态绑定语法 `v-bind` 识别哪些是静态属性，哪些是动态属性，在生成代码时做标记。

```js
render() {
  return {
    tag: 'div',
    props: {
      id: 'foo',
      class: cls
    },
    patchFlags: 1 // 假设数字 1 代表 class 是动态的
  }
}
```

这样渲染器就知道了，原来只有 class 是动态的，省去了寻找变更（diff）的过程，提升了渲染性能。
