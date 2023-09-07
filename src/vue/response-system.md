# 响应系统的作用与实现

## 副作用函数

副作用函数指的是会产生副作用的函数，如下面的代码所示：

```js
function effect() {
  document.body.innerText = 'hello vue3'
}
```

当 effect 函数执行时，它会设置 body 的文本内容，但除了 effect 函数之外的任何函数都可以读取或设置 body 的文本内容。也就是说，**effect 函数的执行会直接或间接影响其他函数的执行，这时我们说 effect 函数产生了副作用。**副作用很容易产生，例如一个函数修改了全局变量，这其实也是一个副作用，如下面的代码所示：

```js
// 假如它是全局变量
let val = 1

function effect() {
  val = 2 // 修改全局变量，产生副作用
}
```

## 响应式数据

我们希望以下 effect 在每次 obj.text 更新时执行，这就叫响应式数据

```js
const obj = { text: 'hello world' }
function effect() {
  // effect 函数的执行会读取 obj.text
  document.body.innerText = obj.text
}
```

如何让 obj 变为响应式的呢，我们发现以下特点：

- 当副作用函数 effect 执行时，会触发字段 obj.text 的读取操作。
- 当修改 obj.text 时，会触发字段 obj.text 的设置操作。

如果可以拦截对象的读取和设置，就好办了。当读取字段 obj.text 时，我们可以把副作用函数 effect 存到一个“桶”里。当设置 obj.text 时，再把 effect 从“桶”里拿出来并执行即可。

使用 Proxy 来实现该功能

```js
// 存储副作用
const bucket = new Set()

const data = { text: 'hello world' }
const obj = new Proxy(data, {
  get(target, key) {
    bucket.add(effect)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    bucket.forEach(fn => fn())
    return true
  }
})
```

测试下修改该对象：

```js
function effect() {
  document.body.innerText = obj.text
}

effect()

setTimeout(() => {
  obj.text = 'hello vue3'
}, 1000)
```

在浏览器中运行上面这段代码，会得到期望的结果。

## 完善响应系统

上面代码中的响应系统，有很多缺点，比如由于 effect 没有与对象建立一一对应的关系，无法根据对象、对象的 key 区分 effect。我们可以封装一个树形结构，专门存放对应对象某个属性的 effect，该结构如下：

![建立对象与 effect 的联系](../../_images/vue-response-system.jpg)

实现代码如下：

```js
const obj2 = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    trigger(target, key)
  }
})

function track(target, key) {
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  effects && effects.forEach(fn => fn())
}
```

## WeakMap 和 Map 的区别

用一段代码来解释：

```js
const map = new Map();
const weakmap = new WeakMap();

(function(){
  const foo = {foo: 1};
  const bar = {bar: 2};

  map.set(foo, 1);
  weakmap.set(bar, 2);
})()  
```

上面定义了一个立即执行的函数，在函数表达式内部定义了两个对象：foo 和 bar，这两个对象分别作为 map 和 weakmap 的 key。当该函数执行完毕后，对于对象 foo 来说，它仍然作为 map 的 key 被引用着，因此垃圾回收器（grabage collector）不会把它从内存中移除，我们仍然可以通过 map.keys 打印出对象 foo。然而对于对象 bar 来说，由于 WeakMap 的 key 是弱引用，它不影响垃圾回收器的工作，所以一旦函数执行完毕，垃圾回收器就会把对象 bar 从内存中移除，并且我们无法获取 weakmap 的 key 值，也就无法通过 weakmap 取得对象 bar（注：实际情况要看浏览器对 WeakMap 的实现）。

简单来说，WeakMap 是对 key 的弱引用，不影响垃圾回收器的工作。一旦 key 被垃圾回收，那么对应键和值就访问不到了。所以 WeakMap 经常用与存储哪些只有当 key 引用对象存在时才有价值的信息

## 分支切换

首先要明确分支切换的定义，如下代码所示：

```js
const data = { ok: true, text: 'hello world' }
const obj = new Proxy(data, { /* ... */ })

effect(function effectFn() {
  document.body.innerText = obj.ok ? obj.text : 'not'
})
```

effectFn 内部存在一个 obj.ok 值，当该值变化时，会执行不同分支的代码，这就是分支切换

但分支切换可能会产生遗留的副作用函数，导致 obj.ok 和 obj.text 对应的依赖都会收集 effectFn

![遗留的副作用函数](../../_images/vue-response-system-2.jpg)

这样即使代码中的 obj.ok 为 false，再次尝试修改 obj.text 的值

```js
obj.text = 'hello vue3'
```

副作用函数 effectFn 仍会执行

解决这个问题的思路很简单，每次副作用函数执行时，我们可以先把它从所有与之关联的依赖集合中删除，如图所示。

![3.4](../../_images/vue-response-system-3.jpg)

在 effect 添加一个依赖集合，并在每次副作用函数执行前清除之前的依赖

```js
// 用一个全局变量存储被注册的副作用函数
let activeEffect
function effect(fn) {
  const effectFn = () => {
    // 调用 cleanup 函数完成清除工作
    cleanup(effectFn)
    activeEffect = effectFn
    fn()
  }
  effectFn.deps = []
  effectFn()
}

function cleanup(effectFn) {
  // 遍历 effectFn.deps 数组
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i]
    // 将 effectFn 从依赖集合中移除
    deps.delete(effectFn)
  }
  // 最后需要重置 effectFn.deps 数组
  effectFn.deps.length = 0
}
```

在 track 中收集依赖

```js
function track(target, key) {
  // 没有 activeEffect，直接 return
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  // 把当前激活的副作用函数添加到依赖集合 deps 中
  deps.add(activeEffect)
  // deps 就是一个与当前副作用函数存在联系的依赖集合
  activeEffect.deps.push(deps)
}
```

但运行上面的代码会导致无限循环，这是在 trigger 函数中的 forEach 导致的

```js{5}
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  effects && effects.forEach(fn => fn())
}
```

由于在 forEach 中的函数调用时清除同时又添加了 effects 的副作用函数，导致无限循环，该行为可以用以下代码描述

```js
const set = new Set([1])

set.forEach(item => {
  set.delete(1)
  set.add(1)
  console.log('遍历中')
})
```

解决方式很简单，创建一个新的 Set 集合用于遍历执行

```js
const set = new Set([1])

const newSet = new Set(set)
newSet.forEach(item => {
  set.delete(1)
  set.add(1)
  console.log('遍历中')
})
```

那么在 trigger 中也是同理

```js{6,7}
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)

  const effectsToRun = new Set(effects)
  effectsToRun.forEach(effectFn => effectFn())
}
```

## 嵌套 effect 与 effect 栈

实际应用中，effect 是可以发生嵌套的，如下

```js
effect(function effectFn1() {
  effect(function effectFn2() { /* ... */ })
  /* ... */
})
```

但我们的 effect 并不支持该功能，使用如下方式，避免嵌套时无法找到对应副作用函数

```js{2,7-8,10-11}
let activeEffect
const effectStack = []

function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
  effectFn.deps = []
  // 执行副作用函数
  effectFn()
}
```

这样就可以保证每次 activeEffect 执行的是最近的 effect 函数

## 避免无限递归循环

我们之前的实现方案，还有一个缺点，在运行以下代码时

```js
const data = { foo: 1 }
const obj = new Proxy(data, { /*...*/ })

effect(() => {
  obj.foo = obj.foo + 1
})
```

上面的代码会导致无限递归，主要原因是 effect 中首先读取 obj.foo 会触发 trank，将当前副作用添加到“桶”中，然后再赋值 obj.foo 会触发 trigger 操作，把副作用函数取出并执行，但当前副作用函数还正在执行，就要再次执行当前副作用函数，就会导致无限递归循环

解决方式很简单，如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行：

```js{8-10}
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)

  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn => effectFn())
}
```

## 调度执行

所谓调度执行，指的是当 trigger 动作触发副作用函数重新执行时，有能力决定副作用函数执行的时机、次数以及方式：

```js
const data = { foo: 1 }
const obj = new Proxy(data, { /* ... */ })

effect(() => {
  console.log(obj.foo)
})

obj.foo++

console.log('结束了')
```

上面代码默认运行结果为

```js
1
2
'结束了'
```

现在假设需求有变，输出顺序需要调整为：

```js
1
'结束了'
2
```

此时就需要实现一个调度器 scheduler 选项，在 effect 中添加 options 选项

```js{10}
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
  effectFn.options = options
  effectFn.deps = []
  effectFn()
}
```

在 trigger 中调用

```js{13-14}
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)

  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}
```

有了这个选项，就可以实现之前的需求了

```js
const data = { foo: 1 }
const obj = new Proxy(data, { /* ... */ })

effect(
  () => {
    console.log(obj.foo)
  },
  {
    scheduler(fn) {
      setTimeout(fn)
    }
  }
)

obj.foo++

console.log('结束了')
```

通过 setTimeout，就可以实现期望的打印顺序了

```js
1
'结束了'
2
```

除了控制运行时机，我们还希望控制它的次数，像 Vue.js 中连续多次修改响应式数据但只会触发一次更新一样

```js
// 定义一个任务队列
const jobQueue = new Set()
const p = Promise.resolve() // 创建一个稍后执行的微任务

// 一个标志代表是否正在刷新队列
let isFlushing = false
function flushJob() {
  if (isFlushing) return
  isFlushing = true
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    isFlushing = false
  })
}


effect(() => {
  console.log(obj.foo)
}, {
  scheduler(fn) {
    jobQueue.add(fn)
    flushJob()
  }
})

obj.foo++
obj.foo++
```

这样我们就实现了期望的输出：

```js
1
3
```

## 计算属性 computed

实现以下功能

```js
const data = { foo: 1, bar: 2 }
const obj = new Proxy(data, { /* ... */ })

const sumRes = computed(() => obj.foo + obj.bar)

console.log(sumRes.value)  // 3
console.log(sumRes.value)  // 3（返回上一次的值）

obj.foo++

console.log(sumRes.value) // 4
```

使用 dirty 实现只有当前值更新后才变更计算结果的功能，用 track 和 trigger 收集并触发当前计算属性对应的副作用函数

```js
function computed(getter) {
  let value
  let dirty = true

  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        dirty = true
        // 当计算属性依赖的响应式数据变化时，手动调用 trigger 函数触发响应
        trigger(obj, 'value')
      }
    }
  })

  const obj = {
    get value() {
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      // 读取 value 时，手动调用 track 函数进行追踪
      track(obj, 'value')
      return value
    }
  }

  return obj
}
```

## watch 的实现原理

watch，其本质就是观测一个响应式数据，当数据发生变化时通知并执行相应的回调函数。

```js
watch(obj, () => {
  console.log('数据变了')
})

obj.foo++
```

实现 watch，支持 getter 函数和响应式对象两种形式，并利用 effect 函数的 lazy 选项实现获取新值旧值，如下：

```js
function watch(source, cb) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }
  // 定义旧值与新值
  let oldValue, newValue
  const effectFn = effect(
    () => getter(),
    {
      lazy: true,
      scheduler() {
        newValue = effectFn()
        cb(newValue, oldValue)
        oldValue = newValue
      }
    }
  )
  oldValue = effectFn()
}
```

## 立即执行的 watch 与回调执行时机

Vue 中的 watch 是支持 immediate 和 flush 选项的，如下

```js
// immediate
watch(obj, () => {
  console.log('变化了')
}, {
  // 回调函数会在 watch 创建时立即执行一次
  immediate: true
})

// flush
watch(obj, () => {
  console.log('变化了')
}, {
  // 回调函数会在 watch 创建时立即执行一次
  flush: 'pre' // 还可以指定为 'post' | 'sync'
})
```

可以通过添加 options 选项实现

```js
function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }

  let oldValue, newValue

  const job = () => {
    newValue = effectFn()
    cb(newValue, oldValue)
    oldValue = newValue
  }

  const effectFn = effect(
    // 执行 getter
    () => getter(),
    {
      lazy: true,
      scheduler: () => {
        // 在调度函数中判断 flush 是否为 'post'，如果是，将其放到微任务队列中执行
        if (options.flush === 'post') {
          const p = Promise.resolve()
          p.then(job)
        } else {
          job()
        }
      }
    }
  )

  if (options.immediate) {
    job()
  } else {
    oldValue = effectFn()
  }
}
```

