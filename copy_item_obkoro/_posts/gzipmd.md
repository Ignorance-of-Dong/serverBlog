---
title: 开启nginx服务器压缩Gzip
date: '3/28/2019 11:03:27 AM '
tag: ['nginx', 'gzip']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# 开启nginx服务器压缩

> nginx.conf(加入以下配置即可)

	server{
	  listen       80;
	  server_name  my.ignorantscholar.cn;
	  
	  gzip on;
	  gzip_min_length 1k;
	  gzip_buffers 4 16k;
	  #gzip_http_version 1.0;
	  gzip_comp_level 8;
	  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
	  gzip_vary off;
	  gzip_disable "MSIE [1-6]\.";
	
	  location / {
	       proxy_pass http://127.0.0.1:3001;
	  }
	}

> 在浏览器端查看是否开启可压缩

#### Network 查看请求的Headers头，

	Accept-Encoding: gzip

#### 即开启了压缩