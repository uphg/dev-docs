---
title: Python 面向对象高级编程
date: 2025-04-08T21:33:47+08:00
tags:
  - Python
  - 面向对象
---

数据封装、继承和多态只是面向对象程序设计中最基础的 3 个概念。在 Python 中，面向对象还有很多种高级特性。

## 使用 `__slots__` 限制实例属性

Python的动态特性允许实例的任意属性绑定，但有时需要约束这种灵活性：

### 动态绑定机制
```python
class Student:
    pass

s = Student()
s.name = 'Michael'  # 动态绑定属性
s.age = 25          # 继续添加新属性
```

**方法绑定示例**：

```py
from types import MethodType

def set_age(self, age):
    self.age = age

# 实例级方法绑定（仅对当前实例有效）
s.set_age = MethodType(set_age, s)
s.set_age(25)  # s.age => 25

# 类级方法绑定（所有实例共享）
Student.set_score = lambda self, score: setattr(self, 'score', score)
s2 = Student()
s2.set_score(90)  # s2.score => 90
```

### 属性约束方案

通过 `__slots__` 限定允许绑定的属性：

```py
class Student:
    __slots__ = ('name', 'age')  # 白名单机制

s = Student()
s.score = 99  # AttributeError: 'Student' object has no attribute 'score'
```

继承特性说明：

- 父类`__slots__`对子类无效
- 子类定义`__slots__`时会继承父类限制

## 使用 @property 实现属性管理

### 传统方案的问题

```py
class Student:
    def get_score(self):
        return self._score
    
    def set_score(self, value):
        if not 0 <= value <= 100:
            raise ValueError("Invalid score")
        self._score = value
```

### 装饰器优化方案

```py
class Student:
    @property
    def score(self):
        return self._score
    
    @score.setter
    def score(self, value):
        if not 0 <= value <= 100:
            raise ValueError("Invalid value")
        self._score = value

s = Student()
s.score = 85  # 自动调用setter
```

**只读属性实现**：

```py
@property
def age(self):
    return datetime.now().year - self.birth_year
```

!> **重要提醒**：避免属性名与方法名重复，会导致递归错误

## 多重继承与MixIn模式

### 继承体系优化

传统单继承体系的局限性：

```
Animal -> Mammal/Bird -> MRun/MFly...
```

MixIn解决方案：

```py
class RunnableMixIn:
    def run(self):
        print("Running...")

class FlyableMixIn:
    def fly(self):
        print("Flying...")

class Bat(Mammal, FlyableMixIn):
    pass
```

### 设计规范

- 主继承链使用单一继承
- 附加功能通过MixIn添加
- MixIn类以`MixIn`后缀命名

标准库示例：

```py
class ThreadingUDPServer(UDPServer, ThreadingMixIn):
    pass
```

## 类的定制化

### 常用特殊方法

| 方法                 | 作用           | 示例               |
| :------------------- | :------------- | :----------------- |
| `__str__`/`__repr__` | 对象字符串表示 | print(obj)         |
| `__iter__`           | 迭代器支持     | for x in obj:      |
| `__getitem__`        | 下标访问       | obj[0]             |
| `__getattr__`        | 动态属性处理   | obj.undefined_attr |
| `__call__`           | 实例调用       | obj()              |

**动态链式调用示例**：

```py
class Chain:
    def __init__(self, path=''):
        self._path = path
    
    def __getattr__(self, path):
        return Chain(f"{self._path}/{path}")
    
    def __call__(self, param):
        return Chain(f"{self._path}/{param}")

Chain().user('michael').repos  # /user/michael/repos
```

## 枚举类型

### 传统方案的缺陷

```py
JAN = 1  # 类型不安全，值可变
```

### 标准枚举实现

```py
from enum import Enum, unique

@unique
class Weekday(Enum):
    SUN = 0
    MON = 1

print(Weekday.MON.value)  # 1
print(Weekday(1))         # Weekday.MON
```

## 元编程（Metaclass）

### 类型创建机制

```py
# 动态类创建
Hello = type('Hello', (object,), {'hello': lambda self: print('Hello')})
```

### ORM框架示例

字段定义基类：

```py
class Field:
    def __init__(self, name, col_type):
        self.name = name
        self.col_type = col_type
```

元类实现：

```py
class ModelMetaclass(type):
    def __new__(cls, name, bases, attrs):
        # 生成__mappings__和__table__
        return type.__new__(cls, name, bases, attrs)

class Model(dict, metaclass=ModelMetaclass):
    def save(self):
        # 生成并执行SQL语句
```

使用示例：

```py
class User(Model):
    id = IntegerField('id')
    name = StringField('name')

u = User(id=123, name='Michael')
u.save()
```

> **关键理解**：Metaclass是类的模板，控制类的生成过程，常用于框架开发