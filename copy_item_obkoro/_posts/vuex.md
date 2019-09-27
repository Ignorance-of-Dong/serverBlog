---
title: Vuex简单概述
date: '1/30/2019 7:49:45 PM '
tag: ['js', 'vuex', 'vue']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# Vuex


----------


## Vuex是什么？

> **引入官方提供的解释，vuex 是专门为 vue.js 设计的一套 状态管理模式 。什么是状态管理模式？说白了就是数据的集中管理。我们在使用 vue.js 时所用到的数据全部抽取出来放在一个state对象下，这样我们在任何组件内都可以访问得到该数据。下面我们通过一个例子来看下 vuex 是如何管理我们的数据的。**

### 首先先通过npm来安装一下vuex：

    npm install vuex --save

## state状态属性

### 在项目src目录下新建一个store文件夹(该文件夹不是必须的，你也可以直接新建一个store.js，只要你引入的路径正确即可)，在该文件夹下新建一个 index.js。store文件夹主要是单独管理我们的数据状态，包括行为触发等等。 

> #### store/index.js

	
	import Vue from 'vue'
	import Vuex from 'vuex'
	Vue.use(Vuex)
	let store = new Vuex.Store({
		state: {  //要设置的全局访问的state对象
			name: "vuex"
		}
	})

	export default store

### 为了能在所有的组件中共享我们的数据，我们有必要给根实例下注入我们的store对象，所以我们在main.js文件中 

> #### main.js

	import Vue from 'vue'
	import App from './App.vue'
	import "./commcss/index.scss"
	import store from './store/index'
	new Vue({
	  el: '#app',
	  render: h => h(App),
	  store // 全局注册
	})


> #### App.vue

	<template>
  		<div class="app">
			{{name}}
		</div>
	</template>
	<script>
	import { mapState} from 'vuex'
	/*
	 *1.mapState 辅助函数
	 *当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。
	 *为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
	 */
	export default {
	  computde: {
		...mapState(['name'])
		}
	}
	</script>

## Getter(store的计算属性，例如对列表进行过滤)

> #### store/index.js

	state: {
    	count: 1,
    	arr: [
	      {
	        sex: '男',
			id: 1
	      },
	      {
	        sex: '男',
			id: 2
	      },
	      {
	        sex: '男',
			id: 3
	      },
	      {
	        sex: '男',
			id: 4
	      },
	      {
	        sex: '女',
			id: 5
	      },
	      {
	        sex: '男',
			id: 6
	      },
	      {
	        sex: '男',
			id: 7
	      }
    	]
  	},
	getters: {
	    man (state) {
	      return state.arr.filter(item=>{return item.sex==='男'})
	    }
  	},
> #### App.vue

	<template>
  		<div class="app">
			<ul>
				<li v-for="(item,index) in man" :key="item.id">{{item.sex}}</li>
			</ul>
		</div>
	</template>
	<script>
	import { mapGetters } from 'vuex' //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
	export default {
	  computde: {
		...mapGetters(['man'])
		}
	}
	</script>


## mutation(更新state的唯一方法)

> #### store/index.js

	mutation: {
		change (state) {
			state.name = 'vue'
		}
	}

> #### App.vue

	<template>
  		<div class="app" @click="change">
			{{name}}
		</div>
	</template>
	<script>
	export default {
	  method: {
		change () {
			this.$store.commit('change')
		}
	  }
	}
	</script>	

## 一条重要的原则就是要记住 mutation 必须是同步函数

### 原因：(为什么不能执行一步操作)

> **现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。**

### 因此：【我们需要一个action来进行异步操作】

## Action

### Action 类似于 mutation，不同在于：

- **Action 提交的是 mutation，而不是直接变更状态。**
- **Action 可以包含任意异步操作。**

> #### store/index.js


	state: {
		count: 0
	},
	mutations: {
	    addcount (state) {
	      state.count++
	    }
  	},
	actions: {
	    getInfo (context) {
	      setTimeout(()=>{
	        context.commit('addcount')
	      },2000)
	    }
  	}

> #### App.vue

	<template>
  		<div class="app" @click="change">
			{{count}}
		</div>
	</template>
	<script>
	export default {
	  computed: {
	    ...mapState(['count'])
	  },
	  method: {
		change () {
			this.$store.dispatch('getInfo')
		}
	  }
	}
	</script>

###### 乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作：

## Module

### 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

----------


#### 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

首先创建module/todo.js

> **module/todo.js**

	export default {
	  namespaced: true,
	  state: {
	    count: 0
	  },
	  mutations: {
	    addcount (state) {
	      state.count++
	    }
	  },
	}

> #### store/index.js

	import todo from "./modules/todo"

	modules: {
    	todo
  	}

> #### App.vue

	<template>
  		<div class="app" @click="change">
			{{count}}
		</div>
	</template>
	<script>
	export default {
	  computed: {
	    ...mapState('todo',['count'])
	  },
	  method: {
		change () {
			this.$store.commit('todo/addcount')
		}
	  }
	}
	</script>	