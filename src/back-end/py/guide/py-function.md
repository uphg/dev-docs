---
title: Python 函数
date: 2025-03-27T20:07:32+08:00
tags:
  - Python
---
## 内置函数调用

Python内置函数如`abs()`可直接调用，需注意参数**数量**和**类型**：

```py
>>> abs(-20)    # 正确调用
20
>>> abs('a')    # 类型错误
TypeError: bad operand type for abs(): 'str'
>>> abs(1,2)    # 参数数量错误
TypeError: abs() takes 1 argument (2 given)
```

## 类型转换函数

常用类型转换方法：

```py
int('123')       # → 123
float('12.34')   # → 12.34
str(100)         # → '100'
bool('')         # → False
```

## 空函数定义

使用`pass`作为占位符：

```py
def placeholder():
    pass         # 可用于未完成函数体

if age < 18:
    pass         # 保持语法完整性
```

## 多值返回机制

函数通过返回元组实现"多值返回"：

```py
import math

def move(x, y, step, angle=0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny  # 实际返回元组

x, y = move(100, 100, 60, math.pi/6)  # 元组解包
result = move(100, 100, 60)           # 接收元组 (151.96, 70.0)
```

## 默认参数陷阱

**可变默认参数**的常见问题与解决方案：

```py
# 错误实现
def buggy_append(item, lst=[]):
    lst.append(item)
    return lst  # 多次调用会累积元素

# 正确方案
def safe_append(item, lst=None):
    lst = [] if lst is None else lst  # 每次创建新列表
    lst.append(item)
    return lst
```

::: tip 设计原则

优先使用不可变对象（如None, str, 数值类型）作为默认参数

:::

## 递归与尾递归

递归示例：阶乘计算

```py
def factorial(n):
    return 1 if n == 1 else n * factorial(n-1)

# 尾递归优化版（Python实际不支持优化）
def tail_factorial(n, product=1):
    return product if n == 1 else tail_factorial(n-1, n*product)
```

::: warning ⚠️ 注意事项

- 递归深度默认限制约1000层（可通过`sys.setrecursionlimit()`修改）
- Python解释器未实现尾递归优化，深递归仍会栈溢出
- 建议优先使用循环代替深层递归

:::