---
title: session和cookie
date: '2/18/2019 11:59:36 AM '
tag: ['js', 'session', 'cookie']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---


## 无状态的http
	
### http的请求和响应都是对应的，客户端向服务器发送请求数据，服务器端不会记录状态,因此服务器端想知道是哪个客户端提交的请求，通常使用cookie和session来完成

## Cookie【req.cookies】

### cookie是从服务端发送的，服务端给不同的客户端发送不同的标识，这个标识标识该用户的身份，服务器通过这个标识来识别用户的身份，从而将数据发送到该客户端【express使用cookie-parser 】，但是客户端的cookie具有局限性

## 局限性：

### cookie的数量长度限制，每个cookie长度不能超过4kb，最多只能有20条

## Session

### express-session是express的一个中间件来创建session，服务端生成了一个session id，客户端使用cookie保存了session id这个请求的信息，而将用户的请求信息保存到客户端，session记录的客户端与服务端之间的会话状态，该状态是用来确定客户端的身份【req.session】
	
## cookie和session的区别

#### 1、最大的区别应该在于存储的地方不一样，cookie存储在客户端，session存储在服务器；

#### 2、从安全性方面来说，cookie存储在客户端，很容易被窃取，暴露用户信息，而session存储在服务器，被窃取的机会小很多，故session的安全性比cookie高；
#### 3、从性能方面来说，cookie存储在浏览器端消耗的是用户的资源，相对比较分散，而session消耗的服务器的内存，会造成服务器端的压力；
#### 4、cookie可以长期的存储在客户端，但是数量和大小都是有限制的；session存在服务器的时间较短，但是没有大小的限制。