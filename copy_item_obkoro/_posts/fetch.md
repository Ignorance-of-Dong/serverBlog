---
title: fetch封装
date: '3/14/2019 9:29:29 AM '
tag: ['js', 'fetch']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# fetch

## fetch封装

----------


> - 解决了fetch的get。post的传递参数不同
> - 添加了fetch默认不携带cookie的配置
> - 解决了fetch不能处理错误状态的问题
> - 解决了fetch，response控制返回值json
> - 添加公共参数token
> - 统一错误出路
> - 是否允许跨域
> 

----------

	const objParseQuery = (data) => {
	  let paramsArray = [];
		let parameter = ''
		//拼接参数
		Object.keys(data).forEach(key => {
				if (data[key]) {
						paramsArray.push(key + '=' + data[key])
				}
		})
		if (parameter.search(/\?/) === -1) {
				parameter += '?' + paramsArray.join('&')
		} else {
				parameter += '&' + paramsArray.join('&')
	  }
	  return parameter
	}
	let fetchs = {
	  /**
	    * 基于 fetch 封装的 GET请求
	    * @param url
	    * @param params {}
	    * @param headers
	    * @returns {Promise}
	    */
	   get: (url, params) => {
	     
	     var fetchConfig = {
	         method: 'get',
	         headers: {
	           authorization: window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : null,
	           'Content-Type': 'application/json; charset=utf-8'
	         },
	         credentials: "include",
	         mode: 'cors',
	     }
	     if(params){
	      url += objParseQuery(params.data);
	     }
	     console.log(url)
	     return fetch(url, fetchConfig).then(response => {
	       return response.json().then((res) => {
	         console.log(res)
	         if (response.ok && res.code === 1) {
	           return Promise.resolve(res)
	         } else {
	           return Promise.reject(res)
	         }
	       })
	     })
	 	},
		 post: (url, options) => {
		   return fetch(url, {
		     method: 'post',
		     headers: {
		       authorization: window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : null,
		       'Content-Type': 'application/json; charset=utf-8'
		     },
		     credentials: "include",
		     mode: 'cors',
		     body: JSON.stringify(options)
		   }).then(response => {
		     return response.json().then((res) => {
		       if (response.ok && res.code === 1) {
		         console.log(window.sessionStorage.getItem('token'))
		         return Promise.resolve(res)
		       } else {
		         return Promise.reject(res)
		       }
		     })
		   })
		 },
		 put: (url, options) => {
		  return fetch(url, {
		    method: 'post',
		    headers: {
		      authorization: window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : null,
		      'Content-Type': 'application/json; charset=utf-8'
		    },
		    credentials: "include",
		    mode: 'cors',
		    body: JSON.stringify(options)
		  }).then(response => {
		    return response.json().then((res) => {
		      if (response.ok && res.code === 1) {
		        console.log(window.sessionStorage.getItem('token'))
		        return Promise.resolve(res)
		      } else {
		        return Promise.reject(res)
		      }
		    })
		  })
		}
	}
	
	export default fetchs
	
	