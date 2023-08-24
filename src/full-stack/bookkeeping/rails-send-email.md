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

Add rspec_api_documentation to your Gemfile

```ruby
gem 'rspec_api_documentation'
```

Bundle it!

```bash
$ bundle install
```

Set up specs.

```bash
$ mkdir spec/acceptance
$ code spec/acceptance/orders_spec.rb
```

```bash
$ bin/rake docs:generate 
```

然后 进入 `doc/api/` 目录 运行 http-server
