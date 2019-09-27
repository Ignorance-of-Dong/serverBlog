---
title: vue的路由导航守卫
date: '4/2/2019 9:26:50 AM '
tag: ['js', 'vue']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## vue的路由导航守卫

**vue-router提供的导航守卫主要是用来通过跳转和取消的方式守卫导航。一共有三种植入路由导航的过程**

> 全局前置(后置)守卫

	const router = new VueRouter({ ... })

	router.beforeEach((to, from, next) => { // 前置
	  // ...
	})

	router.afterEach((to, from) => { // 后置
	  // ...
	})

> 路由独享守卫


	const router = new VueRouter({
	  routes: [
	    {
	      path: '/foo',
	      component: Foo,
	      beforeEnter: (to, from, next) => {
	        // ...
	      }
	    }
	  ]
	})

> 组件内的守卫

- beforeRouteEnter
- beforeRouteUpdate
- beforeRouteLeave

----------


	const Foo = {
	  template: `...`,
	  beforeRouteEnter (to, from, next) {
	    // 在渲染该组件的对应路由被 confirm 前调用
	    // 不！能！获取组件实例 `this`
	    // 因为当守卫执行前，组件实例还没被创建
	  },
	  beforeRouteUpdate (to, from, next) {
	    // 在当前路由改变，但是该组件被复用时调用
	    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
	    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
	    // 可以访问组件实例 `this`
	  },
	  beforeRouteLeave (to, from, next) {
	    // 导航离开该组件的对应路由时调用
	    // 可以访问组件实例 `this`
	  }
	}


**beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。**

**不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。**

	beforeRouteEnter (to, from, next) {
	  next(vm => {
	    // 通过 `vm` 访问组件实例
	  })
	}

**注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫。对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持传递回调，因为没有必要了。**

	beforeRouteUpdate (to, from, next) {
	  // just use `this`
	  this.name = to.params.name
	  next()
	}

**这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。**

	beforeRouteLeave (to, from , next) {
	  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
	  if (answer) {
	    next()
	  } else {
	    next(false)
	  }
	}