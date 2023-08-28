# JWT 的定义与用法

登录功能参考：[你会做WEB上的用户登录功能吗？](./web-login.md)

JWT 全称 JSON Web Token，大意为支持 JSON 的 Token

## Cookie

服务器向客户端浏览器发送一段 token，客户端在后续的请求中都会自动携带该 token，如 `Cookie: token`。

## Session

一般会基于 Cookie 实现，服务器给浏览器发送一个字符串，用于识别是哪个客户端发送给服务器的，该字符串对应原始值存储在服务器中。

## JWT 的定义

为了解决 Session 在服务器存储浏览器的信息映射的问题，JWT 会直接向浏览器发送一个内容加密后的字符串，浏览器存储并在之后的请求中附带

### 结构

它的结构如下：

**Header**

`alg` 标识用于生成签名的算法。`typ` JWT 的类型，比如登录、权限控制等。

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload**

要存储的数据，JSON 格式即可（其中部分为内置字段）

```json
{
  "loggedInAs": "admin",
  "iat": 1422779638
}
```

**Signature** （签名）

它的加密方式为（base64是为了支持中文）：

```
signature = 加密(私钥, base64(header), base64(Payload))
```

最终 JWT 的格式为：

```js
const token = base64urlEncoding(header) + '.' + base64urlEncoding(payload) + '.' + base64urlEncoding(signature)
```

此处 header 和 payload 并未加密，但前端即使拿到也不能修改，修改后就无法与后端对应了。也就是它是只读的，前端也可以读取该数据

## JWT 实现流程

- 浏览器向服务器发送一个附带用户信息的请求，服务器返回一个存储信息后的 JWT。
- 用户将 JWT 存储在本地 localStorage 中，之后的每次请求都在 header 头中附带该 JWT。
- 也可将 JWT 直接存储在 Cookie 中，它可以自动在每次请求携带。

这样看起来 Session 似乎更好，但 JWT 其实通用性更好，它除了支持 TCP 还可以支持 RDP、UDP 等。