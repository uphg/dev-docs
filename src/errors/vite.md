# Vite 错误

## `@unocss/transformer-attributify-jsx` 插件失效

首先安装 babel 版本

```bash
- import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
+ import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx-babel'
```
然后可能需要安装 `@babel/preset-typescript`

```bash
pnpm add -D @babel/preset-typescript
```

## vue-tsc `Cannot find module 'src' or its corresponding type declarations`

如果你在使用 Vite 打包时提示一个类似这样的报错

```sh
node_modules/xxx/xxx/xxx.d.ts:5:28 - error TS2307: Cannot find module 'src' or its corresponding type declarations
```

多半是 `vue-tsc` 没有跳过 `node_modules` 包的检查，可以添加 `--skipLibCheck` 命令跳过，如下

```json
// package.json
{
  "script": {
    "build": "vue-tsc --noEmit --skipLibCheck && vite build"
  }
}
```

想要知道 `vue-tsc` 有哪些参数，可以运行如下命令

```sh
$ ./node_modules/.bin/vue-tsc --help
```
