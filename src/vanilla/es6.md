# ES6 常用 API

## let

let 只能作用于当前块级作用域

```js
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

for 循环使用 let 与 var 有所不同

使用 var

```js
for (var i = 0; i < 5; i++) { 
  setTimeout(()=> console.log(i)) 
}
  
// 输出为：5 5 5 5 5
```

使用 let

```js
for (let i = 0; i < 5; i++) { 
  setTimeout(()=> console.log(i)) 
}
  
// 输出为：0 1 2 3 4
```

结论，每次使用 for 循环内的 let i，都相当于声明一个新的 let i，所以不会因为 setTimeout 改变，但 使用var 会导致变量提升，setTimeout 时找的都是最外部的 var i，所以都是 5

## 暂时性死区

只要块级作用域内存在 `let` 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```js
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}

// 函数内同理
function func() {
  let a = 10;
  var a = 1;
}
// Uncaught SyntaxError: Identifier 'a' has already been declared
```

且使用 typeof 也无法避免 let 重名报错

```js
typeof x; // ReferenceError
let x;
```

## const

const 与 let 很像，主要的区别就是它**不允许重新赋值、声明时必须赋值**。

## 箭头函数

箭头函数没有自己的 this

```js
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
```

## Symbol

Symbol 值通过 `Symbol()` 函数生成，Symbol 类型，是独一无二的，可以保证不会与其他属性名产生冲突。

```js
let s = Symbol();

typeof s // "symbol"
```

## Set

类似于数组，但是成员的值都是唯一的，没有重复的值。

```js
const s = new Set([1, 2, 3])

s.add(5)
s.keys() // 返回一个新的迭代器对象，该对象包含 Set 对象中的按插入顺序排列
s.values() // 与 keys 相同

s.size // 3

s.has(1) // true
s.delete(2) // true
s.clear()
```

## WeakSet

与 Set 类似，但它与 Set 有两个区别：

- WeakSet 的成员只能是对象和 Symbol 值，而不能是其他类型的值。
- 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

```js
const ws = new WeakSet();
ws.add(1) // 报错
ws.add(Symbol()) // 不报错
```

> 由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。
> 这些特点同样适用于本章后面要介绍的 WeakMap 结构。

### 作用

WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

## Map

是键值对的集合（Hash 结构），但“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
```

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

- `Map.prototype.keys()`：返回键名的遍历器。
- `Map.prototype.values()`：返回键值的遍历器。
- `Map.prototype.entries()`：返回所有成员的遍历器。
- `Map.prototype.forEach()`：遍历 Map 的所有成员。

### Map 转对象

如果所有 Map 的键都是字符串，它可以无损地转为对象。

```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap) // { yes: true, no: false }
```

## WeakMap

`WeakMap` 结构与 `Map` 结构类似，也是用于生成键值对的集合。



`WeakMap` 的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。

```js
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
```

此时想要删除对象，必须也要删除 `arr` 变量中的对象引用

```js
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
```

上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内

```js
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"
```

同样 WeakMap 不可遍历

```js
const wm = new WeakMap();

// size、forEach、clear 方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined
```

WeakMap 应用的典型场合就是 DOM 节点作为键名。

## Proxy

用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”

在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

```js
const obj = new Proxy({}, {
  get(target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set(target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
```

### 为什么需要使用 Reflect？

- 由于当前代理对象的 this 很可能不是原对象的 this，但我们操作时需要操作源对象。
- 所以使用 Reflect.get(target, key, receiver) 可以传入原对象的 this，更精确的操作原对象。

错误示例

```js
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

let admin = Object.assign(Object.create(userProxy), {
  _name: "Admin"
});

// 期望输出：Admin
console.log(admin.name); // 输出：Guest
```

使用 Reflect API 后

```js
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
    return Reflect.get(target, prop, receiver); // (*)
  }
});


let admin = Object.assign(Object.create(userProxy), {
  _name: "Admin"
});

console.log(admin.name); // Admin
```

### Vue3 为什么使用 Proxy 代替 Object.defineProperty

Vue2 数据响应式

- 首先 Object.defineProperty 只支持对象读取，写入 代理：getter、setter。
- 通过数组的方法去更改数组或直接删除 data 数据，无法实现响应式，因为 Object.defineProperty 不支持。
- 因此 Vue2 中数组操作的 API 方法需要自己实现，例如 push、pop 等。
- 且由于无法监听到属性删除和新增，需要使用 Vue 实现的 API `Vue.detele`、`Vue.set` 完成。

Vue3 数据响应式，使用 Proxy 实现，支持以下功能拦截

- `get(target, propKey, receiver)`、`set(target, propKey, value, receiver)`。
- `has(target, propKey)`：拦截`propKey in proxy`。
- `deleteProperty(target, propKey)`：拦截 `delete proxy[propKey]` 的操作。
- `ownKeys(target)`：拦截 `Object.keys(proxy)`、`for...in` 循环、`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)` 等。
- `apply(target, object, args)`：拦截 Proxy 实例作为函数调用的操作，比如 `proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。

**所以，为什么 Vue3 使用 Proxy 代替 Object.defineProperty？**

- 功能更强大：Proxy 比 Object.defineProperty 提供了更多的功能和灵活性。Proxy 可以拦截并自定义对象上的各种操作，包括属性访问、赋值、删除等。这意味着 Vue 3 可以更好地跟踪对象的变化，并能够提供更多的响应式行为。
- 更好的性能：与 Object.defineProperty 相比，Proxy 通常具有更高的性能。Proxy 在底层实现上能够更高效地拦截对象操作，因此在大多数情况下，Vue 3 使用 Proxy 可以获得更好的性能表现。
- 更好的错误检测：Proxy 提供了更好的错误检测和调试能力。当使用 Object.defineProperty 时，如果出现错误，通常很难追踪和诊断问题。而使用 Proxy，可以更容易地捕获和处理错误，提供更好的开发者体验。
- 更好的浏览器支持：Object.defineProperty 在某些旧版本的浏览器中存在兼容性问题。Proxy 是 ES6 的一部分，并且在现代浏览器中得到广泛支持，这使得 Vue 3 可以更好地适应多种浏览器环境。

> 总结：Vue 3 选择使用 Proxy 替代 Object.defineProperty 是为了提供更好的功能、性能和开发者体验，并且更好地适应现代浏览器环境。


## Promise 对象

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。更多参考：[Promise](https://wangdoc.com/es6/promise)

创建一个简单的 promise

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

### Promise.prototype.then

Promise 状态改变时的回调函数，第一个参数是 resolved 状态回调函数，第二个参数是 rejected 状态回调函数

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

### Promise.prototype.catch

`Promise.prototype.catch()` 方法是 `.then(undefined, rejection)` 的别名，用于指定发生错误时的回调函数

跟传统的 `try/catch` 代码块不同的是，如果没有使用 `catch()` 方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

浏览器运行到 `someAsyncThing()`，会打印出错误提示 `ReferenceError: x is not defined`，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。

### Promise.prototype.finally

finally 方法不管 Promise 对象最后状态如何，都会执行。

它的实现原理也很简单，如下：

```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

### Promise.all

处理多个 Promise 对象，接收一个 Promise 对象数组作为参数。返回一个新的 Promise 对象，这个 Promise 对象只有所有输入的 Promise 对象都成功（）时才会被解决（），只要有一个失败，那么返回的 Promise 对象立刻失败，并且它的拒绝原因是第一个失败的 Promise 对象的拒绝原因。

### Promise.race

处理多个 Promise 对象，接收一个 Promise 对象数组为参数。只要数组中有一个 Promise 对象被处理或拒绝，就会立刻返回被处理/拒绝的结果。

### Promise.allSettled

有时候，我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。但 `Promise.all` 无法满足，为了解决这个问题，ES2020 引入了 `Promise.allSettled()` 方法，用来确定一组异步操作是否都结束了（不管成功或失败）。

### Promise.try（第三方实现）

实际开发中，经常遇到不想区分，函数 f 是同步函数还是异步操作，但是想用 Promise 来处理它。

那么有没有一种方法，让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？回答是可以的，并且还有两种写法。第一种写法是用 `async` 函数来写。

```js
const f = () => console.log('now');
(async () => f())();
console.log('next');
// now
// next
```

上面代码中，第二行是一个立即执行的匿名函数，会立即执行里面的 `async` 函数，因此如果 `f` 是同步的，就会得到同步的结果；如果 `f` 是异步的，就可以用 `then` 指定下一步，就像下面的写法。

```js
(async () => f())()
.then(...)
```

需要注意的是，`async () => f()` 会吃掉 `f()` 抛出的错误。所以，如果想捕获错误，要使用 `promise.catch` 方法。

```js
(async () => f())()
.then(...)
.catch(...)
```

第二种写法是使用 `new Promise()`

```js
const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');
// now
// next
```

上面代码也是使用立即执行的匿名函数，执行 `new Promise()`。这种情况下，同步函数也是同步执行的。


鉴于这是一个很常见的需求，所以现在有一个提案，提供 `Promise.try` 方法替代上面的写法。

```js
const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next
```

事实上，`Promise.try` 存在已久，Promise 库 `Bluebird`、`Q` 和 `when`，早就提供了这个方法。