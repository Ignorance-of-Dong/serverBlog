---
title: vue概述
date: ' 1/25/2019 4:34:55 PM '
tag: ['js', 'vue']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
----------
1/25/2019 4:34:55 PM
### 此文章只是对VUE常用的知识进行了一个简述，详情请[访问官方文档](https://cn.vuejs.org/)

----------

# 什么是vue？

### vue是一个框架(`渐进式开发框架`),其实就是一个框架的名称，其特点是(数据双向绑定，组件开发，单页面路由，指令，插件)

## 什么叫渐进式框架

### 通过开发组件的形式，进行组件的组件的组合，来组合出来的一个页面而已

## 最重要的特性就是组件

### 组件类似于模块，设计组建的目的是为了更好的解耦业务，和模块化的区别就在于(组件的组成包含了(结构，逻辑，样式))而模块只是逻辑

## 组件的特性
- 组建的状态(data,props)
- 组件和组件的通讯
- 自己的生命周期
- 组件的渲染和组件的创建方式

## 设计组件

**组件一般分为，展示组件和受控组件**

----------


> 展示组件：纯粹的展示功能

----------

> 业务组件：单个的业务功能独立出来的组件

----------

> 控件：内置表单元素不能满足网页开发，有一些特殊需要自定义的表单组件，称为控制，一般需要结合v-model去做数据双向绑定的控制

----------

> 容器组件：作为页面的容器，用来管理当前页面的数据，通过数据去控制展示组件的显示

----------

> api组件：通过api形式调用的组件（提示，loading，验证等之类的需要通过js调用方法控制的组件。vue.extend创建）

----------

> 组合式组件：组件和组件之间有特定关系的组件（slot元素作为插槽）

----------

## 如何拆分组件

> 按照设计ui提供的ui图，提取公共展示功能，作为展示组件的提取，在页面开发过程中提取页面中独立业务单独出来业务组件，在表单页面提取公共的非内置表单元素作为控件处理（地区选择，选择日期，选择.....）

## 组件的创建方式
- vue.component(componnetName,option)           (自动渲染)
- 在每一个组件中都有component选项，用来注册局部组件	(自动渲染)
- 通过Vue.extends()扩展子类的形式创建				(手动渲染)

## 组建的实例选项
- @[function] data
- @[object] method
- @[object] compoted
- @[object] watch
- @[object] conponents
- @[function] 生命周期 

		beforeCreated () {}		// 初始化数据之前
		created () {} 			// 数据初始化之后
		beforeMout () {} 		// 开始渲染
		mounted () {} 			// 渲染完成
		beforeUpdate () {} 		// 开始更新 当一个数据的改变引起了视图的重新的渲染才会执行，单独的一个数据改变是不会执行的
		uppdated () {} 			// 更新完成

		//当使用keep-alive组件时才会 执行
		activated () {} 		// 组件启用时
		deactivated () {} 		// 组件停用时

		//组件销毁 v-if销毁组件，或者切换路由(在没有启用缓存的前提)，或者手动执行this.$destroy () {}			// 清理组件中绑定的data，通过v-on绑定事件，如果有手动绑定的内容需要，在这个生命周期中手动销毁
		beforeDestroy () {}
		destroyed () {}

		
		errorCaptured () {}		// 当组件中发生错误时


## 组件的通讯方式

### 通讯创建：父子，子父，同级，跨级

### 通讯其实就是谁用谁的数据

- 父子：子组件使用父组件数据，props(常用)，子组件内部通过$parent
- 子父：父组件使用子组件数据，通过自定事件，子组件通过$emit(事件名称，发送数据)给父组件传递数据(常用)$children $refs
- 同级：代理(一个子组件将数据发送到父级，父在发送到另一个子级)，eventBus vuex
- 跨级：逐层传递，vuex eventsBus

## 组件的嵌套

### 组件内部通过slot内置组件，可以用来承载嵌套组件(单个slot，和命名slot)

## 内置组件

- template 单文件组件中代替了template选项，可以用作一个包裹元素，不会被渲染
- component 动态组件，通过is属性动态渲染某一个组件
- slot 插槽，用来承载组件潜逃的子组件
- transition vue用来实现动画的组件(提供了，进入和离开两个状态)
- transitions-group 用来实现多动画(列表动画，排序，添加，删除)
- keep-alive 用来启动vue缓存功能，缓存组件的状态

## vue的实例属性

	实例属性
	vm.$data 				// 访问定义的data
	vm.$props 				// 访问props对象
	vm.$el 					// 访问组件的根节点
	vm.$options 			// 访问所有配置项
	vm.$parent 				// 访问父组件实例
	vm.$root
	vm.$children
	vm.$slots
	vm.$scopedSlots
	vm.$refs
	vm.$isServer
	vm.$attrs
	vm.$listeners
	实例方法 / 数据
	vm.$watch
	vm.$set
	vm.$delete
	实例方法 / 事件
	vm.$on
	vm.$once
	vm.$off
	vm.$emit
	实例方法 / 生命周期
	vm.$mount
	vm.$forceUpdate
	vm.$nextTick	//数据改变后回调
	vm.$destroy //手动渲染


