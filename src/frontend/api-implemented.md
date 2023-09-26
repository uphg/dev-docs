# 常用方法实现

实现常见的 JavaScript 方法

## 回调函数转 Promise（Promisification）

参考自：[Promisification](https://zh.javascript.info/promisify)，将回调形式的函数转为 Promise 处理

```js
function promisify(fn, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(error, ...results) {
        if (error) {
          reject(error)
        } else {
          resolve(manyArgs ? results : results[0])
        }
      }

      args.push(callback)
      fn.call(this, ...args)
    })
  }
}

// 使用
const f1 = promisify((a, b, callback) => {
  callback(null, a, b)
}, true)

f1(1, 2).then((results) => {
  console.log(results) // [1, 2]
})
```