# DOM 押题

## 三种监听事件的方式

1. 通过 HTML 属性

```js
<button class="button" onclick="clickButton()">点我</button>
<script>
  function clickButton() { console.log('我被点了') }
</script>
```

2. 通过元素节点对象赋值

```js
const button = document.querySelector('.button')

button.onclick = function (event) {
  console.log('我被点了');
}
```

3. 通过 `EventTarget.addEventListener()` （推荐）

```js
const button = document.querySelector('.button')

button.addEventListener('click', () => {
  console.log('我被点了')
}) 
```

事件捕获/冒泡，示例项目：https://github.com/uphg/dom-event-demo

## 事件冒泡

微软公司提出使用**事件冒泡**来处理事件流，事件冒泡表示事件会从最内层元素开始触发，一直向外传播，具体顺序为：`div -> body -> html -> document`

## 事件捕获

网景公司提出另一种名为**事件捕获**的概念，与事件冒泡相反，事件会从最外层开始触发，直到最内侧的元素，顺序为：`document -> html -> body -> div`

## W3C 的标准

W3C 标准采用了折中的方法，制定了事件传播的统一标准：**先捕获再冒泡**

## 阻止事件冒泡

使用 `event.stopPropagation()` 可以阻止事件冒泡

```js
p.addEventListener('click', function (event) {
  event.stopPropagation()
  // 不会执行
  console.log('我被点了')
})
```

## 取消事件

`event.stopImmediatePropagation()` 可以取消后续的事件监听

## 实现事件委托

- 根据事件冒泡的原理，在获取当前触发事件的元素（`e.target`）。
- 利用 while 循环 + matches 方法判断当前元素是否为委托元素的选择器。如果不是，就获取它的 parentNode 节点，不断向上找，直到找到被委托的元素，或被监听的元素。

```js
function on(element, eventName, selector, handler) {
  element.addEventListener(eventName, (e) => {
    let el = e.target
    while (!el?.matches(selector)) {
      if (element === el) {
        el = null
        break
      }
      el = el?.parentNode
    }
    el && handler.call(el, e, el)
  })
  return element
}
```

## 关于 addEventListener

`target.addEventListener(type, listener, useCapture)` 方法的第三个参数，就是配置事件是在捕获阶段处理，还是在冒泡阶段处理。该值默认为 `false`，表示在事件冒泡阶段调用处理函数。为 `true` 则表示在事件捕获阶段调用处理函数。
