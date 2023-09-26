# Node.js 报错

## nuxt3 - Failed to download template from registry

报错示例

```bash
ERROR  Failed to download template from registry: fetch failed
```

解决方案

编辑 `C:\Windows\System32\drivers\etc` 文件，添加以下内容

```
185.199.108.133 raw.githubusercontent.com
```

其中，IP参考：[IPADDRESS.COM - raw.githubusercontent.com](https://sites.ipaddress.com/raw.githubusercontent.com/)。问题见：[Failed to download template from registry](https://stackoverflow.com/questions/74283819/error-while-creating-nuxt3-project-failed-to-download-template-from-registry)