---
title: vue中封装axios方法
date: '2/20/2019 4:27:27 PM  '
tag: ['js', 'vue', 'axios']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## vue中封装axios方法

###  [axios基本配置](https://www.kancloud.cn/yunye/axios/234845)


> **/src/util/axios.js**

    import axios from 'axios' // 引入axios
	import vm from '@/main'	// 引入vue实例化
	
	
	// 创建axios实例
	var instance = axios.create({
  	// 设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8'
    	headers: {  
    	  'Content-Type': 'application/x-www-form-urlencoded',
	      'token': 'asdasdasdasdasdasd' // 也可以自定义请求头
        },
		withCredentials: true // 允许携带cookie
	})

	// 添加响应拦截器
	instance.interceptors.response.use(function (response) {
	  // 对响应数据做点什么
	  return response.data
	}, function (error) {
	  // 统一的错误处理
	  console.log(error.response.status)
	  if (error.response.status !== 401) {
	    vm.$error(error.response.data.message)
	  }
	  // 对响应错误做点什么
	  return Promise.reject(error)
	})

	export const get = (url, data) => instance.get(url, {
	  params: data
	}) // get方式
	
	export const post = (url, data) => instance.post(url, data) //post方式
	export const put = (url, data) => instance.put(url, data) //put方式

### **调用**


> **api/index.js**

    import {get, post} from '@/utils/axios'

	getCityList: () => get('/api/cityList')
