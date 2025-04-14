# 在项目中使用

如何在 JavaScript 项目中添加类型，以及 TSX & React 组件、事件类型声明

## 在 JavaScript 文件中声明类型

默认情况下，*.d.ts 中的 type 全局生效，interface 也一样

```tsx
// type.d.ts
type User = {
  name: string
  age: string
}

// main.ts
type A = User
```

但如果 *.d.ts 里有 import 或 export，则 User 只在当前模块生效

```tsx
// type.d.ts
type User = {
  name: string
  age: string
}

export {}

// main.ts
type A = User // Cannot find name 'User'.ts
```

此时你可以把类型写在 declare global 代码块中，它就可以全局生效了

```tsx
// type.d.ts
declare global {
  type User = {
    name: string
    age: string
  }
}

// main.ts
type A = User
```

拓展指定库的导出类型

```tsx
// 拓展 axios 的 AxiosRequestConfig 类型（不能拓展 type 声明的类型）
declare module 'axios' {
  export interface AxiosRequestConfig {
    _autoLoading?: boolean
    _mock?: string
  }
}
```

在 TypeScript 中使用 JavaScript

可以使用 TypeScript *.d.ts 的同名类型文件添加 JS 对应类型声明

```tsx
// jack.js
const jack = { name: 'jack', age: 18 }
const sayHi = (name) => console.log('hi')

export default jack
export { sayHi }

// jack.d.ts
const jack: { name: string, age: number }
const sayHi: (name: string) => void

export default jack
export { sayHi }
```

## reference 标签

它的属性：lib 表示从库（内置的 TS 库）中引入，path 表示从当前相对路径引入

```tsx
/// <reference lib="es2020" />

/// <reference path="fs.d.ts" />
```

## TSX 生态

- Webpack
  - create-react-app
  - Vue Cli
- Vite
  - template + plugin
  - create-vue
- Next.js / Remix.js / Fresh.js
- …

## TSX 标签与 TS 断言冲突

TS 断言可以使用 `<xxx>a` ，但此语法与 TSX 的标签冲突，所以在 TSX 中只能用 as 断言

## React 中声明事件类型

通过查看 input 标签中 onClick 属性的类型来声明对应事件类型

```tsx
const App = () => {
  // onClick 的 target 是写死的，无法通过传入泛型参数修改，只能断言
  const onClick: MouseEventHandler<HTMLInputElement> = (e) => {
    console.log((e.target as HTMLInputElement).value)
  }

  // onChange 的 target 就是泛型传入的类型
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value)
  }

  return <input onClick={onClick} onChange={onChange}/>
}
```

注：React 中的 onChange 类似 onInput，会在输入值每次变化都触发，但在 DOM 中，Input 的onChang 只会在失去焦点时触发（变更值）

## JSX/TSX 的本质

在我们写 React TSX 时，React 帮我们做了以下处理

```tsx
const Header = <h1 name="jack">hi</h1>
Header.tag // Header.tag: string

// 注：JSX 中的 interface 都必须是固定的名称
declare global {
  namespace JSX {
    // Header 元素的类型
    interface Element {
      tag: string
    }

    // 声明 h1 和它的属性
    interface IntrinsicElements {
      h1: {
        name?: string
      }
    }
  }
}
```

## React 组件

使用**函数组件**时，它在 TSX 中可以传入的属性由函数的第一个参数定义（React 与 TS 约定俗成）

```tsx
const Header = (props: { level: number}, context: unknown) => <h1 name="jack"></h1>

const App = <Header level={1}/>
```

使用类组件时，需要定义一个 props 属性

```tsx
class Header {
  props: {
    level: number
  },
  constructor(props: { level: number }) {
    this.props = props
  }
  render() {
    return <h1>{this.props.level}</h1>
  }
}

const App = <Header level={2}/>
```

## React 限制 props.children 类型

children 的类型只能限制容易区分的类型，无法判断复杂类型，参考：[react.js - react 指定props.children为某个组件 - SegmentFault 思否](https://segmentfault.com/q/1010000040343011)

```tsx
type AProps = {
  children?: ReturnType<typeof B>
}
const A: React.FC<AProps> = (props) => {
  return <div>{props.children}</div>
}

type BProps = {}
const B: React.FC<BProps> = (props) => <div>B组件</div>

const Demo = () => (
  <A>
    <B />
  </A>
)
```

## 泛型组件

函数可以只指定泛型不调用，这可以叫类型收窄

```tsx
function fn<T>(p: T) {
  return null
}

const fn2 = (fn)<string>
// const fn2: (p: string) => null
```

React 利用类似的原理实现了泛型组件

```tsx
interface Props<T>{
  content: T
  onClick?: (arg: T) => void
}

function Show<T>(props: Props<T>){
  const { content, onClick } = props
  return (
    <div>
      <>
        {content}
        <button onClick={()=> onClick?.(content)}>
          Click me
        </button>
      </>
    </div>
  )
}

// 使用
const App2 = () => (
  <Show<string>
    content='hi'
    onClick={(p) => console.log(p)}
  ></Show>
)
```

具体见：[React 泛型组件是什么？ (qq.com)](https://mp.weixin.qq.com/s/LAXPCJr7Z-X1S7RVMLBwyg)