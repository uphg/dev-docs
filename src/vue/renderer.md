# 渲染器

我们通常使用英文 renderer 来表达“渲染器”。千万不要把 renderer 和 render 弄混了，前者代表渲染器，而后者是动词，表示“渲染”。渲染器的作用是把虚拟 DOM 渲染为特定平台上的真实元素。在浏览器平台上，渲染器会把虚拟 DOM 渲染为真实 DOM 元素。

渲染器不仅包含 render 函数，还包含 hydrate 函数。实际上，在 Vue.js 3 中，甚至连创建应用的 createApp 函数也是渲染器的一部分。

## 渲染器与响应系统的结合

假如我们要实现一个如下代码的渲染器

```js
import { effect, ref } from '@vue/reactivity'

function renderer(domString, container) {
  container.innerHTML = domString
}

const count = ref(1)

effect(() => {
  renderer(`<h1>${count.value}</h1>`, document.getElementById('app'))
})

count.value++
```

可以这样实现，并且根据 vnode 是否存在，判断是渲染还是更新节点

```js
function createRenderer() {
  function render(vnode, container) {
    if (vnode) {
      // 新 vnode 存在，将其与旧 vnode 一起传递给 patch 函数，进行打补丁
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        // 旧 vnode 存在，且新 vnode 不存在，说明是卸载（unmount）操作
        container.innerHTML = ''
      }
    }
    // 把 vnode 存储到 container._vnode 下，即后续渲染中的旧 vnode
    container._vnode = vnode
  }

  return {
    render
  }
}
```

在更新 VNode 时，渲染器会使用 newVNode 与上一次渲染的 oldVNode 进行比较，试图找到并更新变更点。这个过程叫作“打补丁”（或更新），英文通常用 **patch** 来表达，如下：

```js
function patch(oldNode, newNode, container) {
  // 如果 oldNode 不存在，意味着挂载，则调用 mountElement 函数完成挂载
  if (!oldNode) {
    mountElement(newNode, container)
  } else {
    // oldNode 存在，意味着打补丁，暂时省略
  }
}

function mountElement(vnode, container) {
  const el = createElement(vnode.type)
  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  }
  insert(el, container)
}
```

为了设计一个不依赖于浏览器平台的通用渲染器，我们需要将这些浏览器特有的 API 抽离。可以将这些操作 DOM 的 API 作为配置项，该配置项可以作为 createRenderer 函数的参数，如下：

```js
// 在创建 renderer 时传入配置项
const renderer = createRenderer({
  // 用于创建元素
  createElement(tag) {
    return document.createElement(tag)
  },
  // 用于设置元素的文本节点
  setElementText(el, text) {
    el.textContent = text
  },
  // 用于在给定的 parent 下添加指定元素
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor)
  }
})
```

这样，在 createRenderer 函数内的 mountElement 等函数内就可以通过配置项来取得操作 DOM 的 API 了

```js
function createRenderer(options) {

  // 通过 options 得到操作 DOM 的 API
  const {
    createElement,
    insert,
    setElementText
  } = options

  // 在这个作用域内定义的函数都可以访问那些 API
  function mountElement(vnode, container) {
    // ...
  }

  function patch(oldNode, newNode, container) {
    // ...
  }

  function render(vnode, container) {
    // ...
  }

  return {
    render
  }
}
```

在卸载组件时，Vue 会调用 DOM API 卸载真实 DOM，如下

```js
function unmount(vnode) {
  const parent = vnode.el.parentNode
  if (parent) {
    parent.removeChild(vnode.el)
  }
}
```

## 事件绑定优化

在 DOM 中，每次绑定事件需要调用 addEventListener，更新事件理论上需要先 removeEventListener 之前的事件绑定，再次 addEventListener。

Vue 使用了性能更优的方式绑定事件，即绑定一个伪造的事件处理函数 invoker，然后把真正的事件处理函数设置为 invoker.value 属性的值。这样当更新事件的时候，我们将不再需要调用 removeEventListener 函数来移除上一次绑定的事件，只需要更新 invoker.value 的值即可，如下面的代码所示。

```js
patchProps(el, key, prevValue, nextValue) {
  if (/^on/.test(key)) {
    const invokers = el._vei || (el._vei = {})
    let invoker = invokers[key]
    const name = key.slice(2).toLowerCase()
    if (nextValue) {
      if (!invoker) {
        invoker = el._vei[key] = (e) => {
          // 如果 invoker.value 是数组，则遍历它并逐个调用事件处理函数
          if (Array.isArray(invoker.value)) {
            invoker.value.forEach(fn => fn(e))
          } else {
            // 否则直接作为函数调用
            invoker.value(e)
          }
        }
        invoker.value = nextValue
        el.addEventListener(name, invoker)
      } else {
        invoker.value = nextValue
      }
    } else if (invoker) {
      el.removeEventListener(name, invoker)
    }
  } else if (key === 'class') {
    // 省略部分代码
  } else if (shouldSetAsProps(el, key, nextValue)) {
    // 省略部分代码
  } else {
    // 省略部分代码
  }
}
```

> **`performance.now()`** 方法返回一个精确到毫秒的 [`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)。

## 更新子节点

子节点的类型分为以下三种：

1. 没有子节点，此时 vnode.children 的值为 null。
2. 具有文本子节点，此时 vnode.children 的值为字符串，代表文本的内容。
3. 其他情况，无论是单个元素子节点，还是多个子节点（可能是文本和元素的混合），都可以用数组来表示。

所以具体的更新子节点流程为：

```js
function patchElement(oldNode, newNode) {
  // ...

  patchChildren(oldNode, newNode, el)
}

function patchChildren(oldNode, newNode, container) {
  if (typeof newNode.children === 'string') {
    if (Array.isArray(oldNode.children)) {
      oldNode.children.forEach((c) => unmount(c))
    }
    setElementText(container, newNode.children)
  } else if (Array.isArray(newNode.children)) {
    if (Array.isArray(oldNode.children)) {
      //
    } else {
      setElementText(container, '')
      newNode.children.forEach(c => patch(null, c, container))
    }
  } else {
    if (Array.isArray(oldNode.children)) {
      oldNode.children.forEach(c => unmount(c))
    } else if (typeof oldNode.children === 'string') {
      setElementText(container, '')
    }
  }
}
```

## 文本节点和注释节点

之前的代码中 vnode.type 都是普通标签节点，但在虚拟 DOM 中还有文本节点和注释节点，我们可以用如下方式描述

```js
// 标签节点
const vnode = {
  type: 'div'
}

// 文本节点的 type 标识
const Text = Symbol()
const newVNode = {
  type: Text,
  children: '我是文本内容'
}

// 注释节点的 type 标识
const Comment = Symbol()
const newVNode = {
  type: Comment,
  children: '我是注释内容'
}
```

patch 代码实现如下

```js
function createRenderer(options) {
  const { createText, setText } = options
  // ....

  function patch(oldNode, newNode, container) {
    if (oldNode && oldNode.type !== newNode.type) {
      unmount(oldNode)
      oldNode = null
    }

    const { type } = newNode

    if (typeof type === 'string') {
      if (!oldNode) {
        mountElement(newNode, container)
      } else {
        patchElement(oldNode, newNode)
      }
    } else if (type === Text) {
      if (!oldNode) {
        const el = newNode.el = createText(newNode.children)
        insert(el, container)
      } else {
        const el = newNode.el = oldNode.el
        if (newNode.children !== oldNode.children) {
          setText(el, newNode.children)
        }
      }
    }
  }

  // ...
}

// 调用时
const renderer = createRenderer({
  // ...
  // 封装文本节点操作代码
  createText(text) {
    return document.createTextNode(text)
  },
  setText(el, text) {
    el.nodeValue = text
  }
  // ...
})
```

## Fragment

如何用 vnode 描述 Fragment

假如有如下组件

```vue
<List>
  <Items />
</List>
```

```vue
<!-- List.vue -->
<template>
  <ul>
    <slot />
  </ul>
</template>
```

```vue
<!-- Items.vue -->
<template>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</template>
```

Vue3 使用如下对象描述 Items

```js
const Fragment = Symbol()
const vnode = {
  type: Fragment,
  children: [
    { type: 'li', children: 'text 1' },
    { type: 'li', children: 'text 2' },
    { type: 'li', children: 'text 3' }
  ]
}
```

对于 Fragment 类型的 vnode 的来说，它的 children 存储的内容就是模板中所有根节点

patch 实现如下

```js
function patch(oldNode, newNode, container) {
  if (oldNode && oldNode.type !== newNode.type) {
    unmount(oldNode)
    oldNode = null
  }

  const { type } = newNode

  if (typeof type === 'string') {
    // ...
  } else if (type === Text) {
    // ...
  } else if (type === Fragment) {
    if (!oldNode) {
      newNode.children.forEach(c => patch(null, c, container))
    } else {
      patchChildren(oldNode, newNode, container)
    }
  }
}
```

unmount 函数也需要支持 Fragment 类型的虚拟节点的卸载

```js
function unmount(vnode) {
  if (vnode.type === Fragment) {
    vnode.children.forEach(c => unmount(c))
    return
  }
  const parent = vnode.el.parentNode
  if (parent) {
    parent.removeChild(vnode.el)
  }
}
```
