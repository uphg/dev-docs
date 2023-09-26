# HTML + CSS

## 如何理解 HTML 中的语义化标签？

答题步骤

1. 是什么：语义化标签是一种写 HTML 标签的方式。
2. 怎么做：实现方法是遇到标题就用 h1 到 h6，遇到段落就用 p，遇到文章就用 article，主要内容用 main，边栏 aside，导航用 nav（找到每个标签英文对应的中文含义）
3. 解决了什么问题：明确 HTML 的书写规范
4. 优点是：一、适合搜索引擎检索；二、适合人类阅读，利于团队维护。
5. 缺点是：没有。

> 总结：是什么、怎么做、解决了什么问题、优点是、缺点是、怎么解决缺点

## HTML 5 有哪些新标签

记忆型题目，记住不要提自己不熟悉的标签，因为很可能会变成下一道题

- 文章：header、main、footer、nav、section、article
- 多媒体：video、audio、svg、canvas
- 表单：`type=email` 、`type=tel`
- MDN 把所有标签都列在[这里](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)了

## Canvas 和 SVG 的区别是什么

答题思路：先说一、再说二、再说相同点、最后说不同点。

1. Canvas 主要是用像素点来绘制 2D 图形。
2. SVG 主要是用标签来绘制不规则矢量图（基于 [XML](https://developer.mozilla.org/zh-CN/docs/Web/XML) 标记语言，用于描述二维的[矢量图形](https://zh.wikipedia.org/wiki/%E7%9F%A2%E9%87%8F%E5%9B%BE%E5%BD%A2)）。
3. **相同点**
    1. 都是主要用来画 2D 图形（SVG 可以绘制简单的 3D 图形，Canvas 可以通过库实现 3D 图形）。
4. **不同点** 
    1. Canvas 画的是**位图**，SVG 画的是矢量图。
    2. SVG 节点过多时**渲染慢**，Canvas 性能更好一点，但写起来更复杂。
    3. SVG 支持分层和事件，Canvas 不支持，但可以用库实现。

基本上靠看别人的总结和平时自己写博客总结，否则答不好。

> 得分点：位图 v.s. 矢量图、渲染性能、是否支持分层和事件…

## BFC 是什么？

**是什么：**

避免直接回答，把 BFC 翻译为中文「块级格式化上下文」即可（千万不要详细解释）

**怎么做：**

背诵 BFC 触发条件，虽然 [MDN 的这篇文章](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) 列举了所有触发条件，但本押题告诉你，只用背这几个就行了

- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块 inline block 元素
- overflow 值不为 visible 的块元素
- 弹性元素（`[display](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)` 值为 `flex` 或 `inline-flex` 元素的直接子元素）
- 网格元素（`[display](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)` 值为 `grid` 或 `inline-grid` 元素的直接子元素）

**解决了什么问题**

1. 清除浮动
2. 防止 margin 合并
3. 某些古老的布局方式会用到（已过时）

优点：无。

缺点：有副作用。

怎么解决缺点：使用最新的 `display: flow-root` 来触发 BFC 就没有副作用了，但是很多人不知道。

## 如何实现垂直居中

建议自己写博客总结一下，面试时直接给面试官看博客链接，参考：[七种方式实现垂直居中 · 语雀](https://www.yuque.com/docs/share/708bd899-0c46-47ea-a94c-d7a189c0f7dc)

1. 使用 table 自带功能

```css
.parent {
  height: 600px;
}
```

```html
<table class="parent">
  <tr>
    <td class="child">一串文字</td>
  </tr>
</table>
```

2. 使用 100% 高度的 afrer、before 加上 inline block

```css
.parent {
  height: 600px;
  text-align: center;
}

.child, .parent:before, .parent:after {
  display: inline-block;
  vertical-align: middle;
}

.child {
  width: 300px;
}

.parent:before, .parent:after {
  content:'';
  height: 100%;
}
```

```html
<div class="parent">
  <div class="child">一串文字</div>
</div>
```

3. `margin-top: -50%`

```css
.parent {
  height: 600px;
  position: relative;
}
.child {
  width: 300px;
  height: 100px;
  margin-left: -150px;
  margin-top: -50px;
  position: absolute;
  top: 50%;
  left: 50%;
}
```

```html
<div class="parent">
  <div class="child">一串文字</div>
</div>
```

4. `margin-top: -50%` + `transform: translate(-50%, -50%);`

```css
.parent {
  height: 600px;
  position: relative;
}
.child {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
```

```html
<div class="parent">
  <div class="child">一串文字</div>
</div>
```

5. `position: absolute` + `margin: auto`

```css
.parent {
  height: 600px;
  position: relative;
}
.child {
  width: 300px;
  height: 200px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
```

```html
<div class="parent">
  <div class="child">一串文字</div>
</div>
```

6. 使用 `display: flex`

```css
.parent {
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

```html
<div class="parent">
  <div class="child">一串文字</div>
</div>
```

> 得分点：flex 方案、grid 方案、transform 方案

## CSS 选择器优先级如何确定

建议自己写博客总结，面试直接甩链接

这里有 CSS 2.1 规则文档的权威算法：（但并不适用于 CSS 3）

[属性赋值，层叠（Cascading）和继承](http://www.ayqy.net/doc/css2-1/cascade.html#specificity)

如果记不住，可以记下这三句话：

1. 选择器越具体，其优先级越高
2. 相同优先级，出现在后面的，覆盖前面的
3. 属性后面加 `!important` 的优先级最高，但是要少用

## 如何清除浮动？

方法一，给父元素加上 `.clearfix`

```css
.clearfix:after {
  content: '';
  display: block; /* *或者 table* */
  clear: both;
}
.clearfix {
  zoom: 1; /* IE 兼容 */
}
```

方法二，给父元素加上 overflow:hidden。

## 两种盒模型（box-sizing）的区别？

答题思路：先说一，再说二，再说相同点，最后说不同点。

第一种盒模型是 content-box，即 width 指定的是 content 区域宽度，而不是实际宽度，公式为：

```css
width = 元素内容宽度（不包含 padding 和 border）
```

第二种盒模型是 border-box，即 width 指定的是左右边框外侧的距离，公式为

```css
width = 元素内容宽度 + padding + border
```

> 相同点是都是用来指定宽度的，不同点是 border-box 更好用
