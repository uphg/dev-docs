# JavaScript 手写篇

## 数组去重

```jsx
// Array.from
function uniq(value) {
  return Array.from(new Set(value))
}

// Set
function uniq(value) {
  return [...new Set(value)]
}

// Map 对象
function uniq(value) {
  const length = value?.length
  if (!length) return []
  const map = new Map()
  let index = -1
  while (++index < length) {
    const item = value[index]
    if (!map.has(item)) {
      map.set(item, true)
    }
  }
  return [...map.keys()]
}
```

## 手写防抖 debounce

```js
// 定时器
function debounce(func, wait) {
  let timerId

  return function debounced(...args) {
    timerId && clearTimeout(timerId)

    timerId = setTimeout(() => {
      func(...args)
      timerId = null
    }, wait)
  }
}

// 结合 Date 对象
function debounce(func, wait) {
  let timerId, prev, args
  
  function later() {
    const passed = Date.now() - prev
    if (wait > passed) {
      timerId = setTimeout(later, wait - passed)
    } else {
      func(...args)
      timerId = prev = args = null
    }
  }

  return function debounced(..._args) {
    prev = Date.now()
    args = _args

    if (!timerId) {
      timerId = setTimeout(later, wait)
    }
  }
}
```

## 手写节流 throttle

```js
// 定时器
function throttle(func, wait) {
  let timerId

  return function (...args) {
    if (timerId) return

    func(...args)
    timeId = setTimeout(() => {
      timerId = null
    }, wait)
  }
}

// Date 实现
function throttle(func, wait) {
  let prev = 0

  return function (...args) {
    const now = Date.now()
    const remain = wait - (now - prev)

    if (remain <= 0) {
      prev = now
      func(...args)
    }
  }
}
```


## 手写发布订阅

实现一个发布订阅模式，满足以下条件

1. on 监听事件
2. emit 触发事件
3. off 取消事件

```js
class Emitter {
  events = {}
  on(name, fn) {
    const e = this.events
    e[name] = e[name] ?? []
    e[name].push(fn)
  }
  once(name, fn) {
    const listener = (...args) => {
      this.off(name, listener)
      fn(...args)
    }
    listener._ = fn
    this.on(name, listener)
  }
  emit(name, ...args) {
    const e = this.events
    e[name]?.forEach(fn => fn(...args))
  }
  off(name, fn) {
    const e = this.events
    e[name] = fn ? e[name].filter(item => item !== fn && item._ !== fn) : []
  }
}

// 运行
const emitter = new Emitter()
emitter.on('click', console.log)
emitter.on('click', console.error)

setTimeout(() => {
  emitter.emit('click', 'Jack')
}, 3000)
```


## 手写 bind

例1：一个简单的 bind

```jsx
function bind(atThis, ...args) {
  const fn = this
  return function(..._args) {
    fn.call(atThis, ...args, ..._args)
  }
}
```

例2：支持 new 的 bind

> 模拟 new 时绑定 this 的情况，检查当前函数是否为 new 调用，如果是，就将当前构造函数作为 this 绑定调用

```jsx
function bind(atThis, ...prevArgs) {
  const fn = this
  const result = function(...args) {
    const _this = this instanceof result ? this : atThis
    return fn.apply(_this, prevArgs.concat(args))
  }
  result.prototype = fn.prototype
  return result
}
```

## 手写深拷贝

只支持常用对象拷贝（Object、Function、Array、Date、RegExp）

```js
function cloneDeep(value) {
  const cache = new WeakMap()
  return baseCloneDeep(value, cache)
}

function baseCloneDeep(value, cache) {
  if (value instanceof Object) {
    if (cache.has(value)) return cache.get(value)
    let result
    if (value instanceof Function) {
      result = value.prototype
        ? function(...args) {
            return value.apply(this, args)
          }
        : (...args) => value.apply(void 0, args)
    } else if (value instanceof Array) {
      result = []
    } else if (value instanceof Date) {
      result = new Date(value - 0)
    } else if (value instanceof RegExp) {
      result = new RegExp(value)
    } else {
      result = {}
    }
    cache.set(value, result)
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const item = value[key]
        result[key] = baseCloneDeep(item, cache)
      }
    }

    return result
  } else {
    return value
  }
}
```

## 事件委托

```js
function on(el, eventName, selector, callback) {
  if (!el || !eventName) return

  el.addEventListener(eventName, (e) => {
    let current = e.target
    while (!current.matches(selector)) {
      if (el === current) {
        current = null
        break
      }
      current = current.parentNode
    }
    
    current && callback?.call(current, e, current)
  })
  return el
}
```

## 可拖拽 div

```js
function useDraggable(el) {
  let pressedDelta = null

  el.addEventListener('pointerdown', (e) => {
    const rect = el.getBoundingClientRect()
    pressedDelta = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  })

  document.addEventListener('pointermove', (e) => {
    if (!pressedDelta) return

    el.style.top = `${e.clientY - pressedDelta.y}px`
    el.style.left = `${e.clientX - pressedDelta.x}px`
  })

  document.addEventListener('pointerup', () => {
    pressedDelta = null
  })
}
```

## 手写 Promise

代码参考：[vanilla-utils/promise.mjs at master · uphg/vanilla-utils (github.com)](https://github.com/uphg/vanilla-utils/blob/master/src/promise.mjs)

## 手写 Promise.all

```js
Promise.all2 = function (list) {
  let resultList = []
  let count = 0
  return new Promise((resolve, reject) => {
    list.forEach(item => item.then((result) => {
      resultList.push(result)
      count += 1
      if (count >= list.length) {
        resolve(resultList)
      }
    }, (reason) => {
      reject(reason)
    }))
  })
}
```