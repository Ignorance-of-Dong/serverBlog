---
title: Vue transfrom属性
date: '2019-01-27 13:40:31'
tag: ['transfrom', 'vue']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# Vue transfrom属性

## vue中的动画可以使用transfrom组件完成

### transfrom组件提供两个过渡状态

> 进入 enter

> 离开 leave

### 每个状态有三个步骤【自动添加类名 v代表的是transfrom组件上的name属性指定的值】
- v-enter v-enter-active v-enter-to
- v-leave v-leave-active v-leave-to

> ### 通过结合css过渡动画和关键帧动画可以实现切换动画

### 动画触发场景

1. 跟组件初始化渲染
2. v-show，v-if，component动态组件切换的时候
3. router-view 路由切换的时候

### transfrom 组件还可以通过属性去改变不同状态自动添加的class类名

- enter-active-class="animated slideInDown"
- leave-active-class="animated bounceOutDown"

### 这种方式适合配合第三方动画库实现动画

	<transition
	v-on:before-enter="berforeEnter"			//可以做一些初始化样式设置
	v-on:enter="enter"							//执行js操作dom完成的动画效果
	v-on:after-enter="afterEnter"				//动画执行结束（也就是在enter中调用了done函数）
	v-on:enter-cancelled="enterCancelled"		动画还没有结束，就执行下一次动画了，这时候不会触发动画结束，而是触发这个时间（取消）
	v-on:before-leave="beforeLeave"
	v-on:leave="leave"
	v-on:after-leave="afterLeave"
	v-on:leave-cancelled="leaveCancelled"	
	>
	<!--...-->
	</transition>