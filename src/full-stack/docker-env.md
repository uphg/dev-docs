# Docker 环境搭建

- Windows 必须 10 以上版本，并且开启 WSL，见[设置 WSL 开发环境](https://learn.microsoft.com/zh-cn/windows/wsl/setup/environment)
- 安装 Docker：[Install Docker Desktop on Windows](https://docs.docker.com/desktop/install/windows-install/)
- 在 Docker 中配置 WSL：[WSL 2 上的 Docker 远程容器入门](https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/wsl-containers)
- 安装 VS Code 拓展：[Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- 给[Docker 镜像加速](https://www.runoob.com/docker/docker-mirror-acceleration.html)


## WSL Ubuntu error 0x80004002 报错

以管理员打开 Windows PowerShell，运行以下代码，参考自[WSL Ubuntu error 0x80004002 #2851](https://github.com/microsoft/WSL/issues/2851)

```sh
PS C:\WINDOWS\system32> Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux



Path          : 
Online        : True
RestartNeeded : False
```