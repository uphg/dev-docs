# Docker 操作手册

## docker start

启动一个或多个已停止的容器

```bash
docker start [options] container [container...]
```

## docker stop

停止一个或多个正在运行的容器

```bash
docker stop [options] container [container...]
```

## docker ps

查看容器状态

```bash
docker ps [options]
```

### 选项

| 选项      | 缩写 | 描述                                           |
| --------- | ---- | ---------------------------------------------- |
| `--all`   | `-a` | 显示所有容器，包括未启动的（默认显示刚刚运行） |
| `--last`  | `-n` | 显示上次创建的容器                             |
| `--quiet` | `-q` | 仅显示容器 ID                                  |


## docker exec

在正在运行的容器中执行命令。

```bash
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

docker 查看日志

```bash
# 进入容器的 bash
docker exec -it 容器名称 bash

# 查看日志
tail -f log/production.log
```