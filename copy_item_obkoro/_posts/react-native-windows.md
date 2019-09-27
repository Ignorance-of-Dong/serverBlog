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

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac53a029f21cef?w=1120&h=832&f=png&s=95442)

----------

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac53a85d5f3b9e?w=972&h=906&f=png&s=96769)

----------

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac53abc1d18316?w=597&h=431&f=png&s=119274)

----------
![](https://user-gold-cdn.xitu.io/2019/5/17/16ac53b0e2532235?w=578&h=402&f=png&s=68341)

----------

**傻瓜式操作**

### 接下来是配置环境变量
> 小娜搜索

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac53e698edd661?w=395&h=643&f=png&s=18439)

----------
![](https://user-gold-cdn.xitu.io/2019/5/17/16ac53ea7a5f1bdd?w=476&h=597&f=png&s=17213)

----------
![](https://user-gold-cdn.xitu.io/2019/5/17/16ac53f225f79e15?w=497&h=442&f=png&s=79566)

----------

变量名：JAVA_HOME
变量值：当然是你安装的jdk目录了

> 编辑Path变量值

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac540194bc0fed)

在Path值的前头加上 %JAVA_HOME%\bin;

> CLASSPATH变量

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac541378544e85?w=497&h=477&f=png&s=80762)

----------
看一下如果你的系统变量中没有CLASSPATH变量，就新建一个输入变量值 
	
	.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;

> 测试

好了，现在我们来测试一下我们的环境变量是否配置成功 “开始”--“cmd”打开我们的dos命了窗口输入 

	javac
![](https://user-gold-cdn.xitu.io/2019/5/17/16ac542bb8c5cbba?w=982&h=502&f=png&s=34757)

----------

### 安装Android Studio

**地址： [http://www.android-studio.org/](http://www.android-studio.org/ "http://www.android-studio.org/")**

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac5444876415ac?w=1153&h=486&f=png&s=56038)

----------
> 现在的安装包一般没有sdk安装，直接下一步，不要慌
![](https://user-gold-cdn.xitu.io/2019/5/17/16ac5463f5118097?w=576&h=429&f=png&s=118282)

----------
![](https://user-gold-cdn.xitu.io/2019/5/17/16ac5466b0edfb11?w=576&h=432&f=png&s=131383)

----------
![](https://user-gold-cdn.xitu.io/2019/5/17/16ac5469303d386a?w=631&h=434&f=png&s=112287)

----------
**成功安装后，**

### Android Studio配置

加载本地配置信息提示

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac548b4d2e1eed?w=604&h=269&f=png&s=85962)

**刚开始打开的时候会问我们是否加载本地的配置信息，其实就是android studio的配置环境信息等，如果你以前没有用过，忽略掉就好了。直接按默认的点ok启动android studio**

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac548e583c78f9?w=491&h=167&f=png&s=58615)

----------

**接下来如果还有，直接Cancel**

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac54a96ad25218?w=743&h=551&f=png&s=132751)

----------
**这时候我们需要sdk**

附上链接[https://www.androiddevtools.cn/](https://www.androiddevtools.cn/ "https://www.androiddevtools.cn/")

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac55115c25f5eb?w=1494&h=591&f=png&s=100088)

----------
![](https://user-gold-cdn.xitu.io/2019/5/17/16ac5513747b3c50?w=1504&h=818&f=png&s=127936)

----------
> 安装完以后是这个样子

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac55182056b63c?w=700&h=491&f=png&s=50269)

----------

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac551a6c90729f?w=691&h=486&f=png&s=38808)

----------

### 设置sdk的环境变量

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac55678aff6344?w=623&h=654&f=png&s=30025)

----------

**设置adb环境变量【用来链接手机，这里不过多阐述】**

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac554aa0142a67?w=634&h=638&f=png&s=38470)

----------

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac554d59cf5e1c?w=527&h=554&f=png&s=37412)

----------

**验证**

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac5581edfc2747?w=966&h=500&f=png&s=33355)

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

- ![](https://user-gold-cdn.xitu.io/2019/5/24/16ae93bd5f159a13?w=977&h=513&f=png&s=16381)

----------
**然后重新输入命令 react-native run-android 来初始化运行项目，程序首先会解压 gradle 压缩文件，第一次初始化可能需要一点时间：**

**初始化完成后，项目运行成功，可以在手机上看到如下界面：**

![](https://user-gold-cdn.xitu.io/2019/5/24/16ae93c8315f8b68?w=180&h=360&f=png&s=12186)

----------
> 到现在为止，一个环境就搭建完成了，中还有少许挫折，但是还是成功了。。。。。。。。。