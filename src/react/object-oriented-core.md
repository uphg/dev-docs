# 面向对象核心

## 面向对象的历史

面向对象是一种编程范式（也叫方法论、思维方法等）。
目前大部分语言都是支持多种范式的，包括面向对象这种范式。

以下内容参考自：[wikipedia](https://en.wikipedia.org/wiki/Object-oriented_programming#History)

- 1950
  objects 和 oriented 等技术名词在 MIT 里出现，概念尚未明确。
  ALGOL 语言里有面向对象的一些早期形态，如消息、方法、成员函数等。
- 1960
  Simula 语言初步实现了面向对象思想，一些重要的概念得以实现，如类、对象、继承、动态绑定等。
  不过 Simula 没有实现 private 和 public 等访问修饰器。
- 1970
  Smalltalk 出现。Smalltalk 主要是受 Simula 启发。
  Lisp 又受 Smalltalk 的影响，也开始接纳面向对象思想，最终导致了 Flavors（首个引入 mixin 的语言）、CommonLoops（支持多继承），而这两门语言有导致了[『Common Lisp 对象系统』](https://acl.readthedocs.io/en/latest/zhCN/ch11-cn.html)的出现。
- 1980
  1981 年 Adele Goldberg 撰文将 Smalltalk 和面向对象编程介绍给更多的人。
  1986 年第一届『面向对象编程峰会』举办，吸引了一千多人参加。
  期间，C++ 和 Objective-C 受此影响诞生。
- 1990
  面向对象思想被广泛接纳，甚至成为主流编程思想，尤其是用户界面编程领域。
  事件驱动编程在它的带领下也开始变得流行。
  一些原本不支持面向对象的语言也开始引入面向对象（BASIC、Pascal），并引发了一些问题。
  一些从一开始就支持面向对象，也支持以前的过程式编程的语言被发明出来，如 Python 和 Ruby。
  最重要的商业化面向对象语言是 Sun 公司开发的 Java 语言，以及微软公司开发的 C# 和 VB.NET。

从这些历史可以看出，面向对象是一种思潮，并没有明确的定义，所以追问面向对象的定义可能得不到结果（实际上函数式编程也是类似的）。

## 面向对象语言的分类

- 纯面向对象语言：一切都是对象，包括数字、字符串也是对象，如 Python、Ruby、Scala、Smalltalk
- 完全支持面向对象，也支持过程式，如 Java、C++、C#
- 本来不支持面向对象，后来加上的，如 PHP、Perl
- 看起来像面向对象，但没有完全使用面向对象（比如基于原型来模拟面向对象）：JavaScript、Lua
- 其他还有很多种。

## 面向对象与函数式的关系

一个取钱的程序

```js
let makeAccount = money => {
  let take = (n) => {
    money = money - n
    return money
  }
  let save = (n) => {
    money = money + n
    return money
  }
  let dispatch = (m) => {
    return (
    m === 'take' ? take :
    m === 'save' ? save :
    new Error('unknown request'))
  }
  return dispatch
}
```

使用 makeAccount 创造两个 account 对象

```js
let account1 = makeAccount(100)
account1('take')(70) // 30
account1('save')(50) // 80
```

## 赋值的利弊

> 将赋值引进程序设计语言，将会使我们陷入许多困难概念的丛林中。

但是它就没有好处吗？

> 与所有状态都必须现实地操作和传递额外参数的方式相比，通过引进赋值以及将状态隐藏在局部变量中的技术，能让我们以一种更**模块化**的方式构造系统。

但是这本书马上又加了一句话：

> 可惜的是，我们很快就会发现，事情并不是这么简单。

接下来就进入了「赋值的代价」小节：

> 赋值操作使我们可以去模拟带有局部状态的对象，但是，这是有代价的，它是我们的程序设计语言不能再用代换模型来解释了。进一步说，任何具有「漂亮」数学性质的简单模型，都不可能继续适合作为处理对象和赋值的框架了。
> 只要我们不使用赋值，一个「过程」接收同样的参数一定会产生同样的结果，因此就可以认为这个「过程」是在计算「数学函数」。
> 不用任何赋值的程序设计称为函数式程序设计。

## 赋值的本质

如果没有赋值，money 只不过就是一个值的名字；
如果有了赋值，money 就是一个容器，可以保存不同的值。

这带来的问题很多。广泛采用赋值的程序设计叫做『命令式/指令式』程序设计。

命令式程序在遇到『并发』『克隆』等问题时经常很令人头疼。

举例说明一下。

## 函数式编程的特点

1. 数学！（公理化和可证明）
2. 更加强调程序执行的结果而非执行的过程
3. 函数是一等公民（函数可以作为参数），高阶函数
4. 纯函数，拒绝副作用
5. 不可变数据
6. 数据即代码，代码即数据（本课没有涉及）
7. 引用透明（本课没有涉及）

## 纯函数

纯函数是指具有以下两个主要特征的函数：

- 相同的输入总是产生相同的输出：纯函数的输出仅由其输入决定，不受外部状态的影响。对于给定的输入，纯函数总是返回相同的输出，不会产生任何副作用。
- 没有副作用：纯函数不会修改函数外部的状态或进行与计算结果无关的操作。它不会改变传递给它的参数，也不会修改全局变量或执行输入/输出操作。

纯函数的这些特点使得它们更加可预测和易于理解。由于纯函数的结果仅由输入决定，因此在并发和并行环境中，纯函数更容易进行线程安全的操作。