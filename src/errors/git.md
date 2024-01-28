# Git 报错

## GitHub 提示 `Connection closed by 20.205.243.166 port 22`

### 步骤 1

测试是否可以通过 HTTPS 端口进行 SSH

```bash
$ ssh -T -p 443 git@ssh.github.com
> Hi USERNAME! You've successfully authenticated, but GitHub does not
> provide shell access.
```

显示 `Hi username! You've successfully authenticated, but GitHub does not provide shell access.` 就表示没问题了。

如果仍然有问题，则执行步骤 2。

### 步骤 2

强制与 GitHub.com 的任何连接通过该服务器和端口运行，创建 `~/.ssh/config`，并添加以下内容：

```bash
Host github.com
    Hostname ssh.github.com
    Port 443
    User git
```

然后再次连接 GitHub.com 来测试配置是否生效：

```bash
$ ssh -T git@github.com
> Hi USERNAME! You've successfully authenticated, but GitHub does not
> provide shell access.
```
