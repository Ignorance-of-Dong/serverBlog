---
title: ajax
date: '4/5/2019 9:28:16 PM '
tag: ['js', 'ajax']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## ajax

### 什么是ajax?

**AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。Ajax 是一种用于创建快速动态网页的技术。Ajax 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。**

### 原生js ajax请求有几个步骤？分别是什么

	//创建 XMLHttpRequest 对象
	var ajax = new XMLHttpRequest();
	//规定请求的类型、URL 以及是否异步处理请求。
	ajax.open('GET',url,true);
	//发送信息至服务器时内容编码类型
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
	//发送请求
	ajax.send(null);  
	//接受服务器响应数据
	ajax.onreadystatechange = function () {
	    if (ajax.readyState == 4 && (ajax.status == 200 || ajax.status == 304)) { 
	    }
	};


### ajax几种请求方式？他们的优缺点？

**常用的post,get,delete。**

	 // 代码上的区别
	 1: get通过url传递参数
	 2: post设置请求头  规定请求数据类型

	 // 使用上的区别
	 1: post比get安全(因为post参数在请求体中。get参数在url上面)
	 2: get传输速度比post快 根据传参决定的。 (post通过请求体传参，后台通过数据流接收。速度稍微慢一些。而get通过url传参可以直接获取) 
	 3: post传输文件大理论没有限制  get传输文件小大概7-8k ie4k左右
	 4: get获取数据	post上传数据(上传的数据比较多  而且上传数据都是重要数据。所以不论在安全性还是数据量级 post是最好的选择)

### 优点：

> 1.减轻服务器的负担,按需取数据,最大程度的减少冗余请求
> 
> 2.局部刷新页面,减少用户心理和实际的等待时间,带来更好的用户体验
> 
> 3.基于xml标准化,并被广泛支持,不需安装插件等,进一步促进页面和数据的分离

### 缺点：

> 1.AJAX大量的使用了javascript和ajax引擎,这些取决于浏览器的支持.在编写的时候考虑对浏览器的兼容性.
> 
> 2.AJAX只是局部刷新,所以页面的后退按钮是没有用的.
> 
> 3.对流媒体还有移动设备的支持不是太好等

### 请求头：

	header('Access-Control-Allow-Origin:*');  //支持全域名访问，不安全，部署后需要固定限制为客户端网址

	header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); //支持的http 动作
	
	header('Access-Control-Allow-Headers:x-requested-with,content-type');  //响应头 请按照自己需求添加。