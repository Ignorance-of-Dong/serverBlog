---
title: react的概述
date: '4/3/2019 7:28:59 PM '
tag: ['js', 'react']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## react的概述

### 什么是react

> react是一个前端的js库，用于构建用户界面，尤其是单页面应用程序

### react的特点：

> 单向数据流，组件化开发，虚拟dom，jsx，只关注mv*中的m这一层，渲染性能好

### react组件的划分

- 业务组件

**每个功能对应的业务逻辑划分**

- 展示组件

**列表，按钮表单。。。ui组件**

- 容器组件

**包装的盒子，页面组件**

- 木偶组件

**展示组件，功能组件【一些效果】**

> components[业务组件]（展示组件，木偶组件，容器组件）
> views[页面组件]

### 创建组件方式

> **class组件创建：业务组件，页面组件**
> 
> **函数式创建：展示组件，包装类型组件**

### render用法

- 在react中有两个render，一个是组件内部的render，一个是reactdom的render
- 组建的render用来返回一个虚拟dom，在里面不能修改state，只能读取
- 虚拟dom是通过编译器，将jsx转化为react.createElement()的方法调用，这个方法的返回结果就是一个jsx对象【虚拟dom】
- 每一个组件都必须有render这个方法
- reactdom的render只是将虚拟dom渲染到页面中

### react中的state

**state只能定义在construct中的this.state中，函数式的组件没有state**

**修改state只能通过setState方法，只能修改一级属性，不能修改索引数组，不能通过属性修改对象**

**读取使用this.state.xxx，this.props.xxx**

**定义props默认值使用static defaultProps**

### react的生明周期

> **组件初始化阶段**

	import React, { Component } from 'react';

	class Test extends Component {
	  constructor(props) {
	    super(props);
	  }
	}
	
> **组件挂载阶段**

	componentWillMount:

**在组件挂载到DOM前调用，且只会被调用一次，在这边调用this.setState不会引起组件重新渲染，也可以把写在这边的内容提前到constructor()中，所以项目中很少用。**

	render:

**根据组件的props和state（无两者的重传递和重赋值，论值是否有变化，都可以引起组件重新render） ，return 一个React元素（描述组件，即UI），不负责组件实际渲染工作，之后由React自身根据此元素去渲染出页面DOM。render是纯函数（Pure function：函数的返回结果只依赖于它的参数；函数执行过程里面没有副作用），不能在里面执行this.setState，会有改变组件状态的副作用。**

	componentDidMount:

**组件挂载到DOM后调用，且只会被调用一次**

> **组件更新阶段**

**setState引起的state更新或父组件重新render引起的props更新，更新后的state和props相对之前无论是否有变化，都将引起子组件的重新render。**

#### 造成组件更新有两类（三种）情况：

- 父组件重新render

**每当父组件重新render的导致的重传props，子组件将直接跟着重新渲染，可以通过shouldComponentUpdate方法进行优化**

	class Child extends Component {
	   shouldComponentUpdate(nextProps){ // 应该使用这个方法，否则无论props是否有变化都将会导致组件跟着重新渲染
	        if(nextProps.someThings === this.props.someThings){
	          return false
	        }
	    }
	    render() {
	        return <div>{this.props.someThings}</div>
	    }
	}

**在componentWillReceiveProps方法中，将props转换成自己的state**

	class Child extends Component {
	    constructor(props) {
	        super(props);
	        this.state = {
	            someThings: props.someThings
	        };
	    }
	    componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
	        this.setState({someThings: nextProps.someThings});
	    }
	    render() {
	        return <div>{this.state.someThings}</div>
	    }
	}



- . 组件本身调用setState，无论state有没有变化。可通过shouldComponentUpdate方法优化。

----------

	class Child extends Component {
	   constructor(props) {
	        super(props);
	        this.state = {
	          someThings:1
	        }
	   }
	   shouldComponentUpdate(nextStates){ // 应该使用这个方法，否则无论state是否有变化都将会导致组件重新渲染
	        if(nextStates.someThings === this.state.someThings){
	          return false
	        }
	    }
	
	   handleClick = () => { // 虽然调用了setState ，但state并无变化
	        const preSomeThings = this.state.someThings
	         this.setState({
	            someThings: preSomeThings
	         })
	   }
	
	    render() {
	        return <div onClick = {this.handleClick}>{this.state.someThings}</div>
	    }
	}


----------
**执行顺序：**
----------

	componentWillReceiveProps

	shouldComponentUpdate

	componentWillUpdate

	render

	componentDidUpdate


----------
	componentWillReceiveProps(nextProps)

**此方法只调用于props引起的组件更新过程中，参数nextProps是父组件传给当前组件的新props。但父组件render方法的调用不能保证重传给当前组件的props是有变化的，所以在此方法中根据nextProps和this.props来查明重传的props是否改变，以及如果改变了要执行啥，比如根据新的props调用this.setState出发当前组件的重新render**

	shouldComponentUpdate(nextProps, nextState)

**此方法通过比较nextProps，nextState及当前组件的this.props，this.state，返回true时当前组件将继续执行更新过程，返回false则当前组件更新停止，以此可用来减少组件的不必要渲染，优化组件性能。**

	componentWillUpdate(nextProps, nextState)

**此方法在调用render方法前执行，在这边可执行一些组件更新发生前的工作，一般较少用。**

	render

**只是重新调用。**

	componentDidUpdate(prevProps, prevState)

**此方法在组件更新后被调用，可以操作组件更新的DOM，prevProps和prevState这两个参数指的是组件更新前的props和state**

> **卸载阶段**

	componentWillUnmount

**此方法在组件被卸载前调用，可以在这里执行一些清理工作，比如清楚组件中使用的定时器，清楚componentDidMount中手动创建的DOM元素等，以避免引起内存泄漏。**

## React v16.4 的生命周期

### 变更缘由

**原来（React v16.0前）的生命周期在React v16推出的Fiber之后就不合适了，因为如果要开启async rendering，在render函数之前的所有函数，都有可能被执行多次。**

**原来（React v16.0前）的生命周期有哪些是在render前执行的呢？**

- componentWillMount
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate

**如果开发者开了async rendering，而且又在以上这些render前执行的生命周期方法做AJAX请求的话，那AJAX将被无谓地多次调用。。。明显不是我们期望的结果。而且在componentWillMount里发起AJAX，不管多快得到结果也赶不上首次render，而且componentWillMount在服务器端渲染也会被调用到（当然，也许这是预期的结果），这样的IO操作放在componentDidMount里更合适。**

**因此引入两个新增的生命周期函数**

	getDerivedStateFromProps

	getSnapshotBeforeUpdate

**随着getDerivedStateFromProps的推出，同时deprecate了一组生命周期API，包括：**

- componentWillReceiveProps
- componentWillMount
- componentWillUpdate

----------


**按照官方说法，以前需要利用被deprecate的所有生命周期函数才能实现的功能，都可以通过getDerivedStateFromProps的帮助来实现。**

**这个getDerivedStateFromProps是一个静态函数，所以函数体内不能访问this，简单说，就是应该一个纯函数，纯函数是一个好东西啊，输出完全由输入决定。**

	static getDerivedStateFromProps(nextProps, prevState) {
	  //根据nextProps和prevState计算出预期的状态改变，返回结果会被送给setState
	}

**所有被deprecate的生命周期函数，目前还凑合着用，但是只要用了，开发模式下会有红色警告，在下一个大版本（也就是React v17)更新时会彻底废弃。**

----------

**getSnapshotBeforeUpdate，这函数会在render之后执行，而执行之时DOM元素还没有被更新，给了一个机会去获取DOM信息，计算得到一个snapshot，这个snapshot会作为componentDidUpdate的第三个参数传入。**

	getSnapshotBeforeUpdate(prevProps, prevState) {
	   console.log('#enter getSnapshotBeforeUpdate');
	   return 'foo';
	}
	
	 componentDidUpdate(prevProps, prevState, snapshot) {
	   console.log('#enter componentDidUpdate snapshot = ', snapshot);
	 }.


**getDerivedStateFromProps无论是Mounting还是Updating，也无论是因为什么引起的Updating，全部都会被调用。**

### 总结：

> **用一个静态函数getDerivedStateFromProps来取代被deprecate的几个生命周期函数，就是强制开发者在render之前只做无副作用的操作，而且能做的操作局限在根据props和state决定新的state，而已。**

> **引用**

[程墨Morgan老师的React v16.3之后的组件生命周期函数](https://zhuanlan.zhihu.com/p/38030418)
