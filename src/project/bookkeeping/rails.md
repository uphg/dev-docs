# rails 手册

## 快速创建 API 流程

创建 model

```bash
# 创建 model
$ bin/rails g model tag user:references name:string sign:string deleted_at:datetime

# 运行 db:mgrate
$ bin/rails db:migrate

# 创建 controller
$ bin/rails g controller api/v1/tags_controller

# 实现功能测试 & 及功能代码实现
$ rspec

# 生成测试文档
$ bin/rake docs:generate

# 创建追加数据表方法
$ bin/rails g migration AddKindToItem

# 添加数据表对应字段
$ bin/rails db:migrate
```

第一次部署到生产环境

```bash
$ need_migrate=1 bin/pack_for_remote.sh
```

## 根据条件查找用户

```ruby
user = User.find_by email
if user.nil?
  user = User.create email
end

# 上面的代码相当于：
user = User.find_or_create_by email: session.email
```

ActiveModel - 表示不存储在数据库的类 和 ActiveRecord 表示会存储在数据库的类