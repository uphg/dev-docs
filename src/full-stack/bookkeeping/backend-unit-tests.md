# 后端单元测试

首先参考 [rspec-rails](https://github.com/rspec/rspec-rails) 官网安装测试库

先把 rspec-rails 添加到项目 Gemfile 的 :development 和 :test 组中

```ruby
# Run against this stable release
group :development, :test do
  gem 'rspec-rails', '~> 6.0.0'
end
```

然后在项目根目录运行

```bash
# Download and install
$ bundle install

# Generate boilerplate configuration files
# (check the comments in each generated file for more information)
$ rails generate rspec:install
      create  .rspec
      create  spec
      create  spec/spec_helper.rb
      create  spec/rails_helper.rb
```

使用 rails generate 生成测试文件模板

```bash
$ rails generate rspec:model user
      create  spec/models/user_spec.rb
```

如果没创建用户 modules 对象，可以先创建

```bash
# RSpec hooks into built-in generators
$ rails generate model user
      invoke  active_record
      create    db/migrate/20181017040312_create_users.rb
      create    app/models/user.rb
      invoke    rspec
      create      spec/models/user_spec.rb
```

然后添加测试环境数据库

```bash
# 创建测试环境的数据库
RAILS_ENV=test bin/rails db:create

# 添加数据表
RAILS_ENV=test bin/rails db:migrate
```

修改测试文件

```ruby
require 'rails_helper'

RSpec.describe User, type: :model do
  it '有 email' do
    user = User.new email: 'jack@a.com'
    expect(user.email).to eq 'jack@a.com'
  end
end

```

运行测试成功后完成

```bash
$ bundle exec rspec
```

## 测试接口

使用 rails generate 生成测试模板，以 Items 为例

```bash
$ bin/rails generate rspec:request items
```

修改 spec/requests/items_spec.rb 测试文件内容

```ruby
require 'rails_helper'

RSpec.describe "Items", type: :request do
  describe "GET /items" do
    it "works! (now write some real specs)" do
      get api_v1_items_path
      expect(response).to have_http_status(200)
    end
  end
end
```

再次运行测试。

> 注：`get api_v1_items_path` 相当于 `get '/api/v1/items'`
