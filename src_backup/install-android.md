# Windows 11 安装安卓子系统

部分内容可参考：[适用于 Android™️ 的 Windows 子系统](https://learn.microsoft.com/zh-cn/windows/android/wsa/)

## 开启虚拟化平台

打开设置 → 应用 → 可选功能 → 更多 Windows 功能，在启动或关闭 Windows 功能中找到并勾选开启「Hyper-V」、「虚拟机平台」、「适用于 Linux 的 Windows 子系统」。

## 安装安卓子系统

打开 https://store.rg-adguard.net/ 网站，在 URL（link）中粘贴以下地址

```
https://apps.microsoft.com/detail/9P3395VX91NR?hl=en-us&gl=US
```

粘贴后选择右侧下拉框的 Show，并点击右侧对钩。

然后下拉在下面的列表中选择 `MicrosoftCorporationII.WindowsSubsystemForAndroid_2309.40000.8.0_neutral_~_8wekyb3d8bbwe.msixbundle` 版本可能不一致，但最好选择最新的版本（最下面的版本）


以管理员方式运行 Windows PowerShell，使用 Add-AppxPackage 命令安装该包

```bash
Add-AppxPackage "D:\Lenovo\SoftwarePackage\MicrosoftCorporationII.WindowsSubsystemForAndroid_2309.40000.8.0_neutral_~_8wekyb3d8bbwe.Msixbundle"
```

安装完成之后，Windows 11 的开始菜单中便可以看到一个绿色的图标「适用于 Android™️ 的 Windows 子系统」

## 连接 adb

连接之前需要添加 [platform-tools](https://developer.android.com/studio/releases/platform-tools?hl=zh-cn) ，运行以下命令连接

```bash
adb connect 127.0.0.1:58526
```

如果提示 “由于目标计算机积极拒绝，无法连接。” 可以关闭后重启，或者点击一个应用开启一次 Android 子系统，再重启。

第一次连接会提示"是否允许ADB调试？"，一定要同意

之后就可以使用 `adb install` 安装安卓 apk 了

```bash
adb install "D:\Lenovo\Downloads\Coolapk-13.3.5-2310181-coolapk-app-sign.apk"
```
