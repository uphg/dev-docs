# 联合类型

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

## **重载遵循复杂度守恒定律**

- 复杂度不会凭空消失，只会转移
- 若想要减轻用户复杂度，就要自己实现重载，若想要提供可供用户选择的 API，可以不使用重载
- 重载的本质就是复杂度守恒，看你选择把复杂度留给自己，还是抛给使用者