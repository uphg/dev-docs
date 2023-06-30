# 函数

## 索引签名 Index Signature

```tsx
type Hash = {
  [k: string]: unknown
  length: number
}

type List = {
  [k: number]: unknown
  length: number
}
```

## 映射类型 Mapped Type

相对于 ":" 的区别，在声明 in 后不能再写其他类型

```tsx
type Hash = {
  [k in string]: unknown
}

type List = {
  [k in number]: unknown
  length: number // Error
}
```

## 只读类型 readonly

```tsx
type User = {
  readonly id: number
  name: string
  age?: number
}
```

## 类型谓词 is

在 TS 无法通过类型推断区分类型时使用，强制告诉 TS 当前类型的判断

```tsx
type Person = {
  name: string
}

type Animal = {}

type A = (p: Person | Animal) => p is Person

function fn(p: Person | Animal) {
  if (isPerson(p)) {
    // p: Person
  }
}

function isPerson(p: Person | Animal): p is Person {
  return 'name' in p
} // Ok

const isPerson2: A = (p) => 'name' in p // Error
```

## 函数重载

重载常用于无法通过联合类型实现函数多种类型参数时

```tsx
function createDate(n: number): Date;
function createDate(year: number, month: number, date: number): Date;

function createDate(a: number, b?: number, c?: number): Date {
  if (a !== undefined && b !== undefined && c !== undefined) {
    return new Date(a, b, c)
  } else if (a !== undefined && b === undefined && c === undefined) {
    return new Date(a)
  } else {
    throw new Error('传入参数格式错误，只接受一个或三个参数')
  }
}

createDate(1671282965038)
createDate(2023, 0, 1)
createDate(2023, 0) // Error
```

尽量在无法使用联合类型声明时使用函数重载

## 剩余参数

可以声明剩余参数类型

```tsx
function sum(name: string, ...args: number[]) {
	return `${name}: ` + args.reduce((prev, current) => prev + current)
}

sum('结果', 1, 2, 3) // 6
```

## 类型收窄（as const）

当我们需要收窄一个类型时，可以使用 as const ，收窄后的类型均为 只读

```tsx
let a = 'hi' as const
// let a: "hi"
const array = [1, 'hi'] as const
// const array: readonly [1, "hi"]
arrap.push(2)
// Error: Cannot find name 'arrap'. Did you mean 'array'
```

## 展开参数

使用对象展开参数时，有两种方式添加类型声明，还可以添加默认值

```tsx
type Config = {
  url: string
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  data?: unknown
  headers?: unknown
}

// 使用":"声明类型
function ajax({ url, method, ...rest }: Config = { method: 'GET', url: '' }) {
  console.log(url, method, rest)
}

// 使用"as"断言类型
function ajax2({ url, method, ...rest } = { method: 'GET', url: '' } as Config) {
  console.log(url, method, rest)
}
```

## 函数返回值

当函数返回值为  void 时，不支持返回 null（严格的类型检测）

```tsx
// OK
function f1(): void {
  return
}

// OK
function f2(): void {
  return undefined
}

// OK
function f3(): void {
  
}

// Error
function f4(): void {
  return null
}
```
