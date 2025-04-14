# 环境搭建

本文为 Windows + Android 开发环境搭建

## Android 开发环境

首先确保你的电脑已安装 Node.js v16 或更高的版本，JDK 建议 JDK11 版本。

### 1. 安装 JDK 11

JDK11 下载地址：[Java Development Kit](https://jdk.java.net/java-se-ri/11)

### 2. 安装 Android Studio

下载并安装 Android Studio。在 Android Studio 安装向导中，确保选中以下所有项目旁边的框：

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`

### 3. 配置 SDK

在编辑器欢迎页中选择 **More Actions** 或打开一个项目后选择 **file** → **Settings**。

再选择 **Appearance & Behavior** → **System Settings** → **Android SDK**

在 SDK Manager 中选择 **SDK Platforms**，并勾选右下角 **Show Package Details**。展开 `Android 13 (Tiramisu)` 条目，确保选中以下项目：

- `Android SDK Platform 33`
- `Intel x86 Atom_64 System Image` or `Google APIs Intel x86 Atom System Image`

接下来选择 **SDK Tools**，并勾选 **Show Package Details**。确保选中 `Android SDK Build-Tools 33.0.0`（在 **Android SDK Build-Tools** 条目的 33.0.0 版本）

最后点击 Apply，下载并安装安卓 SDK 及相关构建工具。

### 4. 配置 ANDROID_HOME 环境变量

打开环境变量配置，创建一个指向 `ANDROID_HOME` Android SDK 路径的新用户变量

![ANDROID_HOME](../_images/android_home.png)

SDK 默认安装在以下位置

```
%LOCALAPPDATA%\Android\Sdk
```

### 5. 在 Path 中添加 platform-tools

编辑当前用的 Path 变量，选择新建将 platform-tools 路径添加至列表中

```
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

### 关于 SDK

可以修改 SDK 默认存放路径，在 Android Studio 的 SDK 管理器中选择 Android SDK Location 修改 SDK 路径。

> 最好在修改前将当前路径的 SDK 拷贝至新路径