---
title: React-Native填坑之删除第三方开源组件的依赖包
date: '5/24/2019 6:06:52 PM '
tag: ['react-native']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## React-Native填坑之删除第三方开源组件的依赖包

**今天遇到了一个问题：下载了react-native-webview的开源组件，可是在Android中遇到了问题，编译不通过，我想删除这个组件，然后写其他的功能，以后再添加这个地图功能，可是发现无法删除干净，android和ios原生都编译失败。就这个问题研究了下，现将方法卸载下面：**

	npm uninstall -s -D -O react-native-webview

----------
> 进入Android目录，找到setting.gradle文件

	删除所有有关该包的依赖

----------
> 然后进入android/app目录下，打开build.gradle

	删除所有有关该包的依赖

----------

> 打开android/app/src/main/java/com/包名/MainApplication.java,

	删除所有有关该包的依赖

----------
> 然后终端运行

	npm install
	react-native run-android

----------
> 成功！！！