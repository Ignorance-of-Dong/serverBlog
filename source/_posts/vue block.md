---
title: 关于Vue全局的扩展
date: '1/28/2019 8:03:34 PM '
tag: ['vue全局组件', 'vue', 'vue指令', 'vue过滤器','directive']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---

# 关于Vue全局的扩展

----------


## Vue的全局组件

### 我们平时使用组件，需要经过引入，绑定两个步骤。那么，如果我们需要使用一些全局组件或者第三方的组件库怎么办呢？

#### 在Vue官方文档中介绍的是使用Vue.component(tagName, options)来创建一个全局组件。但是这种方法是与根实例写在同一个文件中，如果要同时注册多个全局组件，就会使根实例文件过重，因此使用Vue.use()来“安装”全局组件，就显得更轻一些。 

#### 方法：

- 1.新建一个plugins文件夹 
- 2.在文件夹中创建放置全局组件的文件components.js 
- 3.在components.js文件中引入所有要注册的全局组件 
- 4.在app.js根实例文件中，引入components.js

### 以login组件为例

### login.js

    import Login from '../components/eg.vue';
	export default (Vue)=>{
    	Vue.component("Login",Login);
	}


### app.js

    import components from './plugins/components.js';
	Vue.use(components);

### 经过上述编写后，就注册了全局组件Login。

## Vue全局指令

### 对于全局指令的注册，官方文档给出的方法是使用Vue.directive()，位置同样是在根实例文件下，那么问题来了，如果多个全局指令，再加上多个全局组件，那么app.js文件将变得臃肿无比。 
#### 因此，同上面的注册全局组件方法相似，也是使用Vue.use()来“安装”全局指令。 

#### 方法：
- 1.新建一个plugins文件夹 
- 2.在文件夹中创建放置全局组件的文件directives.js 
- 3.在directives.js文件中引入所有要注册的全局指令 
- 4.在app.js根实例文件中，引入directives.js

#### 以v-focus指令为例： 
#### directives.js:
	    export default (Vue)=>{
		    Vue.directive("focus",{
		        inserted:function(el){
		            el.focus();
		        }
		    })
		}

#### app.js

    import directives from "./plugins/directives.js"
	Vue.use(directives);

### 这样就注册了全局指令

## 扩展Vue类方法

### 很简单再此不做更多描述.....

#### 直接看代码。》 。

    Vue.coke = function () {
		console.log("扩展了coke类方法")
	}

### 简单吧！！！！！

## 扩展Vue原型，在vue组件中就可以通过this来访问

### 废话不多说上代码

	Vue.prototype.$api = function () {
		console.log("扩展了$api方法")
	}

### ...................

## Vue过滤器

### Vue.js允许自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和v-bind表达式。过滤器应该被添加在JavaScript表达式的尾部，由“管道”符号指示：|
    <!-- 在双花括号中 -->
	{{ message | capitalize }}
	
	<!-- 在 `v-bind` 中 -->
	<div v-bind:id="rawId | formatId"></div>

### 可以在一个组件的选项中定义本地的过滤器：

### 以截取手机为例

	filters: {
	  	phones (num) {
			let phoneStr = num.toString()
			let res = /(\d{1,})(\d{4})/
			while (reg.test(phoneStr.replace)) {
				phoneStr = phoneStr.replace(reg, '$1-$2')
			}
			return phoneStr
		}
	}


	//调用

	{{17603446842 | phones}}

	//返回结果

	176-0344-6842

### 全局过滤器

	Vue.filter("phones",function(num){
	  	let phoneStr = num.toString()
		let res = /(\d{1,})(\d{4})/
		while (reg.test(phoneStr.replace)) {
			phoneStr = phoneStr.replace(reg, '$1-$2')
		}
		return phoneStr
	})

### 来吧，举一个实用一点的例子

### 上代码

	var app5 = new Vue({
    	el: '#app5',
	    data: {
	        shoppingList: [
	            "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"
	        ],
	        key: ""
	    },
	    computed: {
	        filterShoppingList: function () {
	            // `this` points to the vm instance
	            var key = this.key;
	            var shoppingList = this.shoppingList;
	            //在使用filter时需要注意的是，前面调用的是需要使用filter的数组，而给filter函数传入的是数组中的每个item，也就是说filter里面的函数，是每个item要去做的，并将每个结果返回。
	            return shoppingList.filter(function (item) {
	                return item.toLowerCase().indexOf(key.toLowerCase()) != -1
	            });;
        	}
    	}
	})

### template

		<ul>
		    Filter Key
			<input type="text" v-model="key">   
	       	<li v-for="item in filterShoppingList">
	           {{ item }}
	       	</li>
   		</ul> 

### 最终效果实现了根据关键字来过滤列表的功能。   

     	