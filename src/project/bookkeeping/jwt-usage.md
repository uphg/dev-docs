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

## 测试用户登录

- 首先查看曾经是否向当前 email 发送过对应 code（在数据库中找不到对应字段）
- 其次当前 code 没有被使用过（也就是 它的 used_at 字段为空）

创建两个 controller

```bash
$ bin/rails g controller api/v1/sessions_controller
$ bin/rails g controller api/v1/mes_controller
```

if 代码简化

```ruby
if !canSignin
  return render status: :unauthorized
end

# 简化 1
return render status: :unauthorized if !canSignin

# 简化 2
return render status: :unauthorized if not canSignin

# 简化 3 unless 意为：如果不
return render status: :unauthorized unless canSignin
```

rescue 代码补救，表示代码报错就返回指定内容

```ruby
user_id = payload[0]['user_id'] rescue nil
```

## 在 Rails 中使用 JWT

参考：[JWT](https://github.com/jwt/ruby-jwt)

### Using Bundler:

在你的 Gemfile 中添加

```
gem 'jwt'
```

然后运行 `bundle install`

使用 HMAC

```ruby
require 'jwt'

hmac_secret = 'my$ecretK3y'

# 加密
token = JWT.encode payload, hmac_secret, 'HS256'

# 解密
decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
```

其中 hmac_secret 可以存储在密钥管理中，从 `Rails.application.credentials.hmac_secret` 获取

## 将 JWT 封装为中间件

Rails 中间件文档：[Action Dispatcher Middleware Stack](https://guides.rubyonrails.org/rails_on_rack.html#action-dispatcher-middleware-stack)

创建 lib/auto_jwt.rb

```ruby
class AutoJwt
  def initialize(app)
    @app = app
  end
  def call(env)
    header = env['HTTP_AUTHORIZATION']
    jwt = header.split(' ')[1] rescue ''
    payload = JWT.decode jwt, Rails.application.credentials.hmac_secret, true, { algorithm: 'HS256' } rescue nil
    env['current_user_id'] = payload[0]['user_id'] rescue nil
    @status, @headers, @response = @app.call(env)
    [@status, @headers, @response]
  end
end
```

在 config/application.rb 添加如下配置

```ruby
...
require_relative '../lib/auto_jwt'

module Mangosteen1
  class Application < Rails::Application
    ...
    config.middleware.use AutoJwt
  end
end
```

rspec 运行指定用例两种方式

```bash
# 使用名称
$ rspec -e "登录后成功获取"

# 使用路径，运行指定文件的第5行测试用例
$ rspec spec/request/items_spec.rb:5
```

在测试时间时，尽量使用字符串，或者标准时间（解决时区问题）

```ruby
item = Item.create amount: 100, created_at: Time.new(2018, 1, 1, 0, 0, 0, "+00:00")
item = Item.create amount: 100, created_at: Time.new(2018, 1, 1, 0, 0, 0, "Z")
item = Item.create amount: 100, created_at: '2018-01-01'
```

rspec 语法简写

```ruby
# 示例
response_field :id, "ID", scope: :resources
response_field :amount, "金额", scope: :resources

# 可以简写为以下方式，省略了 scope: :resources
with_options :scope => :resources do
  response_field :id, 'ID'
  response_field :amount, "金额（单位：分）"
end
```

## RefreshToken 是什么
  
RefreshToken 指的是在指定时间内如果权限过期（JWT），用于自动刷新 JWT 的 Token

RefreshToken 实现流程

- 首先 RefreshToken 最好设置 2h-24h 过期，我们默认为 2h 过期
- 用户登录，获取 JWT，并附带一个随机数字符串（Token）该字符串存储在数据库中
- 2h 后用户再次请求接口时，发现已过期，就可以请求 /refresh 接口，获取一个新的 JWT

RefreshToken 解决多设备

- 假如用户登录了3个设备，我们可以为每个设备存储一个随机数（Token）
- 并且可以限制登录设备，如果要限制 3 个设备，可以在第四个设备登录时删除第1个设备，或者禁止第四个设备缓存 token

RefreshToken 和 JWT 哪个更重要

- 首先 RefreshToken 只有在2个小时后才会再次请求，但 JWT 需要每次请求都附带，所以 JWT 暴露风险更高，故需要更强的加密

RefreshToken 也可以用 JWT 实现，但没有 Token 灵活