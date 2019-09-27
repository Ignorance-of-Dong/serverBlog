---
title: node + koa2基础
date: '9/26/2019 10:41:49'
tag: ['node', 'koa']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# node + koa2基础

> **使用koa2，必须保持你的node版本在7.6以上，最好实在10以上，如低于7.6版本请更新您的node版本**

## 搭建http服务+

> 使用koa2搭建服务，只需要三步

    /index.js

    const Koa = require('koa')
    const app = new Koa()

    app.listen(3000)

**使用node命令运行即可**

    node index.js

> 打开浏览器输入http://loaclhost:3000访问，页面中会显示Not Found，这是因为我们没有去指定koa该返回什么内容，这一点与express不同，koa内部会自动判断，是否有返回内容

## Context对象

**koa内部提供了一个Context对象，表示一次对话的上下文【包括http的请求对象和响应对象】，通过操控这个对象我们可以控制返回给用户的内容**

    /index.js

    const Koa = require('koa')
    const app = new Koa()

    app.use(async (ctx, next) => {  
        ctx.response.body = 'hello'
        await next()
    })
    app.listen(3000)


## 路由【koa-router】的使用

    const router = require('koa-router')()
    const Koa = require('koa')
    const app = new Koa()

    router.get('/list', ctx => {
        ctx.response.body = 'hellow, list'
    })

    router.get('/home', ctx => {
        ctx.response.body = 'hellow, home'
    })

    app.use(router.routes()).use(router.allowedMethods()) // 启动路由

## 中间件

### 应用级别中间件

> 任何路由都会经过应用级别中间件,当执行玩成后next()去匹配相应的路由

    app.use(async (ctx, next) => {
        await next()
    })

### 错误处理中间件

    app.use(async (ctx, next) => {
        await next()
        if (ctx.status == 404) {
            ctx.body = '404'
        }
    })

### 路由中间件

> 在匹配路由的过程中匹配到的路由会依次执行中间件,知道最后一个没有next参数

    router.get('/', async (ctx, next) => {
        ctx.response.body = 'hellow'
        ctx.response.status = 200
        await next()
    })

    router.get('/home', ctx => {
        ctx.body = 'hellow, world'
    })


## 中间件的合成

> koa-compose 模块可以将多个中间件合成为一个

    const Koa = require('koa')
    const app = new Koa()
    const compose = require('koa-compose')

    const logger = (ctx,next) => {
        console.log(new Date())
        next()
    }

    const main = (ctx,next) => {
        ctx.response.body =  'hello world'
    }

    const middleWares = compose([logger,main])
    app.use(middleWares)
    app.listen(3000)

## xtemplate模板渲染【koa-xtpl】

    app.use(xtpl({
        root: path.join(__dirname, 'template'), // 获取到模板所在的文件夹
        extname: 'xtpl', // 模板后缀
        commands: {}
    }))

> 新建template/login/index.xtpl（模板必须以xtpl后缀结尾）

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>后台管理系统</title>
    </head>
    <body>
        <div class="container-fluid">
            hellow, world
        </div>
    </body>
    </html>

> 打开index.js

    router.get('/', async (ctx, next) => {
        await ctx.render('login/index', { title: new Date() })
        await next()
    })

**运行就可以看到页面中出现  hellow, world**

## 静态资源

> 如果网站提供了静态资源（图片，字体，样式，脚本），为他们一个个写路由就很麻烦，也没必要  koa-static 模块封装了这部分的请求

    const Koa = require('koa')
    const app = new Koa()
    const serve = require('koa-static')
    const path = require('path')

    const main = serve(path.join(__dirname))

    app.use(main)


    app.listen(3000)

**设置之后可以直接在URL地址中输入静态资源文件名进行访问**
