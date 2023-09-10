# Mac 开发环境搭建

## 配置 zsh

### 安装 iTerm2

首先安装 iTerm2，它的[官网](https://iterm2.com/) 

### 安装 oh-my-zsh

oh my zsh 是一个 zsh 配置管理，它集合了很多程序员常用的命令快捷配置，安装教程见[官网](https://ohmyz.sh/)

### 修改默认的 shell

安装完成之后，在 /bin 目录下会多出一个 zsh 的文件。

你可以通过以下命令来查看：

```bash
cat /etc/shells
```

注意，`cat` 后面是有个空格的。

macOS 在 Catalina 版本之前都是使用 `dash` 作为终端。

如果你想修改为 `zsh`，可以使用以下命令：

```bash
chsh -s /bin/zsh
```

当然，你后悔了，想改回原来的 `dash`，同样使用上面的 `chsh` 命令就可以。

### 修改主题

zsh 还自带了多种风格的命令行主题，可以参考：[ohmyzsh/wiki/themes](https://github.com/ohmyzsh/ohmyzsh/wiki/themes)。

选好主题后，编辑 `~/.zshrc` 文件，找到 `ZSH_THEME` 字段，修改后可切换主题

这里我使用 vscode 的 code 命令打开

```bash
code ~/.zshrc
```

上面介绍的都是 oh-my-zsh 默认自带了一些默认主题，存放在 `~/.oh-my-zsh/themes` 目录中。

你可以在终端输入 `cd ~/.oh-my-zsh/themes && ls`，查看所有主题文件。

## 颜色风格

使用 [Iterm2-color-schemes](https://iterm2colorschemes.com/) 设置 iterm2 的颜色风格

## 安装 rbenv

安装

```bash
# 安装 rbenv
brew install rbenv

# 初始化 rbenv
rbenv init
```

如果初始化提示 `eval "$(rbenv init - zsh)"`，需要将该命令添加到 `.zshrc`（使用 bash 则添加至 `.bashrc`）

然后查看最近的 ruby 稳定版本

```bash
rbenv install -l
```

安装指定版本 ruby

```bash
rbenv install 3.0.3
```

设置全局 ruby 为指定版本

```bash
rbenv global 3.0.3
```

然后查看当前 ruby 版本

```bash
ruby -v
```


## 安装 RVM（过时）

RVM 是一个 Ruby 的版本管理工具，[官网](https://rvm.io/)

官方的方式是，先安装 GPG keys（用于验证安装包是否为 Ruby 官网）

```bash
gpg --keyserver keyserver.ubuntu.com --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
```

但是国内网络，这个地址经常失效。可以改用以下命令：

```bash
curl -sSL https://rvm.io/mpapis.asc | gpg --import -
curl -sSL https://rvm.io/pkuczynski.asc | gpg --import -
```

上面内容大意为，直接从 rvm 官网将 GPG keys 导入到本地。

然后再运行安装命令

```bash
\curl -sSL https://get.rvm.io | bash -s stable
```

如果需要 rails，可以附带安装

```bash
\curl -sSL https://get.rvm.io | bash -s stable --rails
```

but，安装时可能也会因为网络问题不成功，可以先访问 https://get.rvm.io 将用于安装 RVM 的 bash 脚本存到本地，

例如，如果脚本文件名为 rvm_install_script.sh，依次运行以下命令：

```bash
# 添加执行权限
chmod +x rvm_install_script.sh

# 运行脚本
./rvm_install_script.sh
```

## 参考文章

- [iTerm2 + oh-my-zsh 教程（7000字长文）](https://zhuanlan.zhihu.com/p/290737828)