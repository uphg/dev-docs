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

