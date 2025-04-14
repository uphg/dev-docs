# 多路复用

## HTTP/2 的帧是什么

- HTTP 1.1 基于字符串
- HTTP 2 基于帧 Frame（二进制）

示例

```js
HEADERS
  + END_STREAM
  + END_HEADERS
  :method = GET
  :scheme = https
  :path = /resoure
  host = example.org
  accept = image/jpeg
```

1. 引入了帧（Frame）的概念，每一帧包含 Length + Type + Flags + StreamID + Payload 五部分，前四个部分是固定的长度，为 9 字节，第五部分 Payload 的最大长度为 2<sup>14</sup> 到 2<sup>24</sup> -1 字节，即 16Kb 到 16Mb，具体的最大长度由终端自行决定。
2. 保留了请求和响应的概念，请求头和响应头会被发送方压缩后，分成几个连续的 Frame 传输，头字段会出现这些 Frame 的 Payload 中；接收方拼合这些 Frame 后，解压缩即可得到真正的请求头或响应头。
3. 引入了流（Stream）的概念，一个 Stream 由双向传输的连续且有序的 Frame 组成，一个 TCP 连接可以同时包含多个 Stream（比如 100 个），一个 Stream 只用于一次请求和一次响应。Stream 之间不会互相影响。
4. 服务端可以先发响应，客户端拿到响应结果后可以保存，之后就不需要再发对应的请求了。
5. 头部字段全部改为小写，不允许出现大写。比如：`accept: text/html`。
6. 引入了伪头部字段的概念，出现在头部字段的前面，必须以冒号开头。比如：`:method: GET`。

笔记

- HTTP2 可以在一个 TCP 中开辟多条通道（Stream）
- 每个通道发送请求时都会有一个 StreamId，用来对应返回的响应
- 可以在一个TCP 连接中开启很多个通道（100 ... 1000 个）
- 每个通道中只能有一个请求和响应

## 服务器推送 ServerPush（很少用到）

- 当你发送了第一个请求后，服务端推送第一个响应，并推送你可能会用到的响应内容，如：1.css，2.css
- 当你第二次请求 1.css 时，浏览器会直接返回服务器推送的 1.css

实现方式，在 Nginx 中添加以下配置

```js
location / {
  root  /share/nginx/html;
  index index.html index.htm;
  http2_push /style.css;
  http2_push /examp.png;
}
```

或者

```js
location = / {
  ...
  http2_push_preload on;
}

然后，在 index.html 的响应头中添加：
Link: </styles.css>; rel=preload; as=style
```

