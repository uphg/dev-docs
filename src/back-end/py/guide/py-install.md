---
title: Python 的安装与开发环境构建（Windows）
date: 2025-03-23T19:20:42+08:00
tags:
  - Python
---


## 安装

**1. 下载安装包**

访问 [Python](https://www.python.org/) 官网，选择最新稳定版本（如 Python 3.x），根据系统位数（32 位或 64 位）下载 `Windows Installer (64-bit/32-bit)` 的.exe文件。

注意：下载 `executable installer` 版本


**2. 右键以管理员身份运行安装程序，勾选以下关键选项**

- Add Python to PATH：自动配置环境变量，方便在命令行中直接运行 Python。
- Install for all users：为所有用户安装（可选，建议勾选）。
- 可选功能：勾选 `pip`（包管理工具）和 `IDLE`（基础编辑器）

**3. 自定义路径**

默认路径为C:\Python3x，若需修改路径，选择“Customize installation”并指定目录。

**4. 完成安装**

安装完成后，勾选 `Disable path length limit` 以禁用系统路径长度限制，避免后续开发问题。


**5. 验证安装**

打开 Git Bash 或命令提示符（`Win+R` 输入 `cmd`），输入以下命令：

```bash
py --version
```

若显示版本号，则安装成功。

## 推荐的 Python IDE

通过在 VSCode (Visual Studio Code)安装 Python 扩展插件：Python、Pylance 可支持智能提示、调试等功能，适合快速开发。

