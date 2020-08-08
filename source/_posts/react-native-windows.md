---
title: 使用react-native基础环境搭建
date: '5/22/2019 6:06:58 PM '
tag: ['react-native']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## 使用react-native基础环境搭建

## Android Studio开发window环境搭建 

### Android 开发环境搭建 

**下载jdk** 
> 在这里你可以点击[链接](https://www.oracle.com/technetwork/java/javase/downloads/index.html)去下载


**操作步骤按照下图进行操作**


>  点进去以后是这么个页面

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.0.png)

----------

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.1.png)

----------

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.2.png)

----------
![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.3.png)

----------

**傻瓜式操作**

### 接下来是配置环境变量
> 小娜搜索

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.4.png)

----------
![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.5.png)

----------
![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.6.png)

----------

变量名：JAVA_HOME
变量值：当然是你安装的jdk目录了

> 编辑Path变量值

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.7.png)

在Path值的前头加上 %JAVA_HOME%\bin;

> CLASSPATH变量

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.8.png)

----------
看一下如果你的系统变量中没有CLASSPATH变量，就新建一个输入变量值 
	
	.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;

> 测试

好了，现在我们来测试一下我们的环境变量是否配置成功 “开始”--“cmd”打开我们的dos命了窗口输入 

	javac
![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.9.png)

----------

### 安装Android Studio

**地址： [http://www.android-studio.org/](http://www.android-studio.org/ "http://www.android-studio.org/")**

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.10.png)

----------
> 现在的安装包一般没有sdk安装，直接下一步，不要慌
![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.11.png)

----------
![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.12.png)

----------
![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.13.png)

----------
**成功安装后，**

### Android Studio配置

加载本地配置信息提示

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.14.png)

**刚开始打开的时候会问我们是否加载本地的配置信息，其实就是android studio的配置环境信息等，如果你以前没有用过，忽略掉就好了。直接按默认的点ok启动android studio**

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.15.png)

----------

**接下来如果还有，直接Cancel**

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.16.png)

----------
**这时候我们需要sdk**

附上链接[https://www.androiddevtools.cn/](https://www.androiddevtools.cn/ "https://www.androiddevtools.cn/")

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.17.png)

----------
![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.18.png)

----------
> 安装完以后是这个样子

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.19.png)

----------

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.20.png)

----------

### 设置sdk的环境变量

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.21.png)

----------

**设置adb环境变量【用来链接手机，这里不过多阐述】**

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.22.png)

----------

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.23.png)

----------

**验证**

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.24.png)

----------

**基础环境以搭建完成**

> **这里需要着重强调必须node版本为10以上**


> 如何安装node就不都在过多阐述


*** 安装 react-native-cli ***

	npm install -g react-native-cli

**安装完成后，通过 react-native-cli -v 查看版本，确定是否安装成功**

### 初始化项目

**到指定目录下，通过命令行初始化一个项目：**

	react-native init NewProject

随后开始初始化项目，下载资源：

运行项目

来到项目根目录下，通过输入如下命令来运行项目：

	react-native run-android

**输入命令后，项目开始初始化运行，运行过程中会打开一个 node 服务窗口，如下所示：**

- ![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.25.png)

----------
**然后重新输入命令 react-native run-android 来初始化运行项目，程序首先会解压 gradle 压缩文件，第一次初始化可能需要一点时间：**

**初始化完成后，项目运行成功，可以在手机上看到如下界面：**

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/2.26.png)

----------
> 到现在为止，一个环境就搭建完成了，中还有少许挫折，但是还是成功了。。。。。。。。。