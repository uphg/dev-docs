# 什么是 RESTful API

RESTful 全称 REpresentational State Transfer

### REST 是什么

- 一种网络软件架构风格。
- 不是标准、不是协议、不是接口，只是一种风格。
- Roy 于 2000 年在自己博士论文中提到此术语。
- Roy 曾参与撰写 HTTP 规格文档。

### 如何实现

1. 以资源为中心。
2. 充分利用 HTTP 现有功能，如动词、状态码、头部字段。
3. [GitHub API](https://docs.github.com/en/rest/repos) 就比较符合 REST，值得学习。

> 其实用一用就能秒懂 REST，我们开始吧


## REST 风格举例

- 请求：创建 item

  ```
  POST /api/v1/items
  Content-Type: application/json
  消息体 {"amount":99, "kind": "income"}
  响应 {"resource": {...}} 或 {"errors": {...}}
  ```

- 请求：更新 item

  ```
  PATCH /api/v1/items/1
  Content-Type: application/json
  消息体 {"amount":"11", "kind": "expense"}
  ```

- 请求：删除 item

  ```
  DELETE /api/v1/items/1
  ```

- 请求：获取一个或多个 item

  ```
  GET /api/v1/items/1
  GET /api/v1/items?page=1&per_page=10
  GET /api/v1/users/2/items
  GET /api/v1/items?user_id=2
  GET /api/v1/items?tags_id[]=1&tags_id[]=2
  GET /api/v1/items?tags_id=1,2
  GET /api/v1/items?sort_by[]=id+asc&sort_by[]=name+desc
  GET /api/v1/items?keyword=hi
  GET /api/v1/items/search/hi
  ```

**REST 风格总结**

1. 尽量以资源为中心（url 里的 items 就是资源）。
2. 尽量使用 HTTP 现有功能（其实响应头里也可以包含内容，但目前的例子都没有用到）。
3. 可以适当违反规则：比如 /api/v1/items/search/hi。

简单的说就是：

- 看见路径就知道请求什么东西
- 看见动词就知道是什么操作
- 看见状态码就知道结果是什么，例如：
  ```
  200 - 成功      201 - 创建成功
  404 - 未找到    403 - 没有权限    401 - 未登录
  422 - 无法处理，参数有问题         402 - 需付费
  412 - 不满足前提条件               429 - 请求太频繁
  400 - 其他所有错误，详细原因可以放在 body 里
  ```

## 设计 API

### 发送验证码

- 资源：validation_codes
- 动作：create(POST)
- 状态码：200 | 201 | 422 | 429

### 登入登出

- 资源：session（没有s！）
- 动作：create | destroy(DELETE)
- 状态码：200 | 422

### 当前用户

- 资源：me
- 动作：show(GET)

### 记账数据

- 资源：items
- 动作：create | update | show | index | destroy
  - update 对应 PATCH，表示部分更新
  - show 对应 GET /items/:id，用来展示一条记账
  - index 对应 GET /items?since=2022-01-01&before=2023-01-01
  - destroy 对应 DELETE，表示删除，一般为软删除

### 标签

- 资源：tags
- 动作：create | update | show | index | destroy

### 打标签

- 资源：taggings（动词的名词形式）
- 动作：create | index | destroy


至此，API 概要设计已完成。

## API 实现

首先在 `config/routes.rb` 中添加以下代码

```ruby
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :validation_codes
    end
  end
end
```

添加后运行 `bin/rails routes`，成功后会默认生成如下路由对应

```
GET    /api/v1/validation_codes(.:format)         api/v1/validation_codes#index
POST   /api/v1/validation_codes(.:format)         api/v1/validation_codes#create
GET    /api/v1/validation_codes/:id(.:format)     api/v1/validation_codes#show
PATCH  /api/v1/validation_codes/:id(.:format)     api/v1/validation_codes#update
PUT    /api/v1/validation_codes/:id(.:format)     api/v1/validation_codes#update
DELETE /api/v1/validation_codes/:id(.:format)     api/v1/validation_codes#destroy
```

上面表示路由已经与方法一一对应，但我们不需要这么多方法，可以使用 only 只生成指定方法

```ruby
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :validation_codes, only: [:create]
    end
  end
end
```

它还有一个相反的语法 exclude，表示排除指定方法

```ruby
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :validation_codes, exclude: [:create]
    end
  end
end
```

继续添加路由

```ruby
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :validation_codes, only: [:create]
      resource :session, only: [:create, :destroy]
      resource :me, only: [:show]
      resources :items
      resources :tags
    end
  end
end
```

然后运行 `bin/rails routes` 生成如下对应关系

```
POST   /api/v1/validation_codes(.:format)  api/v1/validation_codes#create
DELETE /api/v1/session(.:format)           api/v1/sessions#destroy
POST   /api/v1/session(.:format)           api/v1/sessions#create
GET    /api/v1/me(.:format)                api/v1/mes#show
GET    /api/v1/items(.:format)             api/v1/items#index
POST   /api/v1/items(.:format)             api/v1/items#create
GET    /api/v1/items/:id(.:format)         api/v1/items#show
PATCH  /api/v1/items/:id(.:format)         api/v1/items#update
PUT    /api/v1/items/:id(.:format)         api/v1/items#update
DELETE /api/v1/items/:id(.:format)         api/v1/items#destroy
GET    /api/v1/tags(.:format)              api/v1/tags#index
POST   /api/v1/tags(.:format)              api/v1/tags#create
GET    /api/v1/tags/:id(.:format)          api/v1/tags#show
PATCH  /api/v1/tags/:id(.:format)          api/v1/tags#update
PUT    /api/v1/tags/:id(.:format)          api/v1/tags#update
DELETE /api/v1/tags/:id(.:format)          api/v1/tags#destroy
```

**实现 ValidationCode**

运行以下命令生成数据模型

```bash
bin/rails g model ValidationCode email:string kind:string used_at:datetime
```

修改 db/migrate/20230809134237_create_validation_codes.rb 文件

```ruby
class CreateValidationCodes < ActiveRecord::Migration[7.0]
  def change
    create_table :validation_codes do |t|
      t.string :email
      t.integer :kind, default: 1, null: false
      t.string :code, limit: 100
      t.datetime :used_at

      t.timestamps
    end
  end
end
```

依次运行以下命令

```bash
# 生成数据库
bin/rails db:migrate

# 生成 Controller
bin/rails g controller Api::V1::ValidationCodes create
```

在 `app/controllers/api/v1/validation_codes_controller.rb` 中添加如下内容

```ruby
class Api::V1::ValidationCodesController < ApplicationController
  def create
    head 202
  end
end
```

测试接口

```bash
curl -X POST http://127.0.0.1:3000/api/v1/validation_codes -v
```

创建 Items 的 Controller

```bash
bin/rails g controller Api::V1::Items
```

## 实现分页

两种方案

1. 使用 page 和 per_page 参数，见 kaminari 或 pagy 库。
2. 使用 start_id 和 limit 参数，需要 id 是自增数字。

### 使用 kaminari 实现

在 Gemfile 中添加以下依赖，并重新 bundle

```bash
gem 'kaminari'
bundle
```

**添加 kaminari 配置**

运行以下命令生成在 `config/initializers/kaminari_config.rb` 的配置文件

```bash
bin/rails g kaminari:config
```

在配置文件中添加以下内容，表示每页 10 个

```ruby
Kaminari.configure do |config|
  config.default_per_page = 10
end
```

也可以在接口函数调用时配置

```ruby
class Api::V1::ItemsController < ApplicationController
  def index
    # 每页 100 条
    items = Item.page(params[:page]).per(100)
    render json: {
      ...
    }
  end
  def create
    ...
  end
end
```