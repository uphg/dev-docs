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

## npm 运行 Node 报错 `How to resolve "Error: error:0308010C:digital envelope routines::unsupported" Nodejs 18 error [duplicate]`

通过提供以下环境参数来修复它：

```js
export NODE_OPTIONS=--openssl-legacy-provider
```

根据我所读到的内容，这个节点选项也可以在package.json中设置，如下：

```json
"scripts": {
  "ng": "set NODE_OPTIONS=--openssl-legacy-provider && ng",
  "start": "set NODE_OPTIONS=--openssl-legacy-provider && ng serve",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e"
},
```

现在我可以毫无问题地再次运行 `npm start` 。

这似乎比将 nodejs 降级到 v16 要容易一些。

参考自：[How to resolve "Error: error:0308010C:digital...](https://stackoverflow.com/questions/74548318/how-to-resolve-error-error0308010cdigital-envelope-routinesunsupported-no)
