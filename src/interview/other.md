# 其他问题整合

## ES6 常用 API 有哪些

见：[ES6 常用 API](../frontend/es6.md)

let、const、箭头函数、Symbol、Set、WeakSet、Map、WeakMap、Proxy、Promise

## 区块链项目

- 区块链是一种分布式的、去中心化的技术和数据结构。
- 主要用于记录交易和数据，保证数据的安全性、透明性、和不可更改性。
- 去中心化主要指的是它没有中央机构或者第三方机构控制。通过分布式网络中的多个节点共同维护和验证数据的唯一性。

## 大屏可视化项目的适配思路

1. 屏幕宽高比通常是 16:9，可以根据这个比例判断当前屏幕是否过宽/过长
2. 如果过长（手机屏幕），那就默认以宽度作为比例适配
3. 如果过宽，那么根据高度 x 16:9 计算出当前宽度来适配
4. 使用 CSS 预处理器语法，根据屏幕宽度计算当前设计图尺寸 rem 对应的 1px。
5. 根据屏幕尺寸变化响应宽度自适应

## React 和 Vue 的区别？

1. 语法和模板：React 使用JSX（JavaScript XML），Vue 使用 template 模板。
2. 生态系统：React 周边生态比较庞大，有多种选择。Vue 有一套官方的周边生态（Vue Router、Vuex、Pinia）。
3. 响应式更新：React 需要手动更新页面数据，Vue 可以通过数据响应式自动更新。
4. 数据可变性：React 推崇数据不可变性，如果要更新数据，每次都要传入一个新的数据对象（可使用 `immer.js` 优化）。
5. 虚拟 DOM：Vue 的虚拟 DOM 算法（双端对比）性能比 React 优化的更好。两者都是通过比较前后两个虚拟 DOM 树的差异来更新视图。但是，如果 Vue 使用 template 模板语法，可以进一步优化性能。

## TypeScript 和 JavaScript 的区别是什么

1. 静态类型检查：TypeScript 引入了静态类型检查，允许开发者在编码过程中指定变量的类型。这样可以在编译时捕获类型错误，提高代码质量和可维护性。JavaScript 是一种动态类型语言，变量的类型在运行时确定。
2. 类型注解和类型推断：TypeScript 允许开发者为变量、函数参数、函数返回值等添加类型注解，明确指定其类型。另外，TypeScript 还能够根据上下文自动推断变量的类型，减少了手动添加类型注解的负担。JavaScript 没有类型注解和类型推断的功能。
3. 类和接口：TypeScript 提供了类和接口的概念，可以使用面向对象的编程方式来组织代码。类可以包含属性、方法和构造函数，而接口定义了对象的结构和行为。JavaScript 也可以使用面向对象的编程风格，但语言本身没有提供类和接口的原生支持。
4. 枚举类型：TypeScript 支持枚举类型，可以定义具名的常量集合。枚举类型在一些场景下能够提高代码的可读性和可维护性。JavaScript 没有原生的枚举类型，通常使用常量或对象来模拟枚举。
5. 编译时类型检查：TypeScript 需要通过编译器将 TypeScript 代码转换为 JavaScript 代码。在这个过程中，编译器会进行类型检查，捕获潜在的类型错误。JavaScript 是一种解释性语言，不需要显式的编译过程。

## 简述微信小程序原理

- 小程序本质就是一个单页面应用，所有的页面渲染和事件处理，都在一个页面内进行，但又可以通过微信客户端调用原生的各种接口。
- 微信基于 XML 开发了一套自己 WXML 语法
- WXSS 拥有 CSS 的大部分特性，但是添加了 rpx 单位

## 微信小程序的优缺点

优点

- 基于微信平台开发，享受微信自带的流量。
- 开发流程较简单，微信提供了云服务和迭代审核。
- 容易上手，基础组件库比较全，基本不需要考虑兼容问题。
- 用户体验良好，无需下载，通过搜索和扫一扫就可以打开
- rpx：假设屏幕宽度为 375，750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

缺点

- 页面大小不能超过1M，不能打开超过5个层级的页面
- 后台调试麻烦，因为API接口必须https请求，且公网地址（也就是说后台代码必须发布到远程服务器上）
- 真机测试，个别安卓和苹果表现迥异，例如安卓的定位功能加载很慢

## 使用 uniapp 开发与原生 Vue 的语法有哪些差异

1. 小程序不支持指令（directive）
2. 不支持 defineComponent、defineAsyncComponent 函数
3. 不支持 nextTick 函数
4. 不支持 keep-alive 和相关的生命周期
5. 不支持 `$el` 获取当前实例元素
6. 不支持 `transition` 、`transition-group` 组件
7. 不支持 Vue3 的 `teleport` 组件

## 用过哪些 CSS 布局

- 最开始学习前端的时候，用的最多的是浮动布局 `float: left;`
- 后来学习了 flex 布局，基本上就一直用

flex 布局的常用属性

```jsx
display: flex; 
flex-direction: column; // flex 容器内项目排列方向
justify-content: center; // 主轴
align-item: center; // 交叉轴
flex-wrap: wrap; // 是否可以换行
flex-grow: 1; // 放大比例
```

grid 布局

```css
.parent {
  display: grid;
  flex: 1;
  grid-template:
    "box1 box4 box4 box7" 1fr
    "box2 box4 box4 box8" 1fr
    "box3 box5 box6 box9" 1fr / 35fr 25fr 25fr 35fr;
}

.child1 {
  grid-area: box1;
}

.child2 {
  grid-area: box2;
}

.child3 {
  grid-area: box2;
}
```

fr 表示比例，上面的 `35fr 25fr 25fr 35fr` 就是他们列的比例，3 个 `1fr` 就是行的比例（每个占 3 分之1）

## **代码审批流程**

1. 定期抽取部分同事代码，由前端项目负责人进行审批。
2. 发现代码的错误问题，在开会时提出（匿名）。

## **搭建项目框架的流程**

1. 选择项目框架（Vue）、脚手架（Vite）。
2. 根据项目需求，选择页面渲染形式（SSG，SPA，SSR）。
3. 参考一些开源的后台管理模板，自己搭建一套后台管理模板。
4. 会封装一个公共的项目模板，放在 git 维护。

## **你是如何升级公司的项目的（JS-> TS、Webpack -> Vite）**

1. 首先项目升级要考虑的是 打包工具升级，如 Webpack 升级到 Vite。
2. 插件的问题，部分插件是 Webpack 插件，迁移到 Vite 需要进行替换。
3. 如果没有对应的插件，我会根据插件复杂度，如果是比较简单的插件，可能我会自己实现一个对应的，替换（例如：SVG 精灵图）。如果是比较复杂的插件，我会先去参考对应的插件的开源代码，进行 Vite 封装。
4. 类型问题，我会先允许写 JavaScript 与 TypeScript 共存的文件，可以通过写 同名的 xxx.d.ts 类型文件解决类型提示的问题。
5. 项目依赖的问题，JavaScript 的项目升级到 TypeScript 会有部分依赖没有 TypeScript 类型，可以通过安装统一类型提示 `@types/xxx` 解决。
6. 如果库实在没有 TS 类型，可以自己写一个全局的 global.d.ts 文件，用来声明库的类型。

**Vite .VS Webpack**

1. Webpack 的缺点：使用 babel-loader 打包，比 Vite 慢很多，第一次启动需要打包所有文件（当然也支持 ES 模块，但是配置起来很麻烦）
2. Vite 的优点是什么？基于 ES 模块的开发服务器，热更新（HMR）支持原生 ES 模块，只更新发生改变的模块。生产环境使用 rollup 和 esbuild 打包。

## 如何封装公司的业务组件的，列举几个例子？

- 公司的表单组件比较多，可以封装一个数据格式转为表单的组件，快捷渲染表单
- 公司的表格使用 Element，默认模板比较多（table-column），可以封装为 options 选项，传入一个数组对象渲染
- 对上传组件进行二次封装，上传的公共参数封装（header 头权限添加），附带参数的上传（formData）

## 你平时通过哪些渠道获取知识源

1. 关注一些编程大佬的 twitter
2. 去 [hackernews](https://news.ycombinator.com/) 看一些热点新闻

## 用过哪些 CSS 预处理器，它们的语法是怎样的？

### Sass

语法使用示例

```scss
// --- 声明变量
$primary-color: #FF0000;
$font-size: 16px;

// --- 使用变量
body {
  color: $primary-color;
  font-size: $font-size;
}

// --- for循环
@for $i from 1 through 5 {
  .item-#{$i} {
    width: 20px * $i;
    height: 20px * $i;
  }
}

// --- 模板字符串插值
$prefix: 'btn';

@for $i from 1 through 3 {
  .#{$prefix}-#{$i} {
    background-color: $primary-color;
    font-size: $font-size + 2px * $i;
  }
}
```

### stylus

```stylus
// 声明变量
primary-color = #FF0000
font-size = 16px

// 使用变量
body
  color: primary-color
  font-size: font-size

// for循环
for i in 1..5
  .item-{i}
    width: 20px * i
    height: 20px * i

// 模板字符串插值
prefix = 'btn'

for i in 1..3
  .#{prefix}-{i}
    background-color: primary-color
    font-size: font-size + 2px * i
```

### Less

```less
// 声明变量
@primary-color: #FF0000;
@font-size: 16px;

// 使用变量
body {
  color: @primary-color;
  font-size: @font-size;
}

// for循环
.for-loop(@i) when (@i > 0) {
  .item-@{i} {
    width: 20px * @i;
    height: 20px * @i;
  }
  .for-loop(@i - 1);
}

.for-loop(5);

// 模板字符串插值
@prefix: 'btn';

.for-loop2(@i) when (@i > 0) {
  .@{prefix}-@{i} {
    background-color: @primary-color;
    font-size: @font-size + 2px * @i;
  }
  .for-loop2(@i - 1);
}

.for-loop2(3);
```