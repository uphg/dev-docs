# 常用方法实现

实现常见的 JavaScript 方法

## 数组去重 unique

```js
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

## 防抖 debounce

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

## 节流 throttle

```javascript
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

## 发布订阅

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
```

## bind 函数

```js
function bind(atThis, ...prevArgs) {
  const fn = this
  const result = function(...args) {
    const _this = this instanceof result ? this : atThis
    return fn.apply(_this, prevArgs.concat(args))
  }
  result.prototype = fn.prototype
  return result
}

export default bind
```

## 深拷贝

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