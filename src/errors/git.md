# Git 报错

## GitHub 提示 `Connection closed by 20.205.243.166 port 22`

1. 删除本地目录，重新生成 keygen，并将其粘贴到 GitHub 中：~/.ssh

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
ssh-keygen -t rsa -C "youremail@example.com"
```

运行 `cat ~/.ssh/id_rsa.pub`，并复制

转到 [GitHub SSH 和 GPG 密钥](https://github.com/settings/keys)，创建一个新的 SSH keys

然后运行如下测试：

```bash
ssh -T git@github.com
```

显示 `Hi username! You've successfully authenticated, but GitHub does not provide shell access.` 就表示没问题了。

如果仍然有问题，则执行步骤 2

2. 创建 `~/.ssh/config`，并添加以下内容：

```bash
Host github.com
    HostName ssh.github.com
    User git
    Port 443
```