# Windows 系统初始化

## 禁用 Windows 睡眠缓存

搜索“cmd”。 在搜索结果中，右键单击“命令提示符”，然后选择“以管理员身份运行”。

```bash
# 关闭睡眠缓存
powercfg.exe /hibernate off

# 推出
exit
```

### 参考

- [如何在运行 Windows 的计算机上禁用和重新启用休眠](https://learn.microsoft.com/zh-cn/troubleshoot/windows-client/setup-upgrade-and-drivers/disable-and-re-enable-hibernation)