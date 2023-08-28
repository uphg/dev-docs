# 使用 Rails 发送邮件

参考官网教程：[Sending Emails](https://guides.rubyonrails.org/action_mailer_basics.html#sending-emails)

## 创建邮件方法

创建邮件程序

```bash
$ bin/rails generate mailer User
```

打开 `app/mailers/application_mailer.rb` 修改邮箱为自己的邮箱

```ruby
class ApplicationMailer < ActionMailer::Base
  default from: "233@qq.com"
  layout "mailer"
end
```

打开 `app/mailers/user_mailer.rb`，修改为官网示例中的内容

```ruby
class UserMailer < ApplicationMailer
  def welcome_email
    mail(to: '233@qq.com', subject: 'Welcome to My Awesome Site')
  end
end
```

然后根据示例在 `app/view/user_mailer` 中创建 welcome_email.html.erb

```html
<!DOCTYPE html>
<html>
  <head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
  </head>
  <body>
    <p>Hello</p>
  </body>
</html>
```

## 配置邮件服务器

参考：[](https://guides.rubyonrails.org/action_mailer_basics.html#action-mailer-configuration-for-gmail)

打开 `config/environments/development.rb` 文件，修改下面配置

```ruby
config.action_mailer.raise_delivery_errors = true
config.action_mailer.perform_caching = true
```

继续在 development.rb 中添加，email_password 要使用 Rails 密钥管理生成加密后的，然后以如下方式使用

```ruby
  config.action_mailer.smtp_settings = {
    address:              'smtp.qq.com',
    port:                 587,
    domain:               'example.com',
    user_name:            '233@qq.com',
    password:             Rails.application.credentials.email_password,
    authentication:       'plain',
    enable_starttls_auto: true,
    open_timeout:         10,
    read_timeout:         10
  }
```

然后调用 `welcome_email.deliver` 方法

```bash
$ bin/rails console
Loading development environment (Rails 7.0.6)
3.0.0 :001 > UserMailer.welcome_email.deliver
```

## 自动生成文档

添加 rspec_api_documentation 到你的 Gemfile

```ruby
gem 'rspec_api_documentation'
```

重新 bundle

```bash
$ bundle install
```

添加以下测试文件

```bash
$ mkdir spec/acceptance
$ code spec/acceptance/orders_spec.rb
```

orders_spec.rb 内容为

```ruby
require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource "Orders" do
  get "/api/v1/items" do
    example "Listing orders" do
      do_request

      expect(status).to eq 200
    end
  end
end
```

生成文档页面

```bash
$ bin/rake docs:generate
```

然后 进入 `doc/api/` 目录 运行 http-server

```bash
$ cd doc/api
$ npx http-server .
```

完

## 修复文档不展示 JSON 格式数据的问题

在 `spec/spec_helper.rb` 中添加如下配置

```ruby{1-12}
require 'rspec_api_documentation'
RspecApiDocumentation.configure do |config|
  config.request_body_formatter = :json
end
# See https://rubydoc.info/gems/rspec-core/RSpec/Core/Configuration
RSpec.configure do |config|
  config.before(:each) do |spec|
    if spec.metadata[:type].equal? :acceptance
      header 'Accept', 'application/json'
      header 'Content-Type', 'application/json'
    end
  end

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
end
```

在 `config/initializers/rspec_api_documentation.rb` 中添加如下内容

```ruby
module RspecApiDocumentation
  class RackTestClient < ClientBase
    def response_body
      last_response.body.encode("utf-8")
    end
  end
end
```

参考自：[rspec_api_documentation#456](https://github.com/zipmark/rspec_api_documentation/issues/456#issuecomment-597671587)


## 在 console 测试发送邮件

代码需更新至[本次 commit](https://github.com/uphg/mangosteen/commit/8d54ac26d0c8b64504cafe68296f535241f8d68e)

在控制台依次运行以下代码 `$ bin/rails console`

```ruby
validation_code = ValidationCode.new email: '123@qq.com', kind: 'sign_in', code: '233'
validation_code.save
UserMailer.welcome_email('123@qq.com').deliver
```

## Rails 使用枚举

```ruby
# 定义
class ValidationCode < ApplicationRecord
  # ...
  enum kind: { sign_in: 0, reset_password: 1 }
  # ...
end

# 使用
v1 = ValidationCode.create email: '123.@qq.com', kind: 'sign_in'
```

此处 v1 在 Ruby 代码中是 `'sign_in'`，但在数据库中存储的 kind 是 0，且前端也可以直接传入 `'sign_in'`，Rails 会自动做处理

定义后要将数据清空，防止数据中有 kind 未定义之前的无意义数据

```ruby
# 清空 ValidationCode 对应数据表
ValidationCode.destroy_all
```