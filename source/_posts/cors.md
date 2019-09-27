---
title: 跨域
date: '2/13/2019 6:39:12 PM'

tag: ['js', 'cors', '跨域', 'jsonp']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## 跨域
###[浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
### 跨域是由于浏览器的同源策略限制，而产生的一种安全模式。

## 同源策略

### 同源是指同协议，同域名，同端口，三者相同就是同源，如有一项不同就是跨域，而在浏览器中静态资源不受同源策略的影响（img,link，script,iframe）

## 解决跨域

### 利用同源策略的特点解决跨域问题

## 方式一: jsonp请求

### 利用静态资源不受跨域的限制解决跨域
> ####封装jsonp


	const getParams = (data) => { // 创建一个函数，接收一个参数
	  console.log(data, '444')
	  let params = ''
	  for (let key in data) {
	    console.log(key)
	    params += '&' + key + '=' + data[key]
	  }
	  return params
	}
	const jsonp = (url, data) => { // 创建函数接收需要跨域请求的地址
	  return new Promise((resolve, reject) => {
	    const script = document.createElement('script') // 动态创建script标签
	    const callbackName = 'a' + (+new Date()) // 随机定义callback函数名
	    const params = getParams(data) // 拼接参数
	    script.src = url + '?callback=' + callbackName + '&' + params // 设置src属性为接口地址
	    console.log(script)
	    document.body.appendChild(script) // 动态插入到页面中
	    window[callbackName] = function (res) { // 动态设置callback函数到window上
	      resolve(res) // 成功后
	      document.body.removeChild(script) // 删除script标签
	      window[callbackName] = null // 清空window上的callback函数
	    }
	    console.log('aaa')
	  })
	}
	export default jsonp

> ###后端【使用express来说】

	router.get('/list', function(req,res){
	  console.log(req.query)
	  let {callback} = req.query
	  res.send(`${callback}('sssss')`)
	})


#### 优点

> 可以解决跨域，并且兼容所有浏览器

#### 缺点

> 只能get请求，不能post请求

#### 特性

> 利用了静态资源不受同源策略影响

#### 原理

> 动态生成script标签，并且设置src属性为接口地址，动态插入到页面中，发出请求，后端接到请求，需要获取callback的参数，而callback的参数
> 动态生成script标签的时候，动态生成函数名称

## 方式二：cors

cors跨域资源共享，这是浏览器的新增特性，只需要操作服务即可，客户端不变，常用场景就是小程序

Cors是一个w3c标准，全称是“跨域资源共享”（Corss-origin rsource sharing）

他允许浏览器向跨域服务器，发出XMLrequrest请求，从而克服了AJAX只能同源使用的限制

前端不需要做任何修改，只需要服务端设置允许的header头即可


	app.use((req, res, next) => {
	  res.header('Access-Control-Allow-Origin', '*'); // 允许所有跨域请求
	  res.header('Access-Control-Allow-Credentials', true) // 允许携带cookie
	  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'); //允许的header内容
	  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); // 允许的请求方法
	
	  next()
	})

### 优点 

> #### 前端不需要做任何处理，支持get，post任何请求

### 缺点

> #### 浏览器兼容，不兼容IE10以下浏览器

### 特性

> #### 浏览器新特性

## 方式三：代理
一般情况下跨域产生的原因域名端口不一样，因为在开发环境中，前端启动的是自己的服务，后端启动也是自己的服务，而在后面上线了就不存在跨域了，这种情况下我们一般使用代理的形式（后端不需要做任何调整，只需要前端添加反向代理即可）


客户端发出去请求 -- 本地服务器拦截 -- 发现是api开头 -- 本地服务发出请求请求(localhost:3000) -- 跨域服务器返回数据 -- 本地服务器接收数据 -- 将数据返回给客户端


## 方式四：window.name+iframe

### window.name通过在iframe（一般动态创建i）中加载跨域HTML文件来起作用。然后，HTML文件将传递给请求者的字符串内容赋值给window.name。然后，请求者可以检索window.name值作为响应。

- iframe标签的跨域能力；
- window.name属性值在文档刷新后依旧存在的能力（且最大允许2M左右）。

> #### 每个iframe都有包裹它的window，而这个window是top window的子窗口。contentWindow属性返回iframe元素的Window对象。你可以使用这个Window对象来访问iframe的文档及其内部DOM。

	<!-- 
	 下述用端口 
	 10000表示：domainA
	 10001表示：domainB
	-->
	
	<!-- localhost:10000 -->
	<script>
	  var iframe = document.createElement('iframe');
	  iframe.style.display = 'none'; // 隐藏
	
	  var state = 0; // 防止页面无限刷新
	  iframe.onload = function() {
	      if(state === 1) {
	          console.log(JSON.parse(iframe.contentWindow.name));
	          // 清除创建的iframe
	          iframe.contentWindow.document.write('');
	          iframe.contentWindow.close();
	          document.body.removeChild(iframe);
	      } else if(state === 0) {
	          state = 1;
	          // 加载完成，指向当前域，防止错误(proxy.html为空白页面)
	          // Blocked a frame with origin "http://localhost:10000" from accessing a cross-origin frame.
	          iframe.contentWindow.location = 'http://localhost:10000/proxy.html';
	      }
	  };
	
	  iframe.src = 'http://localhost:10001';
	  document.body.appendChild(iframe);
	</script>
	
	<!-- localhost:10001 -->
	<!DOCTYPE html>
	...
	<script>
	  window.name = JSON.stringify({a: 1, b: 2});
	</script>
	</html>

### 注意：

> 1. 直接嵌入其他域（localhots:10001）下的URL会报错，所以需要加载完成替换为当前域的URL(localhots:10000)，proxy.html为空白页面，只为解决该问题； 
> 
> 2. 重新设置src（http://localhost:10000/proxy.html）后导致页面不断刷新，所以通过state来控制；
> 
> 3. 全部获取完结果后，清除该iframe。



