---
title: Python 函数式编程
date: 2025-03-31T21:26:13+08:00
tags:
  - Python
  - 编程范式
  - 函数式编程
---

## 高阶函数

### map函数实践

通过将函数作用于可迭代对象的每个元素实现批量处理：

```python
def square(x):
    return x * x

result = map(square, range(1,10))
print(list(result))  # [1, 4, 9, ..., 81]
```

特性说明：

- `map()`返回迭代器(Iterator)，采用惰性求值策略，通过`list()`触发全面计算
- 对比传统循环方案，函数式写法的优势在于：
  1. 直观体现"应用函数到序列"的语义
  2. 避免中间变量污染作用域
  3. 支持链式操作与其他函数式方法组合

扩展应用：类型转换快捷实现

```python
list(map(str, [1, 2, 3]))  # ['1', '2', '3']
```

### reduce深度解析

累积计算模式实现：

```python
from functools import reduce

def add(x, y):
    return x + y

reduce(add, [1, 3, 5, 7, 9])  # 25
```

计算过程分解：

```python
((((1+3)+5)+7)+9) = 25
```

进阶应用：数值构造器

```python
def merge_digits(x, y):
    return x * 10 + y

reduce(merge_digits, [1, 3, 5, 7, 9])  # 13579
```

实战案例：手写字符串转整型

```python
DIGITS = {'0':0, '1':1, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9}

def str2int(s):
    return reduce(lambda x,y: x*10+y, 
                map(lambda c: DIGITS[c], s))
                
str2int('13579')  # 13579
```

## 闭包与状态保持

### 变量绑定问题解决方案

```python
def create_counter():
    counters = []
    for i in range(3):
        def capturer(x):  # 通过参数捕获瞬时状态
            return lambda: x*x
        counters.append(capturer(i))
    return counters

c1, c2, c3 = create_counter()
c1(), c2(), c3()  # (0, 1, 4)
```

### nonlocal声明机制

```python
def accumulator():
    total = 0
    def add(n):
        nonlocal total  # 声明非局部变量
        total += n
        return total
    return add

adder = accumulator()
adder(5)  # 5
adder(3)  # 8
```

注意事项：

- 当内部函数需要修改外部作用域变量时，必须使用nonlocal声明
- 未声明时尝试修改会触发UnboundLocalError异常

## 匿名函数实践

### lambda表达式精髓

```python
list(map(lambda x: x**2, [1,2,3]))  # [1,4,9]
```

特性说明：

- 单表达式限制：不能包含流程控制等复杂逻辑
- 命名匿名化：适用于一次性使用场景
- 典型应用场景：
  - 作为参数传递给高阶函数
  - 快速定义回调函数
  - 构建闭包工厂

## 装饰器模式深入

### 基础装饰器模板

```python
import functools

def logger(func):
    @functools.wraps(func)  # 保持元信息
    def wrapper(*args, **kwargs):
        print(f'Calling {func.__name__}')
        return func(*args, **kwargs)
    return wrapper

@logger
def get_date():
    return '2024-06-01'
```

### 参数化装饰器实现

```python
def tag_decorator(tag_name):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            return f"<{tag_name}>{func(*args, **kwargs)}</{tag_name}>"
        return wrapper
    return decorator

@tag_decorator('div')
def get_text():
    return 'Hello World'

get_text()  # <div>Hello World</div>
```

执行机制解析：

```python
@decorator(args)
def func(): ...
# 等价于
func = decorator(args)(func)
```

## 偏函数应用

### 参数冻结技术

```python
from functools import partial

int2 = partial(int, base=2)
int2('1010')  # 10

# 等效实现
def int2(x):
    return int(x, base=2)
```

### 动态参数处理

```python
max_with_floor = partial(max, 10)  # 预置最低阈值
max_with_floor(5, 3)  # 10 (等价于max(10,5,3))
max_with_floor(15, 20)  # 20
```

参数绑定规则：

- 位置参数：追加到左参数列
- 关键字参数：合并到字典参数
- 调用时可覆盖预置参数