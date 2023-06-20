# 常用 API

## 生命周期

列举常用的生命周期，其他请参考：[页面简介 | uni-app官网 (dcloud.io)](https://zh.uniapp.dcloud.io/tutorial/page.html#lifecycle)

| 函数名            | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| onLoad            | 监听页面加载，该钩子被调用时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参），参考[示例](https://zh.uniapp.dcloud.io/api/router#navigateto) |
| onShow            | 监听页面显示，页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面 |
| onReady           | 监听页面初次渲染完成，此时组件已挂载完成，DOM 树($el)已可用，注意如果渲染速度快，会在页面进入动画完成前触发 |
| onHide            | 监听页面隐藏                                                 |
| onUnload          | 监听页面卸载                                                 |
| onPullDownRefresh | 监听用户下拉动作，一般用于下拉刷新，参考[示例](https://zh.uniapp.dcloud.io/api/ui/pulldown) |
| onReachBottom     | 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项 |


## 页面路由

详情参考：[uni-app 页面和路由](https://zh.uniapp.dcloud.io/api/router.html)

```javascript
// 【缓存跳转】保留当前页面，跳转到应用内的某个页面
uni.navigateTo({ url, success, fail, ... })

// 【强制跳转】关闭当前页面，跳转到应用内的某个页面。
uni.redirectTo({ url, success, fail, ... })

// 【回退】关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
uni.navigateBack({ delat,  })
```


## 数据缓存

将数据存储在本地缓存中，更多请查看：[uni-app 数据缓存](https://zh.uniapp.dcloud.io/api/storage/storage.html)

```javascript
uni.setStorageSync(key, data)
uni.getStorageSync(key)
uni.removeStorageSync(key)
uni.clearStorageSync()
```

## 获取页面元素

```javascript
const query = uni.createSelectorQuery().in(this);
query.select('#id').boundingClientRect(data => {
  console.log("得到布局位置信息" + JSON.stringify(data));
  console.log("节点离页面顶部的距离为" + data.top);
}).exec();
```

## 设备信息

同步的获取设备信息，参考：[uni-app 设备](https://zh.uniapp.dcloud.io/api/system/info.html)

```javascript
const sysInfo = uni.getSystemInfoSync();

// 屏幕宽高
const { height, width } = sysInfo.safeArea

// 导航栏高度
sysInfo.statusBarHeight;
```

获取版本号

```
plus.weex.config.env.appVersion
```

## 使用插件

### 二维码

使用 [uQRCode](https://github.com/Sansnn/uQRCode) 生成

安装

```bash
npm install uqrcodejs
```

在 uniapp 中使用

```vue
<template>
  <view>
    <canvas id="qrcode" canvas-id="qrcode" style="width: 200px;height: 200px;"></canvas>
  </view>
</template>

<script>
import UQRCode from 'uqrcodejs';

export default {
  onReady() {
    // 获取uQRCode实例
    var qr = new UQRCode();
    // 设置二维码内容
    qr.data = "https://uqrcode.cn/doc";
    // 设置二维码大小，必须与canvas设置的宽高一致
    qr.size = 200;
    // 调用制作二维码方法
    qr.make();
    // 获取canvas上下文
    var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
    // 设置uQRCode实例的canvas上下文
    qr.canvasContext = canvasContext;
    // 调用绘制方法将二维码图案绘制到canvas上
    qr.drawCanvas();
  }
}
</script>
```

