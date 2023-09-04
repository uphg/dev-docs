# 快速创建 API 流程

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

获取参数中不为空的字段

```ruby
tag = Tag.find params[:id]
tag.update params.permit(:name, :sign)
```

重新获取数据库数据两种方法（用于获取最新的当前数据，在修改数据后使用）

```ruby
tag = Tag.find tag.id

# or
tag.reload
```

ISO8601 表示时间标准格式

时间排序修改时区

```ruby
key = item.happen_at.in_time_zone('Beijing').strftime('%F')
```

> 搜索 ruby spaceship operator 查看常用时间格式化参数

`||` 简写

```ruby
hash[key] = hash[key] || 0

# 可以缩写为
hash[key] ||= 0
```

sort 排序改变原数据

```ruby
groups = groups.sort { |a, b| a[:happen_at] <=> b[:happen_at] }

# 可以写为，"!" 表示根据排序改变原数组
groups.sort! { |a, b| a[:happen_at] <=> b[:happen_at] }
```

第一次部署到生产环境

```bash
$ need_migrate=1 bin/pack_for_remote.sh
```