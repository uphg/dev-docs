# 异步迭代和 generator

异步迭代允许我们对按需通过异步请求而得到的数据进行迭代。

## 异步可迭代对象

当值是以异步的形式出现时，例如在 `setTimeout` 或者另一种延迟之后，就需要异步迭代。<br/>
最常见的场景是，对象需要发送一个网络请求以传递下一个值。

要使对象异步迭代：

1. 使用 `Symbol.asyncIterator` 取代 `Symbol.iterator`。
2. `next()` 方法应该返回一个 `promise`（带有下一个值，并且状态为 `fulfilled`）。
    - 关键字 `async` 可以实现这一点，我们可以简单地使用 `async next()`。
3. 我们应该使用 `for await (let item of iterable)` 循环来迭代这样的对象。
    - 注意关键字 `await`。

作为开始的示例，让我们创建一个可迭代的 `range` 对象，与前面的那个类似，不过现在它将异步地每秒返回一个值。

我们需要做的就是对上面代码中的部分代码进行替换：

```javascript{5,10,12-13,26-28}
let range = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() { // (1)
    return {
      current: this.from,
      last: this.to,

      async next() { // (2)

        // 注意：我们可以在 async next 内部使用 "await"
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
})()
```

正如我们所看到的，其结构与常规的 iterator 类似:

1. 为了使一个对象可以异步迭代，它必须具有方法 `Symbol.asyncIterator` `(1)`。
2. 这个方法必须返回一个带有 `next()` 方法的对象，`next()` 方法会返回一个 promise `(2)`。
3. 这个 `next()` 方法可以不是 `async` 的，它可以是一个返回值是一个 `promise` 的常规的方法，但是使用 `async` 关键字可以允许我们在方法内部使用 `await`，所以会更加方便。这里我们只是用于延迟 1 秒的操作 `(3)`。
4. 我们使用 `for await(let value of range)` `(4)` 来进行迭代，也就是在 `for` 后面添加 `await`。它会调用一次 `range[Symbol.asyncIterator]()` 方法一次，然后调用它的 `next()` 方法获取值。

对比 Iterator 和异步 iterator 之间差异：

|                          | Iterator          | 异步 iterator          |
| :----------------------- | :---------------- | :--------------------- |
| 提供 iterator 的对象方法 | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` 返回的值是      | 任意值            | `Promise`              |
| 要进行循环，使用         | `for..of`         | `for await..of`        |


::: warning 拓展符不生效（Spread 语法） 

不能使用拓展符拓展异步可迭代对象

```js
alert( [...range] ); // Error, no Symbol.iterator
```

因为它期望找到 `Symbol.iterator`，而不是 `Symbol.asyncIterator`（`for..of` 同理）。

:::


## 异步 generator (finally)

语法很简单：在 `function*` 前面加上 `async`。这即可使 generator 变为异步的。

然后使用 `for await (...)` 来遍历它，像这样：

```javascript
async function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

    // 哇，可以使用 await 了！
    await new Promise(resolve => setTimeout(resolve, 1000));

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1，然后 2，然后 3，然后 4，然后 5（在每个 alert 之间有延迟）
  }

})();
```

因为此 generator 是异步的，所以我们可以在其内部使用 `await`，依赖于 `promise`，执行网络请求等任务。

::: tip 引擎盖下的差异


如果你还记得我们在前面章节中所讲的关于 generator 的细节知识，那你应该知道，从技术上讲，异步 generator 和常规的 generator 在内部是有区别的。

对于异步 generator，`generator.next()` 方法是异步的，它返回 promise。

在一个常规的 generator 中，我们使用 `result = generator.next()` 来获得值。但在一个异步 generator 中，我们应该添加 `await` 关键字，像这样：

```javascript
result = await generator.next(); // result = {value: ..., done: true/false}
```

这就是为什么异步 generator 可以与 `for await...of` 一起工作。

:::

> 引擎盖下的差异用于比喻：即在外观上两种 generator 可能看起来很相似，但在内部实现上却有一些不同的机制。

## 异步的可迭代对象 range

常规的 generator 可用作 `Symbol.iterator` 以使迭代代码更短。

与之类似，异步 generator 可用作 `Symbol.asyncIterator` 来实现异步迭代。

例如，我们可以通过将同步的 `Symbol.iterator` 替换为异步的 `Symbol.asyncIterator`，来使对象 `range` 异步地生成值，每秒生成一个：

```javascript
let range = {
  from: 1,
  to: 5,

  // 这一行等价于 [Symbol.asyncIterator]: async function*() {
  async *[Symbol.asyncIterator]() {
    for(let value = this.from; value <= this.to; value++) {

      // 在 value 之间暂停一会儿，等待一些东西
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for await (let value of range) {
    alert(value); // 1，然后 2，然后 3，然后 4，然后 5
  }

})();
```

现在，value 之间的延迟为 1 秒。

::: tip 注意

从技术上讲，我们可以把 `Symbol.iterator` 和 `Symbol.asyncIterator` 都添加到对象中，因此它既可以是同步的（`for..of`）也可以是异步的（`for await..of`）可迭代对象。

但是实际上，这将是一件很奇怪的事情。

:::

## 原文引用

本文内容摘自 [现代 JavaScript 教程 - 异步迭代和 generator](https://zh.javascript.info/async-iterators-generators)

## 署名和内容修改说明

本文在作者原有文章上进行过内容的简化和修改。