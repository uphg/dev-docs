# 部署到云服务器

首先在本地 Dokcer 环境运行以下命令，将服务器 IP 添加到 host

```bash
~/r/mangosteen-1 # ❯❯❯ echo "xxx.xxx.xxx.xx server1" >> /etc/hosts
```

## 一键部署命令

在 rails 项目创建 `bin/pack_for_remote.sh` 文件，添加：

```ruby
# 注意修改 user 和 ip
user=mangosteen
ip=123.126.226.91

time=$(date +'%Y%m%d-%H%M%S')
cache_dir=tmp/deploy_cache
dist=$cache_dir/mangosteen-$time.tar.gz
current_dir=$(dirname $0)
deploy_dir=/home/$user/deploys/$time
gemfile=$current_dir/../Gemfile
gemfile_lock=$current_dir/../Gemfile.lock
vendor_cache_dir=$current_dir/../vendor/cache

function title {
  echo 
  echo "###############################################################################"
  echo "## $1"
  echo "###############################################################################" 
  echo 
}


title '打包源代码为压缩文件'
mkdir $cache_dir
bundle cache
tar --exclude="tmp/cache/*" --exclude="tmp/deploy_cache/*" -czv -f $dist *
title '创建远程目录'
ssh $user@$ip "mkdir -p $deploy_dir/vendor"
title '上传压缩文件'
scp $dist $user@$ip:$deploy_dir/
yes | rm $dist
scp $gemfile $user@$ip:$deploy_dir/
scp $gemfile_lock $user@$ip:$deploy_dir/
scp -r $vendor_cache_dir $user@$ip:$deploy_dir/vendor/
title '上传 Dockerfile'
scp $current_dir/../config/host.Dockerfile $user@$ip:$deploy_dir/Dockerfile
title '上传 setup 脚本'
scp $current_dir/setup_remote.sh $user@$ip:$deploy_dir/
title '上传版本号'
ssh $user@$ip "echo $time > $deploy_dir/version"
title '执行远程脚本'
ssh $user@$ip "export version=$time; /bin/bash $deploy_dir/setup_remote.sh"
```

其中

- `current_dir=$(dirname $0)` 当前目录，也就是 bin 目录
- `gemfile=$current_dir/../Gemfile` 获取根目录的 Gemfile
- scp 命令：ssh 拷贝命令，将本地文件拷贝至指定远程服务器。

创建 `bin/setup_remote.sh` 文件

```bash
user=mangosteen
root=/home/$user/deploys/$version
container_name=mangosteen-prod-1
db_container_name=db-for-mangosteen

function set_env {
  name=$1
  hint=$2
  [[ ! -z "${!name}" ]] && return
  while [ -z "${!name}" ]; do
    [[ ! -z "$hint" ]] && echo "> 请输入 $name: $hint" || echo "> 请输入 $name:"
    read $name
  done
  sed -i "1s/^/export $name=${!name}\n/" ~/.bashrc
  echo "${name} 已保存至 ~/.bashrc"
}
function title {
  echo 
  echo "###############################################################################"
  echo "## $1"
  echo "###############################################################################" 
  echo 
}

title '设置远程机器的环境变量'
set_env DB_HOST
set_env DB_PASSWORD
set_env RAILS_MASTER_KEY

title '创建数据库'
if [ "$(docker ps -aq -f name=^${DB_HOST}$)" ]; then
  echo '已存在数据库'
else
  docker run -d --name $DB_HOST \
            --network=network1 \
            -e POSTGRES_USER=mangosteen \
            -e POSTGRES_DB=mangosteen_production \
            -e POSTGRES_PASSWORD=$DB_PASSWORD \
            -e PGDATA=/var/lib/postgresql/data/pgdata \
            -v mangosteen-data:/var/lib/postgresql/data \
            postgres:14
  echo '创建成功'
fi

title 'docker build'
docker build $root -t mangosteen:$version

if [ "$(docker ps -aq -f name=^mangosteen-prod-1$)" ]; then
  title 'docker rm'
  docker rm -f $container_name
fi

title 'docker run'
docker run -d -p 3000:3000 \
           --network=network1 \
           --name=$container_name \
           -e DB_HOST=$DB_HOST \
           -e DB_PASSWORD=$DB_PASSWORD \
           -e RAILS_MASTER_KEY=$RAILS_MASTER_KEY \
           mangosteen:$version

echo
echo "是否要更新数据库？[y/N]"
read ans
case $ans in
    y|Y|1  )  echo "yes"; title '更新数据库'; docker exec $container_name bin/rails db:create db:migrate ;;
    n|N|2  )  echo "no" ;;
    ""     )  echo "no" ;;
esac

title '全部执行完毕'
```

其中

- set_env 表示在 `.bashrc` 中设置对应名称的环境变量

添加可执行权限

```bash
$ chmod +x bin/pack_for_remote.sh bin/setup_remote.sh
```

## 优化 Dockerfile 加速 bundle build

修改 `config/host.Dockerfile （让 bundle 使用缓存的依赖）如下

```bash
FROM ruby:3.0.0

ENV RAILS_ENV production
RUN mkdir /mangosteen
RUN bundle config mirror.https://rubygems.org https://gems.ruby-china.com
WORKDIR /mangosteen
ADD Gemfile /mangosteen
ADD Gemfile.lock /mangosteen
ADD vendor/cache /mangosteen/vendor/cache
RUN bundle config set --local without 'development test'
RUN bundle install --local

ADD mangosteen-*.tar.gz ./
ENTRYPOINT bundle exec puma
```

运行 

```bash
$ bin/pack_for_remote.sh
```

运行后，会提示以下输入

```bash
> 请输入 DB_HOST:
db-for-mangosteen
DB_HOST 已保存至 ~/.bashrc
> 请输入 DB_PASSWORD:
123456
DB_PASSWORD 已保存至 ~/.bashrc
> 请输入 RAILS_MASTER_KEY:
xxx
RAILS_MASTER_KEY 已保存至 ~/.bashrc
```

然后到浏览器测试

- 输入 `http://125.62.24.71:3000` 返回 Hello!
- 输入 `http://125.62.24.71:3000/api/v1/items` 返回对应项数据 `{ pager: {...} }`

## 关于报错

### 报错 `mangosteen@116.62.24.71: Permission denied (publickey)`

表示当前环境没有配置 ssh key，首先将当前 windows 的 ssh key 拷贝至该环境，然后将 Docker 中的文件权限配置为只读

```bash
# 将文件设置为只读
chmod 400 id_rsa id_rsa.pub
```

### 报错 `docker: Error response from daemon: network network1 not found`

需要创建网络 network1，如下

```bash
docker network create network1
```

### 报错 `Error response from daemon: Container xxx is not running`

表示数据库未运行，运行即可

```bash
docker start db-for-mangosteen
```