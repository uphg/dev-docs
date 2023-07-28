# 非原始值 & 原始值响应方案

## 代理对象

让代理对象支持 for...in 循环，首先添加 ITERATE_KEY 关联，表示当前对象 ITERATE_KEY 属性都是跟 for...in 关联的副作用

```js
const obj = { foo: 1 }
const ITERATE_KEY = Symbol()

const p = new Proxy(obj, {
  ownKeys(target) {
    // 将副作用函数与 ITERATE_KEY 关联
    track(target, ITERATE_KEY)
    return Reflect.ownKeys(target)
  }
})
```

在设置时判断是添加还是修改、在删除时也添加触发

```js
const p = new Proxy(obj, {
  set(target, key, newVal, receiver) {
    const type = Object.prototype.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
    const res = Reflect.set(target, key, newVal, receiver)
    trigger(target, key, type)
    return res
  },

  deleteProperty(target, key) {
   const hadKey = Object.prototype.hasOwnProperty.call(target, key)
   const res = Reflect.deleteProperty(target, key)

   if (res && hadKey) {
     // 只有当被删除的属性是对象自己的属性并且成功删除时，才触发更新
     trigger(target, key, 'DELETE')
   }

   return res
 }
  // 省略其他拦截函数
})

const p = new Proxy(obj, {
  //...
})
```

只有添加和删除时，才触发 ITERATE_KEY 相关副作用执行

```js
function trigger(target, key, type) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)

  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })

  // 当操作类型为 ADD 或 DELETE 时，需要触发与 ITERATE_KEY 相关联的副作用函数重新执行
  if (type === 'ADD' || type === 'DELETE') {
    const iterateEffects = depsMap.get(ITERATE_KEY)
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  }

  effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}
```

## 继承原型时多次触发副作用函数的问题

案例

```js
const obj = {}
const proto = { bar: 1 }
const child = reactive(obj)
const parent = reactive(proto)
// 使用 parent 作为 child 的原型
Object.setPrototypeOf(child, parent)

effect(() => {
  console.log(child.bar) // 1
})
// 修改 child.bar 的值
child.bar = 2 // 会导致副作用函数重新执行两次
```

解决方案：在代理的 get 函数中添加一个 raw 对象用于返回原始对象，在 set 时判断当前 target 是否为原始对象（不是的话就表明该对象是某对象的原型属性）

```js{5-7,19-23}
export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 代理对象可以通过 raw 属性访问原始数据
      if (key === 'raw') {
        return target
      }

      track(target, key)
      return Reflect.get(target, key, receiver)
    },

    set(target, key, newVal, receiver) {
      const oldVal = target[key]
      const type = Object.prototype.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
      const res = Reflect.set(target, key, newVal, receiver)

      // target === receiver.raw 说明 receiver 就是 target 的代理对象
      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          trigger(target, key, type)
        }
      }

      return res
    },
  })
}
```

## 数组的查找方法

案例

```js
const obj = {}
const arr = reactive([obj])

console.log(arr.includes(obj))  // true
```

代码

```js
// 重写 Array 内置方法，使其支持代理对象
const arrayInstrumentations = {}

;['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
  const originMethod = Array.prototype[method]
  arrayInstrumentations[method] = function(...args) {
    // this 是代理对象，先在代理对象中查找，将结果存储到 res 中
    let res = originMethod.apply(this, args)

    if (res === false || res === -1) {
      // res 为 false 说明没找到，通过 this.raw 拿到原始数组，再去其中查找，并更新 res 值
      res = originMethod.apply(this.raw, args)
    }
    // 返回最终结果
    return res
  }
})

//  createReactive 部分实现
function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      if (key === 'raw') {
        return target
      }
      // 如果操作的目标对象是数组，并且 key 存在于 arrayInstrumentations 上，
      // 那么返回定义在 arrayInstrumentations 上的值
      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
        return Reflect.get(arrayInstrumentations, key, receiver)
      }
    }
    // 此处省略其他代码...
  })
}
```

## 原始值响应式方案

实现一个最简单的 ref

```js
function ref(val) {
  const wrapper = {
    value: val
  }
  Object.defineProperty(wrapper, '__v_isRef', { value: true })
  return reactive(wrapper)
}
```

上面的代码使用 Object.defineProperty 在 wrapper 对象上定义一个不可枚举的属性 __v_isRef，并且值为 true

> 此处 enumerable（可枚举）默认为 false，所以不用添加

实现 toRef

```js
function toRef(obj, key) {
  const wrapper = {
    get value() {
      return obj[key]
    },
    set value(val) {
      obj[key] = val
    }
  }
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true
  })
  return wrapper
}
```

实现 toRefs

```js
function toRefs(obj) {
  const ret = {}
  // 使用 for...in 循环遍历对象
  for (const key in obj) {
    // 逐个调用 toRef 完成转换
    ret[key] = toRef(obj, key)
  }
  return ret
}
```

## 自动脱ref

首先在模板语法中不需要 .value 

```js
<p>{{ foo.value }} / {{ bar.value }}</p>
```

用户更希望如下方式

```js
<p>{{ foo }} / {{ bar }}</p>
```

可以实现一个 proxyRefs 方法，表示自动脱钩

> 实际上，在编写 Vue.js 组件时，组件中的 setup 函数所返回的数据会传递给 proxyRefs 函数进行处理

```js
function proxyRefs(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      return value.__v_isRef ? value.value : value
    },
    set(target, key, newValue, receiver) {
      // 通过 target 读取真实值
      const value = target[key]
      // 如果值是 Ref，则设置其对应的 value 属性值
      if (value.__v_isRef) {
        value.value = newValue
        return true
      }
      return Reflect.set(target, key, newValue, receiver)
    }
  })
}
```

并且，在模板中设置属性的值也应该有自动为 ref 设置值的能力，只需要添加对应 set 拦截函数

```js
function proxyRefs(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      return value.__v_isRef ? value.value : value
    },
    set(target, key, newValue, receiver) {
      // 通过 target 读取真实值
      const value = target[key]
      // 如果值是 Ref，则设置其对应的 value 属性值
      if (value.__v_isRef) {
        value.value = newValue
        return true
      }
      return Reflect.set(target, key, newValue, receiver)
    }
  })
}
```

Vue 中 reactive 也具有自动脱 ref 功能

```js
const count = ref(0)
const obj = reactive({ count })

obj.count // 0
```
