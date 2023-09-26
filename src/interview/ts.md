# TypeScript 押题

## any & unknown & never

1. any 任意类型（所有类型的集合）
2. unknown 未知类型，需要在使用时手动断言
3. never 空类型，表示没有类型（通常用于代码推断）

**any VS unknown**

二者都是顶级类型（top type），任何类型的值都可以赋值给顶级类型

```ts
let foo: any = 1
let bar: unknown = 1
```

但 unknown 比 any 类型检查更严格，any 什么检查都不做，unknown 类型在使用时要先收窄类型

```ts
const value: unknown = 'hi'
const str: string = value
// 报错：Type 'unknown' is not assignable to type 'string'.
```

类型收窄后不报错

```ts
const value: unknown = 'hi'
const str: string = value as string // 不报错
```

如果改成 any，基本在哪都不报错，所以在大多数情况下，尽量优先使用 unknown 

**never 类型**

never 是底类型，表示不应该出现的类型，这里引用[尤雨溪的例子](https://www.zhihu.com/question/354601204/answer/888551021)

```ts
type A = 'a'
type B = 'b'
type All = A | B

function handleValue(value: All) {
  switch (value) {
    case 'a':
      value // value 被收窄为 A
      break
    case 'b':
      value // value 被收窄为 B
      break
    default:
      value // value 为 never
  }
}
```

## type & interface 的区别

官方给出的[文档说明](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)：

1. 范围不同：interface 只描述对象，type 则描述所有类型数据
2. 命名方式：type 只是创建类型别名，interface 则是创建新的类型（实际存在类型）
3. 扩展方式：interface 可以重复声明类型来拓展类型，type 一个类型只能声明一次
4. 组合方式：interface 可以使用 extends 实现继承，type 需要使用 & 来实现联合类型

## TS 工具类型的作用及实现

将类型的英文翻译为中文

1. Partial 部分类型
2. Required 必填类型
3. Readonly 只读类型
4. Exclude 排除类型
5. Extract 提取类型
6. Pick 保留对象指定 key
7. Omit 排除对象指定 key
8. ReturnType 获取返回值类型

举例说明每个工具类型的用法

```ts
type A = 1 | 2 | 3 | 4
type B = Exclude<A, 1 | 2> // type B = 3 | 4
type C = Extract<A, 1 | 2> // type C = 1 | 2
```