# Rails 密钥管理

Web 应用中的对称加密

- JWT 加密解密需要一个 key1
- Session ID 加密解密需要一个 key2

问题：key 们存在哪？

- 存在 git 里会被其他人看到、存在自己电脑需要传来传去（不安全）

解法：Rails 帮我们想好了

```
master.key + keys => encrypted
encrypted + master.key => keys
```

## 如何修改 key

```bash
# VSCode 打开
$ EDITOR="code --wait" bin/rails credentials:edit

# Vim 打开
$ EDITOR="vim" bin/rails credentials:edit
```

## 如何读取 key

打开控制台

```bash
$ bin/rails console # or $ bin/rails c
```

输入代码

```ruby
Rails.application.credentials.secret_key_base
Rails.application.credentials.github[:key]
```

## 安全问题

Rails：我支持多环境密钥

生产环境

```bash
$ EDITOR="code --wait" rails credentials:edit --environment production
```

打开 ruby 控制台

```bash
$ RAILS_ENV=production rails c
```

获取 key

```bash
Rails.application.credentials.secret_key_base
```

把 production.key 复制到生产环境，不要给其他人。或者你也可以删掉 production.key（但要备份）

## 最终方案

运行以下命令，将生成的 secret_key_base 复制

```bash
$ EDITOR="code --wait" bin/rails credentials:edit
```

运行以下命令，将复制的 secret_key_base 粘贴至生产环境

```bash
$ EDITOR="code --wait" rails credentials:edit --environment production
```

然后删除 `config/master.key`、`config/credentials.yml.enc`，重新运行

```bash
$ EDITOR="code --wait" bin/rails credentials:edit
```

生成开发环境 secret_key_base（避免两个环境的 secret_key_base 重复）。

然后修改 database.yml 生产环境配置。

```yml
production:
  <<: *default
  database: mangosteen_production
  username: mangosteen
  password: <%= ENV["DB_PASSWORD"] %>
  host: <%= ENV["DB_HOST"] %>
```

再次运行 `./bin/pack_for_host.sh` 打包项目，并且到生产环境 windows 端的 Git bash 运行如下代码

```bash
# 运行 docker
$ DB_HOST=db-for-mangosteen DB_PASSWORD=123456 RAILS_MASTER_KEY=xxx mangosteen_deploy/setup_host.sh

# 测试请求
$ curl localhost:3000/api/v1/items -v
```

会返回 500 报错，说明还没有创建数据库，运行以下代码创建

```bash
$ docker exec -it mangosteen-prod-1 bin/rails db:create db:migrate
```

再次测试请求即可成功。

::: info 删除数据库

如果之前创建过数据库，可以先删除数据库，如下

```bash
# 进入 bash 脚本
$ docker exec -it mangosteen-prod-1 bash

# 删除数据库
$ DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bin/rails db:drop
```

:::

此时开发环境和 生产环境的 key 就是相对隔离的，如下：

开发环境

- 使用 master.key 和 credentials.yml.enc
- master.key 被 git ignore
- 如果 .enc 不被 git ignore，那就多人共用 master.key
- 如果 .enc 要被 git ignore，那就每个人创建自己的 master.key

生产环境

- 使用 production.key 和 production.yml.enc
- production.key 被 git ignore，内容写到环境变量
- .env 不被 git ignore
- 读取 key 们的代码跟开发环境一模一样 
