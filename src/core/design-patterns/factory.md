# 工厂模式

## 简单的工厂模式

为了解决员工信息录入系统中，对于不同岗位职责的区分，可以发明一个工厂模式，如下

```js
function User(name , age, career, work) {
  this.name = name
  this.age = age
  this.career = career 
  this.work = work
}

function Factory(name, age, career) {
  let work
  switch(career) {
    case 'coder':
      work =  ['写代码','写系分', '修Bug'] 
      break
    case 'product manager':
      work = ['订会议室', '写PRD', '催更']
      break
    case 'boss':
      work = ['喝茶', '看报', '见客户']
    case 'xxx':
      // 其它工种的职责分配
      ...
      
  return new User(name, age, career, work)
}
```

## 抽象工厂

```js
class MobilePhoneFactory {
  // 提供操作系统的接口
  createOS(){
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
  // 提供硬件的接口
  createHardWare(){
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
}

// 具体工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory {
  createOS() {
    // 提供安卓系统实例
    return new AndroidOS()
  }
  createHardWare() {
    // 提供高通硬件实例
    return new QualcommHardWare()
  }
}
```

## 单例模式

思考这样一个问题：如何才能保证一个类仅有一个实例？

一般情况下，当我们创建了一个类（本质是构造函数）后，可以通过 new 关键字调用构造函数进而生成任意多的实例对象。像这样：

```js
class SingleDog {
  show() {
    console.log('我是一个单例对象')
  }
}

const s1 = new SingleDog()
const s2 = new SingleDog()

// false
s1 === s2
```

楼上我们先 new 了一个 s1，又 new 了一个 s2，很明显 s1 和 s2 之间没有任何瓜葛，两者是相互独立的对象，各占一块内存空间。而单例模式想要做到的是，**不管我们尝试去创建多少次，它都只给你返回第一次所创建的那唯一的一个实例**。

要做到这一点，就需要构造函数**具备判断自己是否已经创建过一个实例**的能力。我们现在把这段判断逻辑写成一个静态方法(其实也可以直接写入构造函数的函数体里）：

```js
class SingleDog {
  show() {
    console.log('我是一个单例对象')
  }
  static getInstance() {
    // 判断是否已经new过1个实例
    if (!SingleDog.instance) {
        // 若这个唯一的实例不存在，那么先创建它
        SingleDog.instance = new SingleDog()
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return SingleDog.instance
  }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()

// true
s1 === s2
```

除了楼上这种实现方式之外，getInstance的逻辑还可以用**闭包**来实现：

```js
SingleDog.getInstance = (function() {
  // 定义自由变量instance，模拟私有变量
  let instance = null
  return function() {
    // 判断自由变量是否为null
    if(!instance) {
        // 如果为null则new出唯一实例
        instance = new SingleDog()
    }
    return instance
  }
})()
```

可以看出，在 getInstance 方法的判断和拦截下，我们不管调用多少次，SingleDog 都只会给我们返回一个实例，s1 和 s2 现在都指向这个唯一的实例。