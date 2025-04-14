# 开发者工具

## Network 面板

- Disable cache：禁用缓存
- Throttling（默认值 No throttling）：网络限制
- Hide data URLs

查看请求 Waterfall（瀑布流时间线）

![](./images/dev-tools-network-1.png)

其中

- Connection Start：连接开始（三次握手）所用时间
- Request sent：请求已发送的所用时间
- Waiting (TTFB): 等待时间（等待服务器返回数据）
- Content Download：下载内容所用时间

关于 Waterfall 中的两条线

- Waterfall 蓝色的线：DOM 内容加载完成
- Waterfall 红色的线：表示主要资源被下载（首页图片内容等）

NetWork 底部栏

- request：请求数量
- transferred：网络传输量
- resources：页面加载的资源量
- Finish：加载的时间（所有内容）
- 后面两个有颜色的字表示 Waterfall 的红线和蓝线所用时

## Performance 面板

![](./images/dev-tools-performance.png)

其中

- 蓝色的 DCL 也表示 DOM 内容加载完成
- 红色 L 虚线表示主要资源被下载

Summary

- Loading：解析HTML 用时
- Scripting：运行JS所用时
- Rendering：浏览器渲染所用时
- Paninting：绘制所用时
- System：系统所用时
- Idle：空闲时间

## Rendering 面板

记录页面渲染过程

![](./images/dev-tools-rendering.png)

其中比较重要的几个选项

- Paint flashing：页面重绘时闪烁（表示页面指定元素重绘时闪烁）
- Frame Rendering State：帧渲染状态

## Coverage 面板

![](./images/dev-tools-coverage.png)

统计当前页面代码使用情况

- 其中 URL 的 Unused Bytes 比较重要，表示未使用代码量

## Lighthouse 面板

![](./images/dev-tools-lighthouse.png)

该面板为性能优化建议，其中比较重要的一个面板

Categories

- [x] Performance：性能
- [x] Accessibility：可访问性（页面是否适合残障人士）
- [x] Best practices：最佳实践
- [x] SEO
- [x] Progressive Web App：PWA