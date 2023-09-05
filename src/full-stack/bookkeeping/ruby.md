# ruby 笔记

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

class 声明属性

```ruby
class Session
  include ActiveModel::Model
  attr_accessor :email
  attr_accessor :code
end

# 可以简写为
class Session
  include ActiveModel::Model
  attr_accessor :email, :code
end
```