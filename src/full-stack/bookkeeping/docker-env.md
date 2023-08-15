# Docker 环境搭建

- Windows 必须 10 以上版本，并且开启 WSL，见[设置 WSL 开发环境](https://learn.microsoft.com/zh-cn/windows/wsl/setup/environment)
- 安装 Docker：[Install Docker Desktop on Windows](https://docs.docker.com/desktop/install/windows-install/)
- 在 Docker 中配置 WSL：[WSL 2 上的 Docker 远程容器入门](https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/wsl-containers)
- 安装 VS Code 拓展：[Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- 给[Docker 镜像加速](https://www.runoob.com/docker/docker-mirror-acceleration.html)

## Docker 命令

```bash
# 重启容器
docker start db-for-xxx
```

查看 docker 状态

```bash
docker ps 
docker ps -a
```

查看 log

```bash
docker logs
```

## WSL Ubuntu error 0x80004002 报错

以管理员打开 Windows PowerShell，运行以下代码，参考自[WSL Ubuntu error 0x80004002 #2851](https://github.com/microsoft/WSL/issues/2851)

```sh
PS C:\WINDOWS\system32> Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

## 初始化 Docker 环境

- 克隆 https://github.com/frankfang/oh-my-env-1 项目（先不要打开）。
- 打开 Windows/Mac 的终端，运行 `docker network create network1`。
- 打开 VSCode，安装 Dev Containers 插件。
- 用 VSCode 打开 oh-my-env 目录。
- 打开 Dev Containers 后会提示 Reopen in Container，点击该按钮。
- 如果错过了上一步，可以输入 Ctrl + Shift + P，然后输入 Reopen，回车，等待。
- 初始化完成后点击右侧 + 新建一个终端，依次运行以下命令
    ```bash
    # 查看终端所在位置
    pwd

    # 查看当前操作系统版本
    uname -a

    # 使用 ruby v3 版本
    rvm use 3

    # 查看 ruby 是否生效
    ruby --version

    # 使用系统自带版本 node
    nvm use system

    # 查看 Node 及其依赖
    node --version
    npm --version
    yarn --version
    pnpm --version

    # 查看 bundle
    bundle --version

    # 运行 ruby 代码
    irb
    ```
- 再次开启时可以在 VSCode 的最近项目中 打开 oh-my-env-1-master [Dev Container]
- 该命令会自动重新初始化 Linux 环境

> 退出 irb：按下 Ctrl + D（也可以输入 Ctrl + Z 或 Ctrl + C），这会发送一个 EOF（输入结束）信号，导致 irb 退出

重新登录

```bash
zsh --login
rvm use 3
```

**关于 oh-my-env 的配置**

- `FROM frankfang128/oh-my-docker:mangosteen` mangosteen 表示山竹记账
- extensions 表示预装的插件
- runArgs 表示运行参数配置
  - 默认创建虚拟网络 network1
  - `--privileged` 在 Dokcer 中启动 Docker
- mounts 持久化的数据
- remoteUser 默认用户

## 环境说明

**工作空间**

- oh-my-env 会自动映射为 /workspaces/oh-my-env。
- 该目录里的文件是**内外共享**的，性能一般。
- 本项目提前准备了 `~/repos` 目录，该目录是该容器专属的，性能较好。
- 本项目默认在 `~/repos` 中工作。
- 需要共享时才会用到 /workspaces/oh-my-env/temp 目录。

**文件查找命令**

- 当前环境配置了 fzf 可以模糊查询当前目录下所有文件。
- f 命令可以在 fzf 的基础上打开选中目录。
- fd 命令表示只进入对应文件目录，并不会打开该文件。
- j 目录历史，打开所有之前打开过的目录，并进入该目录。
- code xxx 使用 VSCode 打开该目录

**在 Docker 中运行 Docker**

- 当前环境是在 Docker 中，但可以在当前环境中再启动一个 Docker
- 运行 dockerd 启动后，就可以运行 `docker ps` `docker run hello-world`

**拓展环境**

如果你想拓展 oh-my-env 环境，可以在 Dockerfile 中补充初始化命令，例如添加一个 http-server

```bash
FROM frankfang128/oh-my-docker:mangosteen

RUN npm i -g http-server
```

## 搭建后端环境

创建 Rails API 的流程

```bash
rvm use 3
# 配置国内加速镜像
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
bundle config mirror.https://rubygems.org https://gems.ruby-china.com

# 安装 rails
gem install rails -v 7.0.2.3 # 成功后提示 35 gem installed

# postgre 驱动
pacman -S postgresql-libs
cd ~/repos

# 创建一个新项目
rails new --api --database=postgresql --skip-test mangosteen-1
code mangosteen-1

# 新建终端
bundle exe rails server # 关闭 bundle server 请按 Ctrl + C
# or bundle exe rails s
# or bin/rails s
```

看到 ActiveRecord::ConnectionNotEstablished 报错后继续

**启动数据库**

在 Windows 命令行中运行一个 docker 作为数据库容器

```bash
# 创建 postgresql
docker run -d --name db-for-mangosteen -e POSTGRES_USER=mangosteen -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=mangosteen_dev -e PGDATA=/var/lib/postgresql/data/pgdata -v mangosteen-data:/var/lib/postgresql/data --network=network1 postgres:14
```

**连接数据库**

修改 database.yml 以下部分内容

```bash
development:
  <<: *default
  database: mangosteen_dev
  username: mangosteen
  password: 123456
  host: db-for-mangosteen
```

修改后重新运行

```bash
bundle exe rails server
```

看到红色 Rails 图标表示成功了

如果运行 `gem install rails -v 7.0.2.3` 有以下错误，可以重新再运行一词

```
cc1: note: unrecognized command-line option ‘-Wno-self-assign’ may have been intended to silence earlier diagnostics
```

## 创建数据表

可以使用建模工具，创建数据模型

```bash
bin/rails g model user email:string name:string
```

上面命令在 xxx 目录创建了两个文件，分别是：`app/models/user.rb`、`db/migrate/20230809075251_create_users.rb`

**同步到数据库**

```bash
bin/rails db:migrate
```

**反悔命令**

如果你运行同步后需要修改表内容，或者之前内容有误，可以运行以下命令撤销，step 表示撤销的步数

```bash
bin/rails  db:rollback step=1
```

运行该命令你会发现它调用了 drop_table，但其实你并没有写该方法，这是 rails 自动根据你的表内容帮你生成的。

## 创建路由

在 `config/routes.rb` 中添加以下内容

```ruby
Rails.application.routes.draw do
  post '/users', to: 'users#create'
  get '/users/:id', to: 'users#show'
end
```

该内容表示，当收到 POST 请求并且路径为 `/users` 时，调用 users 的 create 方法。当收到 GET 请求并且路径为 `/users/:id` 时调用 users 的 show 方法。

**创建 Controller**

添加了对应的路由后，我们要创建对应的方法，也就是 Controller

```bash
bin/rails g controller users show create
```

该命令会在 `config/routes` 下创建两个路由，并在 `app/controllers/users_controller.rb` 中分别创建 show create 方法

删除默认创建的路由，用我们自己写的更精确

```ruby{2-3}
Rails.application.routes.draw do
  get 'users/show'
  get 'users/create'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post '/users', to: 'users#create'
  get '/users/:id', to: 'users#show'
end
```

在两个接口调用的对应方法中添加 log

```ruby
class UsersController < ApplicationController
  def show
    p '你访问了 show'
  end

  def create
    p '你访问了 create'
  end
end
```

重启服务器并测试接口

```sh
bin/rails s

curl -X POST http://127.0.0.1:3000/users
```

如果请求成功，你会在控制台看到 "你访问了 create" 的log

创建用户并存入数据库

```ruby
class UsersController < ApplicationController
  def create
    user = User.new name: 'jack'
    if user.save
      render json: user
    else
      render json: user.errors
    end
  end
end
```

上面的内容表示，创建一个 user 对象，如果保存成功就返回创建的 user 对象，如果失败返回一个 user.errors

添加邮箱验证，在 app/models/user.rb 中添加以下内容，表示验证邮箱

```ruby
class User < ApplicationRecord
  validates :email, presence: true
end
```

重新 curl 会返回

```json
{"email":["can't be blank"]}
```

然后补充 email 方法

```ruby
class UsersController < ApplicationController
  def create
    user = User.new email: 'jack@a.com', name: 'jack'
    if user.save
      render json: user
    else
      render json: user.errors
    end
  end
end
```

再次 curl 会返回以下内容

```json
{"id":1,"email":"jack@a.com","name":"jack","created_at":"2023-08-09T08:40:08.748Z","updated_at":"2023-08-09T08:40:08.748Z"}
```

实现 show 方法

```ruby
class UsersController < ApplicationController
  def create
    ...
  end

  def show
    user = User.find_by_id params[:id]
    if user
      render json: user
    else
      head 404
    end
  end
end
```

其中 find_by_id 是 rails 根据你的数据库生成的查找方法，可以查找用户 id 对应数据，如果找不到就返回 404 响应。

使用 `curl http://127.0.0.1:3000/users/2` 测试该方法，如果 id 不存在，会返回 404

