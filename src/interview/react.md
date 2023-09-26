# React 押题

## 虚拟 DOM 的原理是什么？

### 是什么

虚拟 DOM 就是虚拟节点（这句翻译很重要），React 用 JS 对象来模拟 DOM 节点，然后将其渲染成真实的 DOM 节点

### 怎么做

第一步是模拟，用 JSX 语法写出来的 div 其实是一个虚拟节点

```jsx
<div id="app">
  <span className="red">hi</span>
</div>
```

上面的代码会得到一个这样的对象

```jsx
{
  tag: 'div',
  props: {
    id: 'app'
  },
  children: [
    {
      tag: 'span',
      props: {
        className: 'red'
      },
      children: [
        'hi'
      ]
    }
  ]
}
```

上面的对象是通过 JSX 转为 `React.createElement` 函数生成，如下：

```jsx
React.createElement('div', { id: 'app' }, 
  React.createElement('span', { class: 'red' }, 'hi')
) 
```

第二步是将虚拟节点渲染为真实节点

```jsx
function render(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }

  const { tag, props, children } = vdom
  
  const el = document.createElement(tag)
  setProps(el, props)

  children.map(render).forEach(el.appendChild.bind(el))

  // 在虚拟 DOM 中缓存真实 DOM 节点
  vdom.dom = el

  return el
}
```

注意，如果节点发生变化，并不会至今把新虚拟节点渲染到真实节点，而是先经过 diff 算法得到一个 patch（补丁）再更新到真实节点上（实际上就是对比两个 vdom 树的不同点，只更新不同点）

> 在 React 中，如果组件状态发生，不会立即更新真实 DOM，而是先经过 diff 算法得到差异（patch），然后再将差异更新到真实 DOM 上，这样就可以减少不必要的 DOM 操作（实际上就是对比两个 vdom 树的不同点，只更新不同点）
> 

### 解决了什么问题

1. DOM 操作性能问题。通过虚拟 DOM 和 diff 算法减少不必要的 DOM 操作，保证性能不会太差
2. DOM 操作不方便的问题，以前要调用各种 DOM API，现在只需要 setState

### 优点

1. 为 React 带来了跨平台能力。虚拟节点除了可以渲染为真实节点，还可以渲染为其他平台的组件，例如 React Native（安卓端）
2. 让 DOM 操作的整体性能更好，能（通过 diff）减少不必要的 DOM 操作。

### 缺点

1. 性能要求极高的地方，还是需要用真实 DOM 操作（极少情况）
2. React 为虚拟 DOM 创造了合成事件，跟原生 DOM 事件不太一样，工作中需要额外注意
    1. 所有 React 事件都绑定到根元素，自动实现事件委托
    2. 如果混用合成事件和原生 DOM 事件，有可能会出现 bug（如阻止事件冒泡失效）
3. 虚拟 DOM 会占用更多的内存，因为需要额外存储虚拟节点的信息以及对应的真实节点

### 如何解决缺点

- 不用 React，用 Vue 3

## React 或 Vue 的 DOM diff 算法是怎样的？

### 是什么

DOM diff 就说对比两颗虚拟 DOM 树的算法（虽废但重）。当组件变化时，会 render 出一个新的虚拟 DOM，diff 算法对比新旧虚拟 DOM 之后，得到一个差异（patch），然后再将差异更新到真实 DOM 上

### 怎么做

1. 首先对比两棵树的根节点，如果根节点类型变了，比如 div 变为 p，那么直接认为整颗 DOM 树都变了，不再对比子节点。此时至今删除对应的真实 DOM 树，创建新的真实 DOM 树
2. 如果根节点类型没变，就看属性变了没
    1. 如果没变，就保留对应的真实节点
    2. 如果变了，就只更新该节点的该属性（不会重新创建节点）
    3. 更新 style 样式时，只会更新改变的属性
3. 同时遍历两颗树的子节点，对比过程同上
4. 但在 React 对比过程存在顺序问题，如下
    1. 情况一：
        
        ```jsx
        // 旧节点
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
        
        // 新节点
        <ul>
          <li>A</li>
          <li>B</li>
          <li>C</li>
        </ul>
        ```
        
        React 依次对比 A-A、B-B、空-C，发现 C 是新增的，最终会创建真实 C 节点插入 页面
        
    2. 情况二：
        
        ```jsx
        // 旧节点
        <ul>
          <li>B</li>
          <li>C</li>
        </ul>
        
        // 新节点
        <ul>
          <li>A</li>
          <li>B</li>
          <li>C</li>
        </ul>
        ```
        
        React 对比 B-A，会删除 B 文本新建 A 文本；对比 C-B，会删除 C 文本，新建 B 文本；（注意，并不是边对比边删除新建，而是把操作汇总到 patch 里再进行 DOM 操作。）对比空-C，会新建 C 文本。
        
    3. 你会发现其实只需要创建 A 文本，保留 B 和 C 即可，为什么 React 做不到呢？
        
        因为 React 需要你加 key 才能做到：
        
        ```jsx
        // 旧节点
        <ul>
          <li key="b">B</li>
          <li key="c">C</li>
        </ul>
        
        // 新节点
        <ul>
          <li key="a">A</li>
          <li key="b">B</li>
          <li key="c">C</li>
        </ul>
        ```
        
        React 先对比 key 发现 key 只新增了一个，于是保留 b 和 c，新建 a。
        

以上是 React 的 diff 算法（源码分析在下一节补充视频中，时长一小时，有能力者选 看）

但面试官想听的可能是 Vue 的「双端交叉对比」算法，如下：

[Diff算法 | Marvin](https://canyuegongzi.github.io/web/vue/3.html#updatechildren)

[图文并茂地来详细讲讲Vue Diff算法 - 掘金](https://juejin.cn/post/6971622260490797069)

### 双端交叉比较（Vue2）

- 头头对比: 对比两个数组的头部，如果找到，把新节点patch到旧节点，头指针后移
- 尾尾对比: 对比两个数组的尾部，如果找到，把新节点patch到旧节点，尾指针前移
- 旧尾新头对比: 交叉对比，旧尾新头，如果找到，把新节点patch到旧节点，旧尾指针前移，新头指针后移
- 旧头新尾对比: 交叉对比，旧头新尾，如果找到，把新节点patch到旧节点，新尾指针前移，旧头指针后移
- 利用key对比: 用新指针对应节点的key去旧数组寻找对应的节点,这里分三种情况,当没有对应的key，那么创建新的节点,如果有key并且是相同的节点，把新节点patch到旧节点,如果有key但是不是相同的节点，则创建新节点

## 补充：React DOM diff 和 Vue DOM diff 的区别？

React DOM diff 和 Vue DOM diff 的区别：

1. React 是从左向右遍历对比，Vue 是双端交叉对比。
2. React 需要维护3个变量（有点扯），Vue 则需要维护4个变量。
3. Vue 整体效率比 React 更高，举例说明：假设有 N 个子节点，我们只是把最后子节点移到第一个，那么：
    1. React 需要借助 Map 进行 key 搜索找到匹配项，然后复用节点。
    2. Vue 会发现节点只是移动，直接复用节点。


::: details 附：React DOM diff 代码查看流程：

1. 运行 `git clone https://github.com/facebook/react.git` 。
2. 运行 `cd react; git switch 17.0.2` 。
3. 用 VSCode 或者WebStorm 打开 react 目录。
4. 打开 `packages/react-reconciler/src/ReactChildFiber.old.js` 第 1274 行查看旧版代码，或者打开 `packages/react-reconciler/src/ReactChildFiber.new.js` 第 1267 行查看新代码（实际上是一样的）。
5. 忽略所有警告和报错，因为 React JS 代码中有不是 JS 的代码。
6. 折叠所有代码，开始一行一行查看，只看运行的代码，不看条件判断。
7. 根据 React 文档中给出的场景反复在大脑中运行代码。
    1. 场景0：单个节点，会运行到 reconcileSingleElement。接下来看多个节点的 情况。
    2. 场景1：没 key，标签名变了，最终会走到 createFiberFromElement（存疑）。
    3. 场景2：没 key，标签名没变，但是属性变了，最终走到 updateElement 里的 useFiber。
    4. 场景3：有 key，key 的顺序没变，最终走到 updateElement。
    5. 场景4：有 key，key 的顺序变了，updateSlot 返回 null，最终走到 mapRemainingChildren、updateFromMap 和 updateElement(matchedFiber)，整个过程较长，效率较低。
8. 代码查看要点：
    1. 声明不看（用到再看）
    2. if 先不看（但 if else 要看）
    3. 函数调用必看 。
9. 必备快捷键：折叠所有、展开、向前、向后、查看定义。

:::

## React 有哪些生命周期钩子函数？数据请求放在哪个钩子里？

React 的文档稍微有点乱，需要配合两个地方一起看才能记忆清楚：

[React.Component – React](https://reactjs.org/docs/react-component.html#the-component-lifecycle)

[React Lifecycle Methods diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

总得来说：

1. 挂载时调用 constructor，更新时不调用。
2. 更新时调用 shouldComponentUpdate 和 getSnapshotBeforeUpdate，挂载时不 调用。
3. should... 在 render 前调用，getSnapshot... 在 render 后调用。
4. 请求放在 componentDidMount 里，最好写博客，容易忘。

## React 如何实现组件间通信

1. 父子通信：props + 函数
2. 爷孙组件通信：嵌套两层父子通信，或者使用 Context.Provider 和 Context.Consumer
3. 任意组件通信：使用状态管理
    1. Redux
    2. Mobx
    3. Recoil
    

## 你如何理解 Redux？

1. 背下文档第一句话：Redux 是一个状态管理库/状态容器。
2. 把 Redux 的核心概念说一下：
    1. State
    2. Action = type + payload 荷载
    3. Reducer
    4. Dispatch 派发
    5. Middleware
3. 把 ReactRedux 的核心概念说一下：
    1. `connect()(Component)`
    2. mapStateToProps
    3. mapDispatchToProps
4. 说两个常见的中间件：redux-thunk、redux-promise

想深入理解可以看这里：

[来，跟我一起手写 Redux！（建议 2 倍速播放）_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1dm4y1R7RK/?from=search&seid=8579266903295629745&spm_id_from=333.337.0.0)

## 什么是高阶组件 HOC？

参数是组件，返回值也是组件函数。什么都能做，所以抽象问题具体回答。

举例说明即可：

1. React.forwardRef
2. ReactRedux 的 connect
3. ReactRouter 的 withRouter

参考：[「react进阶」一文吃透React高阶组件(HOC) - 掘金 (juejin.cn)](https://juejin.cn/post/6940422320427106335#heading-0)

## React Hooks 如何模拟组件生命周期？

1. 模拟 componentDidMount
2. 模拟 componentDidUpdate
3. 模拟 componentWillUnmount

代码如下：

```jsx
import { useEffect, useState, useRef } from 'react'

export default function App() {
  const [visible, setNextVisible] = useState(true)
  const onClick = () => {
    setNextVisible(!visible)
  }

  return (
    <div>
      <h1>Hello</h1>
      {visible ? <Jack /> : null}
      <div>
        <button onClick={onClick}>toggle</button>
      </div>
    </div>
  )
}

function Jack(props) {
  const [n, setNextN] = useState(0)
  const first = useRef(true)

  useEffect(() => {
    if (first.current === ture) return true
    console.log('did update')
  })

  useEffect(() => {
    console.log('did mount')
    first.current = false
    return () => {
      console.log('did unmount')
    }
  }, [])

  const onClick = () => {
    setNextN(n+1)
  }

  return (
    <div>
      <button onClick={onClick}>+1</button>
    </div>
  )
}
```