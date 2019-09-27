---
title: vue路由的实现原理
date: '4/1/2019 11:15:15 AM '
tag: ['js', 'vue-router', 'vue']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## vue路由的实现原理

> 在vue中路由主要有 hash与History interface两种方式实现前端路由，单页路由的特点就是采用前端路由系统，通过改变URL，在不重新请求页面的情况下，更新页面视图。目前在浏览器环境中这一功能的实现主要有两种方式

### hash

> 在浏览器的url中hash（“#”）符号的本来作用是加在URL中指示网页中的位置：#符号本身以及它后面的字符称之为hash，可通过window.location.hash属性读取。

#### 特点：

> hash虽然出现在URL中，但不会被包括在HTTP请求中。它是用来指导浏览器动作的，对服务器端完全无用，因此，改变hash不会重新加载页面，并且可以为hash的改变添加hashchange监听事件，在一个就是每一次改变hash（window.location.hash），都会在浏览器的访问历史中增加一个记录，我就可以通过他的这几个特点实现一个hash模式的单页路由，通过对location.hash的修改实现push方法（跳转页面），通过对location.href的修改实现replace()方法，通过对hashchange事件的监听实现页面跳转后的数据更新

### History

> History模式则是完全采用了h5的新特性，从HTML5开始，History interface提供了两个新的方法：pushState(), replaceState()使得我们可以对浏览器历史记录栈进行修改，以及popState事件可以监听到状态的变更

**不过history模式有一个问题就是**

> 对于单页应用来讲，理想的使用场景是仅在进入应用时加载index.html，后续在的网络操作通过Ajax完成，不会根据URL重新请求页面，但是如果用户直接在地址栏中输入并回车，浏览器重启重新加载的时候history模式则会将URL修改得就和正常请求后端的URL一样，在此情况下重新向后端发送请求，如后端没有配置对应 的路由处理，则会返回404错误。这种问题的解决，一般情况下我们都是在后端进行配置，将所有的路由请求都指向index.html文件



