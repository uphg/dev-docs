# Class

## Class 声明

基本写法

```tsx
// 完整声明
class Point {
  x: number
  y: number
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

// 使用 TS 语法简写
class Point {
  constructor(public x = 0, public y = 0) {

  }
}
```

可以使用 `!:` 声明不会报错的属性，表示我保证它一定会初始化

```tsx
class Point {
  x!: number
  y!: number
  constructor() {
      
  }
}
```

属性类型声明

```tsx
class Hash {
  [k: string]: unknown

  set(key: string, value: unknown) {
    this[key] = value
  }
  get(key: string) {
    return this[key]
  }
}
```

## implements 实现

TS 中的实现只做类型提示，并不会实际帮你做什么

```tsx
interface Person {
  name: string
  sayHi: (target: Person) => void
}

class User implements Person {
  constructor(public name: string) {

  }
  sayHi(target: Person) {
    console.log(`Hi, ${target.name}`)
  }
}
```

## 继承

基本用法

```tsx
class Person {
  constructor(public name: string) {

  }
  sayHi() {
    console.log(`你好，我是${this.name}`)
  }
}

class User extends Person {
  constructor(public id: number, name: string) {
    super(name)
  }
  login() { }
}

const a = new User(1, 'Jack')
console.log(a)
```

继承时可以重写父类的方法

```tsx
class Person {
  constructor(public name: string) {

  }
  sayHi() {
    console.log(`你好，我是${this.name}`)
  }
}

class User extends Person {
  constructor(public id: number, name: string) {
    super(name)
  }
  sayHi(target?: string) {
    target ? console.log(`${target}你好，我是${this.name}`) : super.sayHi()
  }
  login() { }
}

const a = new User(1, 'Jack')
console.log(a)
a.sayHi()
```

也可以重写属性，但与方法不同，属性需要添加 **declare 前缀**，并且属性的类型只能相对父类收窄

```tsx
class Person {
  friend?: Person
  constructor(public name: string, friend?: Person) {
    this.friend = friend
  }
}

class User extends Person {
  declare friend?: User
  constructor(public id: number, name: string, friend?: User) {
    super(name, friend)
  }
}

const a = new User(1, 'Tom')
const b = new User(1, 'Jack', a)
console.log(b)
```

## 属性修饰符

public 公共属性，在 class 内部和 new 后的对象都可以使用

```tsx
class Person {
  public name: string
  constructor(name: string) {
    this.name = name
  }
}
```

private 只在当前类可用

```tsx
class Person {
  private name: string
  constructor(name: string) {
    this.name = name
  }
}

const a = new Person('Jack')
a.name // Error
```

protected 只在当前类和子类可用

```tsx
class Person {
  protected name: string
  constructor(name: string) {
    this.name = name
  }
}

class User extends Person {
  constructor(name: string) {
    super(name)
  }
  sayHi() {
    console.log(`你好，我是${this.name}`)
  }
}

const a = new Person('Jack')
a.name // Error
```

上面三种语法，只对 TS 代码做了限制，类型擦除以后就会不存在，但 JS 也自带了私有属性写法

```tsx
class Person {
  #name: string
  constructor(name: string) {
    this.#name = name
  }
}
```

## 静态属性

声明 class 本身的属性需要添加 static 关键字

```tsx
class Person {
  static species: string = '人类'
  constructor() { }
}

Person.species // 人类
```

还可以添加静态块，表示当 class 被初始化时要对静态属性做的处理，通常用于私有属性的处理

```tsx
class Foo {
  static #count = 0
  static {
    const count = loadFromLocalStorage() || 0 // 从本地获取计数
    Foo.#count = count
  }
  constructor() { }
}
```

## class 泛型

class 也可以使用泛型

```tsx
class Hash<K, V> {
  map: Map<K, V> = new Map()
  set(key: K, value: V) {
    this.map.set(key, value)
  }
  get(key: K) {
    return this.map.get(key)
  }
}

const a = new Hash<string | number, string | boolean>()
a.set('name', 'Jack')
```

还可以将泛型参数传给继承的父类

```tsx
class Hash<K, V> extends Map<K, V> {
  destroy() {
    this.clear()
  }
}
```

class 声明式写法

```tsx
const Person = class {
  constructor() { }
}
```

## class 传参类型

使用 class 作为函数的参数时，需要特殊方式声明类型

```tsx
class Person {
  constructor(public name: string) { }
}

// 方案1
function f1(P: typeof Person) {
  console.log(new P('Jack'))
}

f1(Person)

// 方案2
function f2(P: new (name: string) => Person) {
  console.log(new P('Jack'))
}

f2(Person)
```