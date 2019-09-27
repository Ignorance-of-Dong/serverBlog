---
title: Vue构造器及其实例化概念
date: '1/28/2019 8:25:44 PM '
tag: ['vue构造器', 'vue', 'vue extend']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# Vue构造器及其实例化概念

----------


## Vue构造器

## [附官方文档](https://cn.vuejs.org/v2/api/#Vue-extend)

> ### 简单介绍

### Vue.extend(options)

#### **参数**: 对象

#### **用法**: 使用Vue构造器，创建一个“子类”，参数是一个包含组件选项的对象，其中,data选项中必须是函数

#### **描述**：Vue.extend返回的是一个“扩展实例构造器”，也就是预设了部分选项的Vue的实例构造器，它常常服务于Vue.component用来生成组件，可以简单理解为当在模板中遇到该组件作为标签的自定义元素时，会自动调用“扩展实例构造器”来生产组件实例，并挂在到自定义元素上


> ### 简单举例

#### 自定义无参数标签

下面的代码中的author就是返回的“扩展实例构造器”

	var author = Vue.extend({
	 template: "<p><a :href='url'>{{author}}</a></p>",
	 data : function() {
	  return {
	   author : 'vamous',
	   url : 'http://blog.csdn.net/Dear_Mr/article/details/72614370'
	  }
	 }
	});

###对应的html如下：

	<author></author>

### 此时的页面必然是没有任何效果的，因为扩展实例构造器还需要挂载，如下

	new author().$mount('author');

### 使用propsData

	var author = Vue.extend({
	 template: "<p><a :href='url'>{{author}} & {{name}}</a></p>",
	 data : function() {
	  return {
	   author : 'vamous',
	   url : 'http://blog.csdn.net/Dear_Mr/article/details/72614370'
	  }
	 },
	 props : ['name']
	});
	 
	new author({propsData: {name : 'dear_mr'}}).$mount('#author');

### 可以利用propsData传递参数

**挂载在普通标签上**

返回的扩展实例构造器的方式和上面还是一样的，只是html里不再是自定义标签，而是一个普通标签，比如div

	<div id="author"></div>

	new author().$mount('author');

其实对于同一个扩展构造器而言，它的每一个实例其实是可以挂载到不同的标签上的，比如我可以这样

	new author().$mount('#author');

	new author().$mount('author');

这两个标签的内容会一同显示，结果一样

## 总结

> **Vue。extend(object)//扩展的子类需要Vue实例化才能使用，如果需要传递props，需要在new的时候通过propsData传递**


----------


> 
> $mount()手动执行组件的渲染，如果传递一个选择器，就会渲染选择器内部，如果传递只会生成dom不会执行渲染，需要手动将el挂载到页面


----------


> **$destroy()手动销毁组件，但是如果将dom移动将不会销毁dom，需要手动销毁**
> 

----------


> **$nextTick()生命周期updated的替代方案，因为在updated中只是得知组件需要重新渲染，但并不知道是哪个属性改变了，而nextTick()当属性改变并且渲染完成的回调，类似于react中的setState的回调函数**
> 

----------


    适用场景
    
    使用扩展子类方式创建的组件适合开发使用api的方法调用

## 以上就是对Vue.extend构造器的实例详解