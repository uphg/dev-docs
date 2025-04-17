---
title: Python 基础
date: 2025-03-25T19:15:47+08:00
tags:
  - Python
---

# Python 基础

## 数据类型

### 整数

```py
10_000_000_000    # 支持千分位分隔符（Python 3.6+）
0xa1b2_c3d4       # 十六进制表示（Python 3.6+）
```

### 浮点数

```py
1.23e9            # 1.23 × 10⁹（科学计数法）
1.2e-5            # 0.000012
```

### 字符串

- 转义字符：`\n`（换行）、`\t`（制表符）、`\\`（反斜杠）
- 原始字符串：`r'...'` 禁止转义
- 多行字符串：`'''...'''` 或 `"""..."""

```py
print(r'路径：C:\new_folder')  # 输出：路径：C:\new_folder
print('''第一行
第二行''')
```

### 布尔值

```py
True and False     # → False（与运算）
True or False      # → True （或运算）
not True           # → False（非运算）
```

### 空值

```py
None               # 表示空值（不同于 0 或空字符串）
```

### 变量

- 命名规则：字母/下划线开头，可包含字母、数字、下划线
- 动态类型：变量可随时重新赋值不同数据类型

```py
user_name = "Alice"
count = 100
```

### 常量

```py
MAX_CONNECTIONS = 100  # 约定全大写表示常量（实际仍可修改）
```

------

## 列表（list）与元组（tuple）

### 列表（可变序列）

```py
colors = ['red', 'green']
colors.append('blue')     # 追加元素
colors.insert(1, 'pink')  # 插入到索引1位置
colors.pop()              # 移除末尾元素 → 'blue'
colors.pop(0)             # 移除索引0元素 → 'red'
```

### 元组（不可变序列）

```py
dimensions = (1920, 1080)     # 常规定义
single_item = (42,)           # 单元素元组（必须有逗号）
mixed_tuple = (1, [2, 3])     # 可包含可变元素（列表可修改）
```

------

## 流程控制

### 条件判断

```py
# 多级条件判断
age = 20
if age >= 18:
    print("成年")
elif age >= 13:
    print("青少年")
else:
    print("儿童")
```

### 模式匹配（Python 3.10+）

```py
# 简单匹配
status_code = 404
match status_code:
    case 200:
        print("成功")
    case 404:
        print("未找到")
    case _:
        print("未知状态")

# 复杂匹配
args = ['gcc', 'file1.c', 'file2.c']
match args:
    case ['gcc']:
        print("缺少源文件")
    case ['gcc', file1, *files]:
        print(f"编译：{file1} 和 {len(files)} 个文件")
    case ['clean']:
        print("清理项目")
```

------

## 循环结构

### for 循环

```py
# 遍历序列
total = 0
for num in [1, 2, 3, 4, 5]:
    total += num
```

### while 循环

```py
# 条件循环
countdown = 5
while countdown > 0:
    print(countdown)
    countdown -= 1
print("发射！")
```

## 字典（dict）与集合（set）

### 字典（dict）

**键值对存储结构**，基于哈希表实现，具有 O(1) 时间复杂度的高效查找

#### 创建与访问

```
grades = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
print(grades['Michael'])  # → 95
```

#### 安全访问方法

```
# 检查键是否存在
if 'Thomas' in grades:
    print(grades['Thomas'])

# get() 方法避免 KeyError
print(grades.get('Thomas'))     # → None（无输出）
print(grades.get('Thomas', -1)) # → -1
```

#### 删除元素

```
removed_value = grades.pop('Bob')  # → 75
print(grades)  # → {'Michael': 95, 'Tracy': 85}
```

#### 特性说明

1. **键唯一性**：每个键只能出现一次
2. **键不可变性**：键必须是不可变类型（字符串/数字/元组）
3. **有序性**：Python 3.7+ 保持插入顺序
4. **动态扩展**：可随时添加新键值对

------

### 集合（set）

**无序不重复元素集**，常用于去重和集合运算

#### 创建与修改

```
# 两种创建方式
s1 = {1, 2, 3}
s2 = set([1, 2, 2, 3])  # → {1, 2, 3}

# 元素操作
s1.add(4)    # {1,2,3,4}
s1.remove(4) # {1,2,3}
```

#### 集合运算

```
a = {1, 2, 3}
b = {2, 3, 4}

print(a & b)  # 交集 → {2, 3}
print(a | b)  # 并集 → {1, 2, 3, 4}
print(a - b)  # 差集 → {1}
```

#### 重要特性

1. **元素唯一性**：自动去重
2. **元素不可变性**：不能包含可变对象（如列表）
3. **无序性**：遍历顺序不等于创建顺序
4. **高效查询**：基于哈希表实现成员检测

------

### 对比表格

| 特性             | dict               | set              |
| :--------------- | :----------------- | :--------------- |
| **存储结构**     | 键值对             | 唯一元素         |
| **元素要求**     | 键不可变，值任意   | 元素必须不可变   |
| **查询速度**     | O(1) 键查询        | O(1) 成员检测    |
| **典型应用**     | 快速映射关系       | 去重、集合运算   |
| **内存占用**     | 较高（存储键值对） | 较低（仅存储键） |
| **插入顺序保持** | Python 3.7+ 支持   | 不保持           |

------

### 使用注意

1. **可变对象检测**：以下操作会报错

   ```
   # 无效操作示例
   invalid_set = {[1, 2], 3}        # TypeError
   invalid_dict_key = {['name']: 1} # TypeError
   ```

2. **替代方案**：需存储可变对象时，可使用冻结集合

   ```
   valid_set = {frozenset([1,2]), tuple([3,4])}
   ```

3. **性能选择**：

   - 需要键值关联 → 选择字典
   - 只需记录存在性 → 选择集合