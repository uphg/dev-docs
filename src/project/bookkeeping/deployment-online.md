# 部署上线

## 购买服务器

首先要购买云服务器。

- 阿里云目前市场份额最高，服务响应及时，但价格不美。
- 腾讯云目前市场份额较低，但优惠力度大。
- 通常新用户较便宜，所以最好买一年到三年。

## 配置服务器

**用户登录**

- 购买服务器后，需要使用 ssh 登录。
- 不推荐使用「用户名 + 密码」登录，容易忘，且不安全。
- 推荐使用 ssh-copy-id 上传公钥，使用 ssh 登录。具体搜索创建密钥对。如下

```bash
# 首次运行以下命令登录
ssh-copy-id root@123.123.123.20

# 之后使用 ssh 登录
ssh root@123.123.123.20
```

**关于防火墙**

- 配置好远程服务器后，需要开启端口测试。
- 推荐开启测试端口，如 3000、3001、5000、8000、8080。
- 自行选择是否开启重要端口，因为需要备案，如 80、443。

### ssh 自动断开解决方法

ssh 终端会在登录后没有任何操作时自动端口。

解决方法：登录云主机，对 ssh 配置文件进行编辑，输入以下命令

```bash
nano /etc/ssh/sshd_config
```

找到 ClientAliveInterval，这个参数是 SSH 连接维持的时间，数值是秒，可以自行设置。

例如：

- **ClientAliveInterval 300**：表示 300 秒，即 5 分钟超时。
- **ClientAliveCountMax 5**，表示允许超时5次。

修改后 `:wq` 保存并退出，然后运行重启 ssh 命令：

```bash
service sshd restart # 重启

# or
service sshd stop # 停止
service sshd start # 启动
```

以上配置完成后，使用 root 用户登录远程主机，注册当前项目账户，一般名称为 

```bash
adduser mangosteen
```

创建一个名称为 mangosteen 的用户（创建时除了密码都可以直接回车跳过）。并且会创建一个 mangosteen 用户组，将 mangosteen 用户放入 mangosteen 用户组。

### 安装 docker

- 参考教程：[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/#installation-methods)
- 注意安装时，root 用户不需要 sudo 命令，安装 Install Docker Engine 后完成。

###  配置用户权限

- 推荐只在 root 用户里安装 Docker 即可
- 每个应用创建一个独立用户，并加入 docker 用户组。切忌用 root 管理所有应用


在 docker 用户组中添加 mangosteen 用户，这样用户才能使用 docker，如下：

```bash
usermod -a -G docker mangosteen
```

- 可以通过查看 `/etc/shadow` 文件来查看系统中存在的所有用户。
- 可以通过查看 `/etc/group` 文件来查看系统中存在的所有用户组。

然后退出 ssh 登录（运行 exit 回车，或者 Ctrl + D）

**配置用户登录公钥**

使用 mangosteen 用户登录时，需要重新配置 ssh 权限，依次运行以下命令

```bash
# 用 root 用户重新登录 ssh，将 root 用户
$ ssh root@123.123.123.20

# 创建 .ssh 目录
$ mkdir /home/mangosteen/.ssh

# 进入 ssh 配置文件夹
$ cd ~/.ssh/

# 将 root 用户的配置拷贝至 mangosteen 用户
$ cp ./authorized_keys /home/mangosteen/.ssh

# 将文件权限转交给 mangosteen 用户
$ cd /home/mangosteen

# -R 表示递归遍历当前目录
$ chown -R mangosteen:mangosteen .ssh
```

## 配置后端生产环境

首先在首页添加一个返回内容，打开 `config/routes.rb` 添加

```ruby
Rails.application.routes.draw do

  get '/', to: 'home#index'

  ...
end
```

运行 `bin/rails g controller home index` 生成对应方法，并添加以下返回内容

```ruby
class HomeController < ApplicationController
  def index
    render json: { message: 'Hello!' }
  end
end
```

### 创建打包脚本

创建 `bin/pack_for_host.sh` 文件（用于打包当前项目至生产环境），添加以下内容

```bash
# 注意修改 oh-my-env 目录名为你的目录名
dir=oh-my-env

time=$(date +'%Y%m%d-%H%M%S')
dist=tmp/mangosteen-$time.tar.gz
current_dir=$(dirname $0)
deploy_dir=/workspaces/$dir/mangosteen_deploy

yes | rm tmp/mangosteen-*.tar.gz; 
yes | rm $deploy_dir/mangosteen-*.tar.gz; 

tar --exclude="tmp/cache/*" -czv -f $dist *
mkdir -p $deploy_dir
cp $current_dir/../config/host.Dockerfile $deploy_dir/Dockerfile
cp $current_dir/setup_host.sh $deploy_dir/
mv $dist $deploy_dir
echo $time > $deploy_dir/version
echo 'DONE!'
```

其中

- time 表示当前时间
- dist 在 tmp 目录中将当前项目打包为 mangosteen-$time.tar.gz 文件
- 两个 `yes | rm ...` 表示删除之前的文件
- `tar --exclude="tmp/cache/*" -czv -f $dist *` tmp/cache 不打包。
- 其他不以 . 开头的文件打包至 dist，* 表示所有不以 . 开头的文件。

### 创建 host.Dockerfile

```bash
FROM ruby:3.0.0

ENV RAILS_ENV production
RUN mkdir /mangosteen
RUN bundle config mirror.https://rubygems.org https://gems.ruby-china.com
WORKDIR /mangosteen
ADD mangosteen-*.tar.gz ./
RUN bundle config set --local without 'development test'
RUN bundle install
ENTRYPOINT bundle exec puma
```

上面的内容表示

- `FROM ruby:3.0.0` 表示 ruby v3.0.0 镜像环境（通过搜索 docker ruby 查找对应版本镜像）。
- `ENV RAILS_ENV production` 设置当前环境为生产环境
- `WORKDIR /mangosteen` 配置工作目录
- `ADD mangosteen-*.tar.gz ./` 表示拷贝的项目压缩包，并且解压至当前目录（ADD 会自动解压缩 .tar 包）
- `RUN bundle config set --local without 'development test'` 配置不要安装开发和测试环境
- `RUN bundle install` 安装当前环境包
- `ENTRYPOINT bundle exec puma` 可运行“光盘”，`ENTRYPOINT` 表示当你运行 docker run 时运行这句话。

### 添加 docker 运行脚本

创建 `bin/setup_host.sh` 文件，添加以下内容

```bash
DB_PASSWORD=123456
container_name=mangosteen-prod-1

version=$(cat mangosteen_deploy/version)

echo 'docker build ...'
docker build mangosteen_deploy -t mangosteen:$version
if [ "$(docker ps -aq -f name=^mangosteen-prod-1$)" ]; then
  echo 'docker rm ...'
  docker rm -f $container_name
fi
echo 'docker run ...'
docker run -e DB_HOST=$DB_HOST -e RAILS_MASTER_KEY=$RAILS_MASTER_KEY -d -p 3000:3000 --network=network1 -e DB_PASSWORD=$DB_PASSWORD --name=$container_name mangosteen:$version
echo 'DONE!'
```

上面变量的含义为

- `DB_PASSWORD=123456` 数据库密码
- `container_name=mangosteen-prod-1` 容器名称
- `version` 版本
- `DB_HOST` 代表数据库名称，`DB_PASSWORD` 代表数据库密码，`RAILS_MASTER_KEY` 代表 `config/credentials/production.key`

然后运行

```bash
# 修改 bash 文件执行权限
$ chmod +x bin/*.sh

# 运行项目打包脚本
$ ./bin/pack_for_host.sh
```

### 总结主要流程

- 准备一个新用户
- 准备好 Docker
- 上传 Dockerfile
- 上传源代码
- 用 Dockerfile 构建运行环境
- 在运行环境里运行源代码
- 使用 Nginx 做转发

### 如何更新版本？

- 上传新 Dockerfile
- 上传新源代码
- 用 Dockerfile 构建新运行环境
- 在新环境运行新代码
- 使用 Nginx 做转发
