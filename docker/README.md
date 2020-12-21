# 安装 Docker

连接服务器 `ssh root@ip`

```
# apt升级
sudo apt-get update

# 添加相关软件包
sudo apt-get install \
apt-transport-https \
ca-certificates \
curl \
software-properties-common

# 下载软件包的合法性，需要添加软件源的 GPG 密钥
curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

# source.list 中添加 Docker 软件源
sudo add-apt-repository \
"deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu \
$(lsb_release -cs) \
stable"

# 安装 Docker CE
sudo apt-get update
sudo apt-get install docker-ce

# 启动 Docker CE
sudo systemctl enable docker
sudo systemctl start docker

# 建立 docker 用户组(附加) 用户不是root时
sudo groupadd docker
sudo usermod -aG docker $USER

# Helloworld测试
docker run hello-world
```

镜像加速
Azure 中国镜像 https://dockerhub.azk8s.cn
七牛云加速器 https://reg-mirror.qiniu.com

```
# /etc/docker/daemon.json
{
    "registry-mirrors":[
        "https://dockerhub.azk8s.cn",
        "https://reg-mirror.qiniu.com"
    ]
}
sudo systemctl daemon-reload
sudo systemctl restart docker
```

# 简单 Nginx 服务

```
# 拉取官方镜像 - 面向docker的只读模板
docker pull nginx

# 查看
docker images nginx

# 启动镜像
mkdir www
echo 'hello docker!!' >> www/index.html

# 启动
# www目录里面放一个index.html
docker run -p 8000:80 -v $PWD/www:/usr/share/nginx/html nginx

# 后台启动 会返回一个uuid
docker run -p 80:80 -v $PWD/www:/usr/share/nginx/html -d nginx

# 停止
docker stop [uuid前三位]

# 查看进程
docker ps
docker ps -a // 查看全部

# 伪终端 ff6容器的uuid
docker exec -it [uuid前三位] /bin/bash

# 删除镜像
docker rm [uuid前三位]
```

# Dockerfile 定制镜像

> 镜像的定制实际上就是定制每一层所添加的配置、文件。如果我们可以把每一层修改、安装、构建、操作的命令都写入一个脚本，用这个脚本来构建、定制镜像，那么之前提及的无法重复的问题、镜像构建透明性的问题、体积的问题就都会解决。这个脚本就是 Dockerfile。

### 定制自己的 web 服务器

```
#Dockerfile
FROM nginx:latest RUN echo '<h1>Hello, Kaikeba!</h1>' > /usr/share/nginx/html/index.html
```

```
# 定制镜像 "." 代表Dockerfile在当前目录下
docker build -t nginx:kaikeba .

# 运行
docker run -p 80:80 nginx:kaikeba
```

# 定制 NodeJS 镜像

```
#Dockerfile
#制定node镜像的版本
FROM node:10-alpine

#移动当前目录下面的文件到app目录下
ADD . /app/

#进入到app目录下面，类似cd
WORKDIR /app

#安装依赖
RUN npm install

#对外暴露的端口
EXPOSE 3000

#程序启动脚本
CMD ["node", "app.js"]
```

```
# 定制镜像
docker build -t mynode .

# 运行
docker run -p 3000:3000 -d mynode
```

# 定制 PM2 镜像

Pm2 - 利用多核资源

```
// process.yml
apps: - script : app.js
instances: 2
watch : true
env :
    NODE_ENV: production
```

```
# Dockerfile
FROM keymetrics/pm2:latest-alpine
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm config set registry https://registry.npm.taobao.org/ && \
npm i
EXPOSE 3000

#pm2在docker中使用命令为pm2-docker
CMD ["pm2-runtime", "start", "process.yml"]
```

# Compose 安装

`apt install docker-compose`

```
# docker-compose.yml
version: '3.1'
services:
 hello-world:
 image: hello-world
```

# Compose

## 简介

Compose 项目是 Docker 官方的开源项目，负责实现对 Docker 容器集群的快速编排。

```
#docker-compose.yml
version: '3.1'
services:
 mongo:
  image: mongo
  restart: always # 死机自动重启
  ports:
    - 27017:27017
    mongo-express:
     image: mongo-express
     restart: always
     ports:
      - 8000:8081
```

### 启动

`docker-compose up`
