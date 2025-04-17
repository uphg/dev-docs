---
title: Python 高级特性
date: 2025-03-29T19:21:32+08:00
tags:
  - Python
---


## 切片

切片（Slice）操作是Python中高效处理序列数据的核心特性，基本语法为`[start:end:step]`，包含start索引元素，不包含end索引元素。

### 基础用法

```py
# 创建测试列表
L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']

# 取前3元素（0,1,2索引）
L[0:3]  # ['Michael', 'Sarah', 'Tracy']
L[:3]   # 简写形式（当start=0时可省略）

# 取索引1-2的元素
L[1:3]  # ['Sarah', 'Tracy']

# 倒数切片（倒数第一个元素索引为-1）
L[-2:]  # ['Bob', 'Jack']
L[-2:-1] # ['Bob']
```

### 进阶应用

```py
# 创建0-99的数列
nums = list(range(100))

nums[:10]    # 前10个元素 [0-9]
nums[-10:]   # 后10个元素 [90-99]
nums[10:20]  # 索引10-19的元素 [10-19]
nums[:10:2]  # 前10个元素，步长为2 [0,2,4,6,8]
nums[::5]    # 全范围步长5 [0,5,10,...,95]
nums[:]      # 快速浅拷贝列表
```

### 其他序列类型

```py
# 元组切片（返回新元组）
(0, 1, 2, 3, 4, 5)[:3]  # (0, 1, 2)

# 字符串切片（返回新字符串）
'ABCDEFG'[:3]   # 'ABC'
'ABCDEFG'[::2]  # 'ACEG'
```

## 迭代

Python通过`for...in`实现统一迭代接口，支持所有可迭代对象（Iterable）。

### 典型用例

```py
# 字典迭代（Python3.7+保留插入顺序）
d = {'a': 1, 'b': 2, 'c': 3}
for k in d: print(k)         # 迭代key
for v in d.values(): print(v) # 迭代value
for k,v in d.items(): print(f"{k}={v}") # 同时迭代

# 字符串迭代
for ch in 'ABC': print(ch)  # 逐字符输出

# 带索引迭代
for i, value in enumerate(['A', 'B', 'C']):
    print(i, value)  # 输出索引和元素
```

### 可迭代性检测

```py
from collections.abc import Iterable

isinstance('abc', Iterable)  # True
isinstance(123, Iterable)    # False
```

## 列表生成式

通过简洁语法快速生成列表，支持条件过滤和多层循环。

### 基础模式

```py
# 简单生成式
[x*x for x in range(1,11)]  # [1,4,9,...,100]

# 条件过滤（仅偶数）
[x*x for x in range(1,11) if x%2==0]  # [4,16,...,100]

# 多重循环（笛卡尔积）
[m+n for m in 'ABC' for n in 'XYZ']  # ['AX','AY',...,'CZ']
```

### 进阶技巧

```py
# 文件目录扫描
import os
[d for d in os.listdir('.')]  # 当前目录条目

# 类型转换（转小写）
[s.lower() for s in ['Hello','World','IBM']]

# 条件表达式（注意语法结构）
[x if x%2==0 else -x for x in range(1,11)]  # [-1,2,...,10]
```

## 生成器

通过惰性计算节省内存空间，使用`yield`关键字定义生成器函数。

### 创建方式

```py
# 生成器表达式
g = (x*x for x in range(10))  # <generator object>

# 函数式生成器
def fib(max):
    a, b = 0, 1
    for _ in range(max):
        yield b
        a, b = b, a+b
```

### 使用方法

```py
# 遍历生成器
for n in fib(6):
    print(n)  # 输出斐波那契数列前6项

# 捕获返回值
g = fib(6)
while True:
    try:
        print(next(g))
    except StopIteration as e:
        print('Return:', e.value)  # 输出'done'
        break
```

## 迭代器

### 核心概念

- **Iterable**：可用`for`遍历的对象（如list/dict/str）
- **Iterator**：可用`next()`访问的对象（如generator）

### 类型转换

```py
from collections.abc import Iterator

isinstance(iter([]), Iterator)  # True
isinstance(iter('abc'), Iterator)  # True
```

### 特性说明

1. Iterator表示数据流，支持惰性计算
2. 所有Iterator都是Iterable，反之不成立
3. 无限流只能通过Iterator表示