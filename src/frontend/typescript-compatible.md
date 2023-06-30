# 类型兼容

## 为什么要做类型兼容？

在 JavaScript 中，给函数传参数，当参数的属性多于函数使用的属性时，你并不需要去掉多余的属性

```tsx
const config = {
  a: 1, b: 2, c: 3
}

function runTask({ a, b }) {
  console.log(a, b)
}
runTask(config)
```

由于 TypeScript 需要兼容 JavaScript 的使用习惯，所以做了类似的类型兼容

## 类型兼容

简单类型的类型兼容（很像类型收窄）

```tsx
type A = string | number

const a: A = 'hi'
```

对象的类型兼容，对象的类型兼容是，具有相同属性（交集）情况下，属性多的兼容属性少的

```tsx
type Person = {
  name: string
  age: number
}

const user = {
  name: 'Jack',
	age: 18,
  id: 1,
  email: 'jack@gmail.com'
}

const a: Person = user

const fn = (p: Person) => console.log(p)
// 作为函数调用时的参数时也不报错（仅在调用时）
fn(user)
```

inteface 的类型兼容同理（属性多的兼容属性少的）

```tsx
interface A {
  x: string
}

interface B extends A {
  y: string
}

const objectChild: B = {
  x: 'yes',
  y: 'yes'
}

const objectParent: A = objectChild
```

## 函数参数兼容

函数参数兼容，是参数少的可以兼容参数多的

```tsx
type Fn1 = (a: number) => void
type Fn2 = (a: number, b: string) => void

const fn1: Fn2 = (a: number) => {} // Ok
const fn2: Fn1 = (a: number, b: string) => {} // Error
```

这是由于在 JavaScript 中，参数变少是很常见的（默认参数）所以 TypeScript 也会兼容

**函数对象参数的兼容**，与对象赋值兼容恰恰相反，是**属性少的兼容属性多的**

```tsx
interface A {
  x: string
}

interface B extends A {
  y: string
}

type Fn1 = (p: A) => void
type Fn2 = (p: B) => void

const fn2: Fn2 = (p: A) => {} // OK
const fn1: Fn1 = (p: B) => {} // Error
```

**函数返回值**类型兼容与对象声明类型兼容相同，也是**属性多的兼容属性少的**

```typescript
type Fn1 = () => { x: string }
type Fn2 = () => { x: string; y: string }

const fn1: Fn1 = () => ({ x: 'a', y: 'b' }) // OK
const fn2: Fn2 = () => ({ x: 'a' }) // Error
```
