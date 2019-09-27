---
title: node配置
date: '3/28/2019 9:21:19 AM '
tag: ['node', 'linux服务器配置']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# node配置

## 一、安装node： ##

> 1.下载并安装NVM脚本

    curl https://raw.githubusercontent.com/creationix/nvm/v0.13.1/install.sh | bash
    source ~/.bash_profile


> 2.列出所需要的版本

    nvm list-remote

> 3.安装相应的版本

    nvm install v8.3.0

> 4.查看已安装的版本

    nvm list

> 5.切换版本


    nvm use v8.3.0

> 6.设置默认版本


    nvm alias default v8.3.0