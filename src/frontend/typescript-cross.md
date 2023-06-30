# 交叉类型

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

## 交叉类型 &

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