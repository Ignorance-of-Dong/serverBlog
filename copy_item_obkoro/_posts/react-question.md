---
title: React组件销毁中清理异步操作和取消请求
date: '4/3/2019 2:12:32 PM '
tag: ['js', 'react']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## React组件销毁中清理异步操作和取消请求

### 问题描述

**当我们在平时切换组件的时候，会遇到这种情况，如果组件中有异步请求任务，【当接口已经发出请求，但是组件已经销毁，那么接口返回数据后。。。】**

**会有这么一个警告**

> Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

----------
> 翻译： 警告：无法对未安装的组件执行响应状态更新。这是一个禁止操作，但它表示应用程序内存泄漏。要修复，请取消componentwillunmount方法中的所有订阅和异步任务。

### 解决方法

> 情况一: 阻止异步操作

	componentWillUnmount() {
	  this.setState = (state, callback) => {
	    return
	  }
	}

> 情况二: 清除定时

	var timer;
	...
	componentDidMount = () => {
	     timer = setTimeout(() => {
	        this.setState({a:123})
	    },1000)
	}
	componentWillUnMount = () => {
	    clearTimeout(timer)
	}
