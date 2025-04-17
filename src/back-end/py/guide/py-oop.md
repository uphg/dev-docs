---
title: Python 面向对象编程
date: 2025-04-08T20:55:15+08:00
tags:
  - Python
  - 面向对象
---

## 核心概念

面向对象编程（OOP）以**对象**为程序基本单元，每个对象包含**数据属性**和操作数据的**方法**。与面向过程编程的线性执行不同，OOP通过对象间的消息传递实现程序逻辑。

### 编程范式对比

- **面向过程**：程序由函数串行组成，通过分解函数降低复杂度

  ```py
  # 学生成绩处理（面向过程）
  std1 = {'name': 'Michael', 'score': 98}
  
  def print_score(student):
      print(f"{student['name']}: {student['score']}")
  ```

- **面向对象**：程序由对象网络构成，对象自主处理接收的消息

  ```py
  # 学生类定义（面向对象）
  class Student:
      def __init__(self, name, score):
          self.name = name
          self.score = score
      
      def print_score(self):
          print(f"{self.name}: {self.score}")
  
  # 对象实例化
  lisa = Student('Lisa', 95)
  lisa.print_score()  # Lisa: 95
  ```

## 类与实例

### 类定义规范

- 类名采用大驼峰命名法

- 继承自`object`（Python3可省略）

- 初始化方法`__init__`规范：

  ```py
  class MyClass:
      def __init__(self, param1, param2):
          self.param1 = param1  # 实例属性
          self._protected = 42   # 保护属性（约定）
          self.__private = param2  # 私有属性（名称修饰）
  ```

### 实例操作

```py
# 实例化与属性访问
obj = MyClass('a', 'b')
print(obj.param1)      # 正常访问
print(obj._protected)  # 仍可访问（约定保护）
# print(obj.__private)  # 报错（实际存储为_MyClass__private）
```

## 封装机制

### 访问控制实现

| 命名方式 | 可见性       | 示例           |
| :------- | :----------- | :------------- |
| 无前缀   | 公开         | `self.value`   |
| 单下划线 | 保护（约定） | `self._value`  |
| 双下划线 | 私有（强制） | `self.__value` |

### 属性管理最佳实践

```py
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance
    
    # Getter方法
    @property
    def balance(self):
        return self.__balance
    
    # Setter方法
    @balance.setter
    def balance(self, value):
        if value >= 0:
            self.__balance = value
        else:
            raise ValueError("余额不能为负")

# 使用属性装饰器
account = BankAccount(1000)
account.balance = 1500  # 通过setter验证
print(account.balance)  # 1500
```

## 继承与多态

### 继承体系实现

```py
class Animal:
    def sound(self):
        print("动物发出声音")

class Dog(Animal):
    def sound(self):  # 方法重写
        print("汪汪汪！")

class Cat(Animal):
    def sound(self):
        print("喵喵喵~")

def make_sound(animal: Animal):
    animal.sound()  # 多态调用

# 多态演示
make_sound(Dog())  # 汪汪汪！
make_sound(Cat())  # 喵喵喵~
```

同一个 `make_sound()` 函数，传入不同的子类对象，会调用不同的 `sound()` 方法，这就是多态

### 多态的核心特点：

1. **继承关系**：子类继承父类（`Dog` 和 `Cat` 继承 `Animal`）。
2. **方法重写**：子类重写父类的方法（`sound()`）。
3. **向上转型（Upcasting）**：父类引用指向子类对象（`Animal animal = Dog()`）。
4. **动态绑定（Dynamic Binding）**：运行时决定调用哪个方法（Python 天然支持，Java/C++ 通过虚函数实现）。

### 多态的好处：

- **代码复用**：`make_sound()` 可以处理任何 `Animal` 的子类，无需为每个子类写单独的函数。
- **扩展性强**：新增 `Bird` 类时，只需继承 `Animal` 并实现 `sound()`，`make_sound()` 无需修改。
- **接口统一**：所有动物都通过 `sound()` 发声，调用者无需关心具体类型。

### 类型检查方法

```py
obj = Dog()
print(isinstance(obj, Animal))  # True（继承判断）
print(issubclass(Dog, Animal))  # True（子类判断）
```

## 对象信息获取

### 常用工具方法

1. **类型判断**：

   ```py
   print(type('text') is str)  # True
   ```

2. **属性检查**：

   ```py
   hasattr(obj, 'attribute')  # 属性存在性检查
   getattr(obj, 'value', default)  # 安全获取属性
   ```

3. **方法列表**：

   ```py
   [method for item in dir(obj) if not item.startswith('__')]
   ```

## 属性管理

### 类属性与实例属性

```py
class Configuration:
    API_ENDPOINT = 'https://api.example.com'  # 类属性（常量）
    
    def __init__(self, timeout):
        self.timeout = timeout  # 实例属性

# 访问方式
print(Configuration.API_ENDPOINT)  # 类直接访问
config = Configuration(10)
print(config.API_ENDPOINT)  # 实例访问类属性
```

### 属性访问优先级

1. 实例属性
2. 类属性
3. 父类属性

> **最佳实践**：避免实例属性与类属性同名，需要修改类属性时应通过`类名.属性`访问

## 高级特性

### 鸭子类型应用

```py
class FakeFile:
    def read(self):
        return "模拟文件内容"

def read_content(file_like):
    if hasattr(file_like, 'read'):
        return file_like.read()
    raise TypeError("需要文件类型对象")

# 使用示例
print(read_content(open('real.txt')))  # 真实文件
print(read_content(FakeFile()))        # 鸭子类型对象
```

### 特殊方法定制

```py
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(2, 3)
v2 = Vector(1, 4)
print(v1 + v2)  # Vector(3, 7)
```

## 设计原则

1. **SOLID原则**

   - 单一职责原则（SRP）
   - 开放封闭原则（OCP）
   - 里氏替换原则（LSP）
   - 接口隔离原则（ISP）
   - 依赖反转原则（DIP）

2. **组合优先继承**

   ```py
   class Engine:
       def start(self):
           print("引擎启动")
   
   class Car:
       def __init__(self):
           self.engine = Engine()  # 组合代替继承
       
       def start(self):
           self.engine.start()
   ```