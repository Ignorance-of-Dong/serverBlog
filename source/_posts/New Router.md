---
title: vue-router路由
date: '1/28/2019 8:31:06 PM  '
tag: ['vue-router', 'vue']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# 路由

## 路由传参(query,params)

#### 在单页面应用中路由的传递方式常用的两种方法、(query,params)

> ### query

#### 包含在路径后面以？作为分割符，多参数直接使用&分割开发，名字和值使用=分隔，这种方式适合传递不必须的值，传递和不传递都不会影响页面的加载

> ### params

#### 包含在路由路径之中，这种方式是框架内部的参数传递实现的，这种方式适合传递必须传递的值(/detail/:id) (/detail/11213),可以出现在路径中的任何位置

> ### 如何获取($router)

#### 在vue中路由参数通过，$route获取，$route.params获取params传递的参数，$route.query获取query传递的参数，而$route就是代表的是当前页面的路由信息对象

###而$router是获取的是路由实例，$route只是$router中一个参数的指针而已（）

## 常识：

- **1.router-link组件是用来跳转路由的，to属性是将要跳转的路由页地址。**

- **2.router-view组件是用来展示组件页的。**