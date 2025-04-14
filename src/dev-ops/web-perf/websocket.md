# WebSocket

## 为什么需要 WebSocket？

初次接触 WebSocket 的人，都会问同样的问题：我们已经有了 HTTP 协议，为什么还需要另一个协议？它能带来什么好处？

答案很简单，因为 HTTP 协议有一个缺陷：通信只能由客户端发起。

举例来说，我们想了解今天的天气，只能是客户端向服务器发出请求，服务器返回查询结果。HTTP 协议做不到服务器主动向客户端推送信息。

这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用"轮询"：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。

轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。因此，工程师们一直在思考，有没有更好的方法。WebSocket 就是这样发明的。

## 简介

WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。

它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。

其他特点包括：

1. 建立在 TCP 协议之上，服务器端的实现比较容易。
2. 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
3. 数据格式比较轻量，性能开销小，通信高效。
4. 可以发送文本，也可以发送二进制数据。
5. 没有同源限制，客户端可以与任意服务器通信。
6. 协议标识符是 `ws`（如果加密，则为 `wss`），服务器网址就是 URL。

```bash
ws://example.com:80/some/path
```

![](./images/websocket-1.jpg)

## 客户端使用示例

下面是一个网页脚本的例子（点击[这里](http://jsbin.com/muqamiqimu/edit?js,console)看运行结果），基本上一眼就能明白。

```js
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) { 
  console.log("Connection open ...")
  ws.send("Hello WebSockets!")
}

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data)
  ws.close()
}

ws.onclose = function(evt) {
  console.log("Connection closed.")
}
```

## 客户端的 API

### WebSocket 构造函数

用于新建 WebSocket 实例

```js
var ws = new WebSocket('ws://localhost:8080')
```

实例对象的所有属性和方法清单，见[WebSocket - Web APIs|MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

### WebSocket.readyState

`readyState` 属性返回实例对象的当前状态，共有四种，详情参考：[WebSocket: readyState property](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState)。

- CONNECTING：值为0，表示正在连接。
- OPEN：值为1，表示连接成功，可以通信了。
- CLOSING：值为2，表示连接正在关闭。
- CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

### WebSocket: open 事件

打开与 WebSocket 的连接时，将触发该 open 事件，它有两种写法。

```js
ws.onopen = function () {
  ws.send('Hello Server!');
}
```

要指定多个回调函数，可以使用 `addEventListener` 方法。

```js
ws.addEventListener('open', function (event) {
  ws.send('Hello Server!')
})
```

### WebSocket: close 事件

当与 WebSocket 的连接关闭时，将触发该 close 事件。

```js
ws.addEventListener("close", function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
})

ws.onclose = function(event) {
  // handle close event
}
```

### WebSocket: message 事件

当通过 WebSocket 接收数据时，将触发该 message 事件。

```js
ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});
```

注意，服务器数据可能是文本，也可能是二进制数据

```js
ws.addEventListener("message", function(event) {
  if (typeof event.data === String) {
    console.log("Received data string");
  }

  if (event.data instanceof ArrayBuffer) {
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
})
```

也可以使用 `socket.binaryType` 控制接收到的类型

```js
// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080");

// Change binary type from "blob" to "arraybuffer"
socket.binaryType = "arraybuffer";

socket.addEventListener("message", (event) => {
  if (event.data instanceof ArrayBuffer) {
    const view = new DataView(event.data);
    console.log(view.getInt32(0));
  } else {
    console.log(event.data);
  }
});
```

### WebSocket: send() 方法

用于向服务器发送数据

```js
ws.send('your message');

// 发送 Blob 对象的例子。
var file = document
  .querySelector('input[type="file"]')
  .files[0];
ws.send(file);

// 发送 ArrayBuffer 对象的例子。
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);
```

### WebSocket.bufferedAmount

实例对象的 `bufferedAmount` 属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。

```js
var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```

### WebSocket: error 事件

当与 WebSocket 的连接由于错误而关闭（例如，无法发送某些数据）时，将触发该 error 事件。

```js
const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("error", (event) => {
  console.log("WebSocket error: ", event);
});
```

## 服务端的实现

WebSocket 服务器的实现，可以查看维基百科的列表。

常用的 Node 实现有以下三种。

- [µWebSockets](https://github.com/uNetworking/uWebSockets)
- [Socket.IO](https://socket.io/)
- [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)