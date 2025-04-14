# 工厂模式

使用 factory bot 添加工厂模式，见[factory_bot_rails](https://github.com/thoughtbot/factory_bot_rails)

在 Gemfile 添加

```ruby
group :development, :test do
  gem 'factory_bot_rails'
end
```

运行 `bundle --verbose` 重新初始化依赖。

根据 [Configure your test suite](https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md#configure-your-test-suite) 添加测试环境配置

在 `spec/support/factory_bot.rb` 添加如下内容

```ruby
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```

在 `rails_helper.rb` 中引入该依赖

```ruby
require_relative './support/factory_bot'
```

创建 `spec/factories` 目录，用于存放 factory

添加 faker，用于模拟数据

```ruby
group :test do
  gem 'factory_bot_rails'
  gem 'faker'
end
```

添加一个快捷创建用户的工厂函数

```ruby
require "faker"

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
  end
end
```

使用它

```ruby
resource "账目" do
  let(:current_user) { create :user }
  ...
end
```

删除 items & tags 错误数据

```bash
> docker exec -it db-for-mangosteen bash
> psql -U mangosteen -d mangosteen_production
> \c mangosteen_production
> select * from items;
> delete from items;
> delete from tages;
```

纠正，`'tag_ids && ARRAY[?]::bigint[]'` 需改为 `'tag_ids && ARRAY[?]'`，如下：

```ruby
class Api::V1::TagsController < ApplicationController
  # ...
  def destroy
    tag = Tag.find params[:id]
    return head :forbidden unless tag.user_id == request.env['current_user_id']
    tag.deleted_at = Time.now
    ActiveRecord::Base.transaction do
      begin
        tag.save!
        if params[:with_items]
          Item.where('tag_ids && ARRAY[?]', [tag.id])
              .update!(deleted_at: Time.now)
        end
      rescue
        return head 422
      end
      head 200
    end
  end
end
```

## Nginx 配置代理

在 `config/nginx.default.conf` 添加如下内容，将 3000 端口代理到 8080

```nginx{10-12}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;
    gzip on;
    gzip_types      text/css text/javascript application/javascript application/json image/jpeg image/png image/gif;
    gzip_proxied    no-cache no-store private expired auth;
    gzip_min_length 1000;

    location /api/ {
        proxy_pass http://mangosteen-prod-1:3000;
    }

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
    location ~* .(?:css|js)$ {
        expires 10y;
        add_header Cache-Control "public";
        root   /usr/share/nginx/html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

该语法的含义为，将当前容器下 `/api/` 的接口代理到 名为 mangosteen-prod-1 容器的 3000 端口（因为当前 nginx 也是容器中）

## rails 添加跨域

添加 [rack-cors](https://github.com/cyu/rack-cors)，在 Gemfile 添加

```ruby
gem "rack-cors"
```

创建 `config/initializers/cors.rb`，添加如下内容

```ruby
# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '121.196.236.94:8080'
    resource '*',
        methods: [:get, :post, :delete, :patch, :options, :head],
        headers: :any,
        expose: ['*', 'Authorization'],
        max_age: 600
  end
end
```

## 前端打包优化

1. 动态导入（路由懒加载）
2. Rollup chunk 优化
3. 条件编译（根据环境变量打包不同代码）

Rollup chunk 优化如下：

```js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('echarts')) {
            return 'echarts';
          }
          if (id.includes('mock') || id.includes('faker')) {
            return 'mock';
          }
          if (id.includes('vant')) {
            return 'vant';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})
```

其中 echarts 表示将 echarts 部分单独打包为一个 js