# 数据类型

## any & unknown & never

1. any：任意类型（所有类型的集合）
2. unknown：未知类型，需要在使用时类型收窄（手动断言）
3. never：空类型，表示没有类型（通常用于代码推断）

**any VS unknown**

二者都是顶级类型（top type），任何类型的值都可以赋值给顶级类型

```tsx
let foo: any = 1
let bar: unknown = 1
```

但 unknown 比 any 类型检查更严格，any 什么检查都不做，unknown 类型在使用时要先收窄类型

```tsx
const value: unknown = 'hi'
const str: string = value
// 报错：Type 'unknown' is not assignable to type 'string'.
```

类型收窄后不报错

```tsx
const value: unknown = 'hi'
const str: string = value as string // 不报错
```

如果改成 any，基本在哪都不报错，所以在大多数情况下，尽量优先使用 unknown

## enum 什么时候使用

分配权限（二进制）或者枚举数字类型时，例如：

![MjAyMi04LTIxLTIyLTE2LTUxLTMzNQ==.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/edde50ec-618c-44ea-b198-81c0deeb0998/MjAyMi04LTIxLTIyLTE2LTUxLTMzNQ.jpg)

> 注：二进制在 JS 中最大为 64 位（实际使用时整数最大为 `2 ^ 53 -1` ）

使用 type 声明函数

```tsx
type Fn {
  (a: number, b:number): number
  prop: string
}
```

使用 type & interface 拓展数组

```tsx
interface A {
  age: number
}

type B1 = Array<string> & {
  name: string
}

interface B2 extends Array<string>, A {
  name: string
}
```

## type & interface 的区别

1. 范围不同：interface 只描述对象，type 则描述所有类型数据
2. 命名方式：type 只是创建类型别名，interface 则是创建新的类型（实际存在类型）
3. 组合方式：interface 可以使用 extends 实现继承，type 需要使用 & 来实现联合类型
4. 扩展方式：interface 可以重复声明类型来拓展类型（类型合并），type 一个类型只能声明一次

   使用 interface 拓展 axios

   ```tsx
   declare module 'axios' {
     export interface AxiosRequestConfig {
       _autoLoading?: boolean
       _mock?: string
     }
   }
   ```

   使用 interface 拓展全局 String 对象

   ```tsx
   declare global {
     interface String {
   	  padZero(length: number): string
     }
   }
   ```

   总结：对外 API 尽量用 interface 方便拓展，对内用 API 尽量用 type，防止代码分散

## 函数中的 void

当声明一个函数类型并返回 void 时，并不会影响实际函数返回值

```tsx
type Fn = () => void
const fn: Fn = () => {
	return 'hi'
}

const a = f() // const a: void
console.log((a as any).toString())
```

但是在函数本体中声明返回值为 void，TS 会报错提示