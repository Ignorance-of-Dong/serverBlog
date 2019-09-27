---
title: js继承的几种方式
date: '3/29/2019 7:56:04 PM '
tag: ['js', 'extend']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## js继承的几种方式

### 构造函数继承

> 在构造函数内部调用被继承对象的构造函数，，使用call将this传入

	function Parent() {
	  this.name = 'parent';
	}
	function Child() {
	  Parent.call(this);
	  this.type = 'child';
	}

**缺点：**

> 只能实现部分继承。不能继承构造函数原型上的属性和方法，应为本身的原型对象没有被修改

### 原型链继承

> 把原型修改为继承对象的实例化对象

	function Parent() {
	  this.name = 'parent';
	}
	function Child() {
	  this.type = 'child';
	}
	Child.prototype = new Parent();

**缺点：**

> 不能继承构造函数内部的属性和方法
> 
> 不能像构造函数内部参数进行初始化

### 原型链+构造函数继承

	function Parent() {
	  this.name = 'parent5';
	  this.play = [1, 2, 3];
	}
	
	function Child() {
	  Parent.call(this);
	  this.type = 'child5';
	}
	// 产生一个中间对象隔离`Child`的`prototype`属性和`Parent`的`prototype`属性引用的同一个原型。
	Child.prototype = Object.create(Parent.prototype); 
	// 给Child的原型对象重新写一个自己的constructor。
	Child.prototype.constructor = Child;
