# Axios 封装

1. 封装一个中间层，方便同意处理请求
2. 统一错误处理
3. 全局加载 loading

## rails 国际化

在 `config/application.rb` 中添加

```ruby
module Mangosteen1
  class Application < Rails::Application
    # ...
    config.i18n.default_locale = 'zh-CN'
  end
end
```


通用格式国际化

```yml
zh-CN:
  activerecord:
    errors:
      # 此处是通用的格式错误报错
      messages:
        invalid: 格式不正确
      # 此处是 validation_code 专用格式错误
      models:
        validation_code:
          attributes:
            email:
              invalid: 邮件地址格式不正确

```