---
title: centos7中安装mysql的步骤
date: '3/28/2019 9:22:06 AM '
tag: ['mysql', 'linux服务器配置']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# centos7中安装mysql的步骤


## 一、   安装：

> 1.   下载源码包，一般将源码包放在/usr/local/中；

    cd /usr/local/
    
    mkdir -p tools
    
    cd tools
    
    wget http://repo.mysql.com/mysql57-community-release-el7-8.noarch.rpm

**(这里的版本可以随时去mysql官网进行选择)**

> 2.   查看系统中是否已安装 MySQL 服务

    rpm -qa | grep mysql
    或
    yum list installed | grep mysql

> 3.   如果已安装则删除 MySQL 及其依赖的包：

    yum -y remove mysql-libs.x86_64

> 4.   安装 mysql57-community-release-el7-8.noarch.rpm：

    rpm -ivh mysql57-community-release-el7-8.noarch.rpm

> 安装完后，得到如下两个包：（在/etc/yum.repos.d/文件下）

    mysql-community.repo
    mysql-community-source.repo

> 5.   安装mysql

    $ yum install mysql-server

**根据步骤安装就可以了，不过安装完成后，没有密码，需要重置密码。**
> 
> 6.重置密码：

    mysql -u root；

> 报错：ERROR 2002 (HY000): Can‘t connect to local MySQL server through socket ‘/var/lib/mysql/mysql.sock‘ (2)，原因是/var/lib/mysql的访问权限问题。下面的命令把/var/lib/mysql的拥有者改为当前用户：

    sudo chown -R openscanner:openscanner /var/lib/mysql

> 重启服务：

     service mysqld restart

> 再次登录:

    mysql -u root

> 报错：

> error 1045 (28000):Access denied for user ‘root’ @ ‘localhost’ (using password: NO）

**此种情况是因为存在了默认密码问题，解决：（最保险的是重置root密码）**

> 1、修改 /etc/my.cnf，在 [mysqld] 小节下添加一行：skip-grant-tables=1
> 
> 这一行配置让 mysqld 启动时不对密码进行验证
> 
> 2、重启 mysqld 服务：systemctl restart mysqld
> 
> 3、使用 root 用户登录到 mysql：mysql -u root 
> 
> 4、切换到mysql数据库，更新 user 表：

    update user set authentication_string = password('root'),host='%',password_expired = 'N', password_last_changed = now() where user = 'root';

> 在之前的版本中，密码字段的字段名是 password，5.7版本改为了 authentication_string

> 5、退出 mysql，编辑 /etc/my.cnf 文件，删除 skip-grant-tables=1 的内容
> 
> 6、重启 mysqld 服务，再用新密码登录即可

 

> 7.   开放防火墙：

    vim /etc/sysconfig/iptables

> 添加以下内容：

    -A INPUT -p tcp -m state --state NEW -m tcp --dport 3306 -j ACCEPT

> 保存后重启防火墙：

    $ sudo service iptables restart

> 这样从其它客户机也可以连接上mysql服务了。
> 

----------


> 8.   阿里云安全组设置：

**如果此时在其他客户机上还是链接不上mysql，登录阿里云，查看实例的安全组有没有为3306端口开启规则；**