# Git 配置

如何生成本机 SSH，并关联远程 Git

## 生成本机 SSH

在命令行运行

```bash
# 清空之前的 ssh 配置（如果有的话）
rm -rf ~/.ssh/*

# 生成 ssh key，运行后按三次回车
ssh-keygen -t rsa -b 4096 -C "你的邮箱"

# 复制你的 ssh
cat ~/.ssh/id_rsa.pub
```

```bash
# 清空之前的 ssh 配置（如果有的话）
rm -rf ~/.ssh/*

# 生成 ssh key，运行后按三次回车
ssh-keygen -t rsa -b 4096 -C "你的邮箱"

# 复制你的 ssh
cat ~/.ssh/id_rsa.pub
```

```bash
# 清空之前的 ssh 配置（如果有的话）
rm -rf ~/.ssh/*

# 生成 ssh key，运行后按三次回车
ssh-keygen -t rsa -b 4096 -C "你的邮箱"

# 复制你的 ssh
cat ~/.ssh/id_rsa.pub
```

```bash
# 清空之前的 ssh 配置（如果有的话）
rm -rf ~/.ssh/*

# 生成 ssh key，运行后按三次回车
ssh-keygen -t rsa -b 4096 -C "你的邮箱"

# 复制你的 ssh
cat ~/.ssh/id_rsa.pub
```

- 打开 [SSH and GPG keys (github.com)](https://github.com/settings/keys)
- 点击 New SSH key 新建一个你的 SSH key
    
    ```jsx
    # 运行
    ssh -T git@github.com
    
    # 看到以下内容表示成功
    Hi Jack! You've successfully authenticated, but GitHub does not provide shell access.
    ```
    

## 添加至 GitHub

## 配置 Git 默认设置

```jsx
git config --global user.name 你的英文名   # 不需要跟GitHub账号保持一致
git config --global user.email 你的邮箱    # 不需要跟GitHub账号保持一致
git config --global push.default matching
git config --global core.quotepath false
git config --global core.editor "vim"
```

## GitHub 提交报错

```tsx
Connection closed by remote host
Connection closed by 39.102.194.95 port 22
```

SSH 提交时报以上错误，可在 `用户/.ssh/` 目录下创建 config 文件，添加以下内容，端口指向 443

```tsx
Host github.com
Hostname ssh.github.com
Port 443
```

## commit 类型

- feat: 新功能、新特性
- fix: 修改 bug
- perf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）
- refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改（例如分号修改）
- test: 测试用例新增、修改
- build: 影响项目构建或依赖项修改
- revert: 恢复上一次提交
- ci: 持续集成相关文件修改
- chore: 其他修改（不在上述类型中的修改）
- release: 发布新版本
- workflow: 工作流相关文件修改