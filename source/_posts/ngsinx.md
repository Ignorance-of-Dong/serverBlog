---
title: centos7中搭建nginx服务器
date: '3/28/2019 9:22:52 AM '
tag: ['nginx', 'linux服务器配置']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# centos7中搭建nginx服务器


> **nginx可以使用各平台的默认包来安装，本文是介绍使用源码编译安装，包括具体的编译参数信息。
正式开始前，编译环境gcc g++ 开发库之类的需要提前装好，这里默认你已经装好。**

### centos平台编译环境使用如下指令

> 安装make：

 

	yum -y install gcc automake autoconf libtool make

 

> 安装g++:

 

	yum install gcc gcc-c++

 

## 下面正式开始：

### 一般我们都需要先装pcre, zlib，前者为了重写rewrite，后者为了gzip压缩。

**注：下面所使用的所有版本均为截止2017年8月14号，最新版本**

> 1.选定源码目录
> 可以是任何目录，本文选定的是/usr/local/src

	cd /usr/local/src

 

> 2.安装PCRE库
> ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/ 下载最新的 PCRE 源码包，使用下面命令下载编译和安装 PCRE 包：

 

	cd /usr/local/src

	wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.41.tar.gz

	tar -zxvf pcre-8.41.tar.gz

	cd pcre-8.41

	./configure

	make

	make install

 

 
> 
> 3.安装zlib库
> http://zlib.net/zlib-1.2.11.tar.gz 下载最新的 zlib 源码包，使用下面命令下载编译和安装 zlib包：

 


	cd /usr/local/src

	wget   http://zlib.net/zlib-1.2.11.tar.gz

	tar -zxvf zlib-1.2.11.tar.gz

	cd zlib-1.2.11

	./configure

	make

	make install

 

> 4.安装ssl（某些vps默认没装ssl)

 

	cd /usr/local/src

	wget https://www.openssl.org/source/openssl-1.0.2l.tar.gz

	tar -zxvf openssl-1.0.2l.tar.gz

 

> 5.安装nginx

**Nginx 一般有两个版本，分别是稳定版和开发版，您可以根据您的目的来选择这两个版本的其中一个，下面是把 Nginx 安装到 /usr/local/nginx 目录下的详细步骤：**

 

	cd /usr/local/src

	wget http://nginx.org/download/nginx-1.13.4.tar.gz
	
	tar -zxvf nginx-1.13.4.tar.gz

	cd nginx-1.13.4

 

	./configure --sbin-path=/usr/local/nginx/nginx

	--conf-path=/usr/local/nginx/nginx.conf

	--pid-path=/usr/local/nginx/nginx.pid

	--with-http_ssl_module

	--with-pcre=/usr/local/src/pcre-8.41

	--with-zlib=/usr/local/src/zlib-1.2.11

	--with-openssl=/usr/local/src/openssl-1.0.2l

 

	make

	make install

 

>  --with-pcre=/usr/local/src/pcre-8.41 指的是pcre-8.41 的源码路径。
> --with-zlib=/usr/local/src/zlib-1.2.11 指的是zlib-1.2.11 的源码路径。

 

> 安装成功：

**安装成功后 /usr/local/nginx 会有此目录**

 

 

> 6.启动

**确保系统的 80 端口没被其他程序占用，运行/usr/local/nginx/nginx 命令来启动 Nginx，**

 

> 打开浏览器访问此机器的 IP，如果浏览器出现 Welcome to nginx! 则表示 Nginx 已经安装并运行成功。
> 
> 
> 到这里nginx就安装完成了，如果只是处理静态html就不用继续安装了
> 
> 如果你需要处理php脚本的话，还需要安装php-fpm。

 

 

## 常见错误：

附：可能遇到的错误和一些帮助信息

1.1编译pcre错误

 
	
	make[1]: Leaving directory `/usr/local/src/pcre-8.34'
	
	make: *** [all] Error 2

 

> 解决办法：安装g++,别忘了重新configure

 

	apt-get install g++
	
	apt-get install build-essential
	
	make clean
	
	./configure
	
	make

 

 

> 1.2 make出错

 

	make: *** No targets specified and no makefile found.  Stop.

 

**按照下面安装方法**


    yum -y install openssl openssl-devel


> 2.nginx编译选项（下面代码必须在一行）

 

    ./configure --sbin-path=/usr/local/nginx/nginx
    
    --conf-path=/usr/local/nginx/nginx.conf
    
    --pid-path=/usr/local/nginx/nginx.pid
    
    --with-http_ssl_module
    
    --with-pcre=/usr/local/src/pcre-8.41
    
    --with-zlib=/usr/local/src/zlib-1.2.11
    
    --with-openssl=/usr/local/src/openssl-1.0.2l
    
