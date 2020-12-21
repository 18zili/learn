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
