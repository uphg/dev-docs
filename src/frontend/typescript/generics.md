# 泛型

基本案例

```tsx
type Person = { name: string }

type LikeString<T> = T extends string ? true : false

type A = LikeString<'hi'> // true
type B = LikeString<true> // false
```

当泛型参数为联合类型（`A | B`）时，会分两种情况，而不是直接传入联合类型

```tsx
type ToArray<T> = T extends unknown ? T[] : never

type Result = ToArray<string | number>
// type Result = string[] | number[]
```

获取 key 类型

```tsx
type GetKeyType<T, K extends keyof T> = T[K]

type Person = { name: string; age: number }

type Result = GetKeyType<Person, 'name'>
// type Result = string
```

## 内置泛型实现

**Readonly**

```tsx
type Readonly<T> = {
  readonly [k in keyof T]: T[k]
}
```

**Mutable（去除属性只读）**

```tsx
type Mutable<T> = {
  -readonly [k in keyof T]: T[k]
}

type Result = Mutable<{
  readonly name: string,
  readonly age: number
}>
// type Result = { name: string; age: number }
```

**Partial（属性可选）**

```tsx
type Partial<T> = {
  [k in keyof T]?: T[k]
}
```

**Required（去掉属性可选）**

```tsx
type Required2<T> = {
  [k in keyof T]-?: T[k]
}
type Result = Required2<{ name?: string; age?: number }>
// type Result = { name: string; age: number }
```

Record（声明对象类型）

```tsx
type Record<Key extends string | number | symbol, Value> = {
  [k in Key]: Value
}
```

Exclude（从已有类型中排除指定类型）

```tsx
type Exclude<T, U> = T extends U ? never : T

type A = 1 | 2 | 3
type Result = Exclude<A, 1 | 2> // 3
```

Extract（求两集合交集）

```tsx
type Extract<T, U> = T extends U ? T : never

type A = 1 | 2 | 3
type Result = Extract<A, 2 | 4> // 2
```

Pick（返回指定 key 的对象类型）

```tsx
type Pick<T, K extends keyof T> = {
  [k in K]: T[k]
}

type Result = Pick<{ a: 1, b: 2, c: 3 }, 'a' | 'b'> // { a: 1; b: 2; }
```

Omit（返回排除指定 key 的对象类型）

```tsx
// 方案一
type Omit<T, K> = {
  [key in keyof T as key extends K ? never : key]: T[key]
}

// 方案二（TS 内置）
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type Result = Omit2<{ a: 1, b: 2, c: 3 }, 'a' | 'b'> // { c: 3; }
```