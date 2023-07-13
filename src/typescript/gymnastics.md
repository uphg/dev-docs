# 类型体操

实现一个判断空元组

```tsx
type IsEmptyArray<A extends unknown[]> = A["length"] extends 0 ? true : false
type Result = IsEmptyArray<[]>
```

使用 infer 可以声明一个只在当前式子使用的临时别名（模式匹配）

```tsx
type Tuple = ['ji', 'ni', 'tai', 'mei']

// 获取头部
type Result1 = Tuple extends [infer First, ...string[]]
  ? First : never

// 获取剩余元组
type Result2 = Tuple extends [string, ...infer Rest]
  ? Rest : never
```

使用模式匹配实现判断不为空的元组

```tsx
type NotEmpty<A extends unknown[]> =
  A extends [...unknown[], unknown] ? true : false

type Result1 = NotEmpty<[1]>

// 可以使用以下方式进行模式匹配
type NotEmpty2<A extends unknown[]> =
  A extends [...infer Rect, infer last] ? true : false

type Result2 = NotEmpty2<[1]>

// 可以反推一下，先查看 A 的类型
type NotEmpty3<A extends [...unknown[], unknown]> = A

type Result3 = NotEmpty3<[]> // 此处会报错，说明该模式匹配判断时会排除空数组
```

**实现元组反转**

```tsx
type Reverse<T extends unknown[]> =
  T extends [...infer Rese, infer Last]
    ? [Last, ...Reverse<Rese>]
    : T

type A = ['ji', 'ni', 'tai', 'mei']
type Result = Reverse<A>
// type Result = ["mei", "tai", "ni", "ji"]
```

上面代码的 JS 版本实现

```tsx
function reverse<T>(value: T[]): T[] {
  const [first, ...rest]= value
  return value.length !== 0 && rest.length > 0
    ? [...reverse(rest)].concat(first)
    : value
}

console.log(reverse<string>(['ji', 'ni', 'tai', 'mei']))
```

获取元组最后一项

```tsx
type A = [1, 2, 3, 4]

type Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never

type Result = Last<A>
```

**获取字符串类型最后一项**

```tsx
type LastOfTuple<T extends unknown[]> =
  T extends [...infer _, infer L] ? L : never

type StringToTuple<S extends string> = 
  S extends `${infer F}${infer R}`
    ? [F, ...StringToTuple<R>]
    : []

type LastOfSTring<S extends string> = LastOfTuple<StringToTuple<S>>
  
type R = LastOfSTring<'Ji Ni Tai M'>
```

思路

- 我们可以获取元组的最后一项
- 字符串可以转为元组
- 我们可以获取字符串的最后一项

## 递归层数限制

在 TypeScript 中，使用泛型递归也会有层数限制，目前最高 48 层

```tsx
type A = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50
]

type Reverse<A extends unknown[]> = 
  A extends [...infer Rest, infer Last]
    ? [Last, ...Reverse<Rest>]
    : []

type Result = Reverse<A>
// Error: Type instantiation is excessively deep and possibly infinite
```

string 转 联合类型（联合类型会自动去重）

```tsx
type StringToUnion<S extends string> = 
  S extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never

type Result = StringToUnion<'jinitaimei'>
// type Result = "j" | "i" | "n" | "t" | "a" | "m" | "e"
```

string 转 元组

```tsx
type StringToTuple<S extends string> = 
  S extends `${infer First}${infer Rest}`
    ? [First, ...StringToTuple<Rest>]
    : []

type Result = StringToTuple<'jinitaimei'>
// type Result = ["j", "i", "n", "i", "t", "a", "i", "m", "e", "i"]
```

## 递归嵌套数组

实现一个递归的嵌套数组类型

```tsx
export type RecursiveArray<T> = Array<T | RecursiveArray<T>>
```