---
title: json web token【跨域认证的解决方案】
date: '2/25/2019 11:49:43 AM '
tag: ['js', 'vue', 'json web token']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---

## json web token【跨域认证的解决方案】

#### 一般互联网认证用户流程

> 1.**用户向服务器发送用户名和密码。**

> 2、**服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。**
> 
> 3、**服务器向用户返回一个 session_id，写入用户的 Cookie。**
> 
> 4、**用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。**
> 
> 5、**服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。**


#### 缺点

> 扩展性不够好单机当然没有问题，如果是服务器集群，就要求 session 数据共享，每台服务器都能够读取 session。

## JWT以及具体实现
	
### JWT鉴权的简单流程

###  JWT分为三部分
> 
> Header（包含加密方式等）

	{
	  "alg": "HS256",// 默认签名算法
	  "typ": "JWT" // 类型
	}

> Payload（包含用户必要信息，以及过期时间等）

	iss (issuer)：签发人
	exp (expiration time)：过期时间
	sub (subject)：主题
	aud (audience)：受众
	nbf (Not Before)：生效时间
	iat (Issued At)：签发时间
	jti (JWT ID)：编号

	用来存放需要传递的实际数据

> Signature（针对前两部分生成，防止数据篡改）。

### 流程

	用户登录成功后，后台根据用户信息加上一个用户唯一的密钥值，生成一串字符串，即Token串，将其设置
    在Cookie中；
    用户下次带Token访问，系统会先根据前两部分以及密钥值，对Token进行有效性以及正确性的验证，如果       
    验证通过的话，再执行下一步操作...

#### 如果要写入私密数据时需要加密

	const token = jwt.sign({...getu},"usermessag",{
    	expiresIn: 60*60*1  // 1小时过期
  	})

#### 解密

	jwt.verify(token,'usermessag',(err, decode) => {
		console.log(decode) // n拿到解密的值
	}