# 类型基础

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

## 联合类型

联合类型表示 a | b 类型只能收窄为 a 或 b 其中一种

## typeof 和 instanceof 收窄类型

联合类型中的大部分 JS 类型可以使用 typeof 和 instanceof 来区分

```tsx
const fn1 = (a: number | string) => {
	if (typeof a === 'number') {
		// a: number
	} else {
		// a: string
	}
}

const fn1 = (a: Date | RegExp) => {
	if (a instanceof Date) {
		// a: Date
	} else {
		// a: RegExp
	}
}
```

通过 JS 实现的类型收窄无法判断 TS 独有的类型，

## 类型谓词

通过函数 + 类型谓词可以封装一个用于判断任何类型的方法

```tsx
type Rect = { width: number; height: number }
type Circle = { center: [number, number]; radius: number }
function isRect(value: Rect | Circle): value is Rect {
	return 'width' in value && 'height' in value
}

const fn = (a: Rect | Circle) => {
	if (isRect(a)) {
		// a: Rect
	} else {
		// a: Circle
	}
}
```

它的缺点就比较麻烦，需要封装函数

## 可辩别联合 Discriminated Unions

另一种方法是给不同的类型添加一个附带不同基本类型的属性，通常是 kind、type 等

```tsx
interface Circle { kind: 'circle'; radius: number; }
interface Square { kind: 'square'; sideLength: number; }
type Shape = Circle | Square

const fn = (shape: Shape) => {
	if (shape.kind === 'circle') {
    // shape: Circle
  } else {
    // shape: Square
  }
}
```

优点：让复杂类型的收窄变成简单类型的对比

使用条件

1. A、B、C… 有相同属性 kind 或其他
2. kind 的类型是简单类型
3. 各类型中的 kind 可区分

满足以上条件则称为可辩别联合

## any 等于所有类型的联合吗？

理论上 any 是所有类型的联合，但 any 可以同时调用 string 和 number 的方法

```tsx
const fn = (a: any) => {
  a.split(',')
	a.toFixed(2)
}
```

通过上面的例子可以推断出，any 不像是所有类型的联合，更像是可以同时等于任何类型

反而 unknown 更像是真正的所有类型联合，使用时必须要收窄

```tsx
const fn = (a: unknown) => {
	if (typeof a === 'string') {
		// a: string
    a.split(',')
	}
	if (typeof a === 'number') {
		// a: number
    a.toFixed(2)
	}
}
```

## 重载遵循复杂度守恒定律

- 复杂度不会凭空消失，只会转移
- 若想要减轻用户复杂度，就要自己实现重载，若想要提供可供用户选择的 API，可以不使用重载
- 重载的本质就是复杂度守恒，看你选择把复杂度留给自己，还是抛给使用者


## 交叉类型

TS 对直接赋值和间接赋值的校验是不同的，直接赋值比较严格（特殊情况），间接赋值比较松散

```tsx
type A = {
  name: string
}

const b = {
  name: 'Jack',
  age: 12
}

// 报错
const p1: A = {
  name: 'Jack',
  age: 12 // error: Type '{ name: string; age: number; }' is not assignable to type 'A'.
}

// 不报错
const p2: A = b
```

交叉类型的校验必须同时满足两个条件交叉部分

```tsx
type A = {
  left: string
}
type B = {
  right: string
}

type C = A & B

const p1: C = {
  left: 'yes'
  // error:
  // Type '{ left: string; }' is not assignable to type 'C'.
  //   Property 'right' is missing in type '{ left: string; }' but required in type 'B'.
}
```

对象类型交集（类似继承）

```tsx
type Person = {
  name: string
  age: number
}

type User = {
  id: number
  email: string
} & Person

const a: User = {
  name: 'Jack',
  age: 18,
  id: 1,
  email: 'jack@gmail.com'
}
```

type 中的交集冲突校验，当 Person 的 id 类型与 User 的 id 没有交集时，会产生 never

```tsx
type Person = {
  id: string
  name: string
  age: number
}

type User = {
  id: number
  email: string
} & Person

const a: User = {
  name: 'Jack',
  age: 18,
  id: 1, // id: never; error: Type 'number' is not assignable to type 'never'.
  email: 'jack@gmail.com'
}
```

但是当 type 的交集指定相同属性为具体基本类型时，冲突会将整个对象变为 never

```tsx
type A = { kind: 'A', name: string }
type B = { kind: 'B', name: string } & A
// type B = never
```

使用 interface 的继承冲突时会直接在类型处提示报错

```tsx
interface Person {
  id: string
  name: string
  age: number
}

interface User extends Person {
  // error:
	// Interface 'User' incorrectly extends interface 'Person'.
  //  Types of property 'id' are incompatible.
  //    Type 'number' is not assignable to type 'string'.(2430)
  id: number
  email: string
}
```

声明的交集的属性为函数时，函数的参数类型会变为并集

```tsx
type A = {
  method: (a: number) => void
}

type B = {
  method: (a: string) => void
} & A

const fn: B = {
  method(a) {
    // a: number | string
  }
}
```

## 总结

1. 交叉类型常用于有交集的类型
2. 如果类型无交集，可能得到 nerver 也可能是冲突的属性 never
3. 使用 interface 的 extends 处理类型交叉更好（有报错提示）