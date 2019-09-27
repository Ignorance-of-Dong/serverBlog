---
title: react中的setState的使用和深入理解
date: '4/3/2019 11:58:21 AM '
tag: ['js', 'react']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## react中的setState的使用和深入理解

**React通过管理状态实现对组件的管理，通过this.state()方法更新state。当this.setState()被调用的时候，React会重新调用render方法来重新渲染UI。**

**在使用state的时候， 如果我们企图直接修改state中的某一个值之后直接打印（使用）他，就会发现，他其实并没有改变。**

**就像下面的例子，企图通过点击事件之后就使用修改之后的state的值，但是会发state中的并没有被立即修改，还是原先的值，我们都知道那是因为setState就相当于是一个异步操作，不能立即被修改**
	
	ClickChangeState () {
		this.setState({
			isActive: true,
		})
		console.log(this.state.isActive) // false
	}

**那么我们也都知道为了解决上面的问题会有很多方法例如：**

> 方法一：

	ClickChangeState () {
		this.setState({
			isActive: true,
		}, () => {
			console.log(this.state.isActive) // true
		})
		
	}

**这个回调函数会在修改了state之后才会执行，这就就可以使用修改之后的state的值了**

> 方法二：

	async ClickChangeState () {
		await this.setState({
			isActive: true,
		})
		console.log(this.state.isActive) // false
	}

**操作异步函数，用的最舒服的还是async / await**

## 在使用setState的时候，有两种格式;

### 第一种setstate（）格式  第一个参数是一个对象，第二个参数是一个回调函数，这个回调函数是在setstate执行完并页面渲染了之后再执行

	ClickChangeState () {
		this.setState({
			isActive: true,
		}, () => {
			console.log(this.state.isActive) // true
		})
		
	}

**但是这种修改的方式不稳妥，因为是直接修改**

### setstate的第二种格式，接收一个回调函数，而不是一个对象，这个回调函数有两个参数，

**一个是接收前一个状态值作为第一个参数，并将更新后的值作为第二个参数**

	ClickChangeState () {
		this.setState((prevState) => {
			isActive: !prevState.isActive,
		}, () => {
			console.log(this.state.isActive) // true
		})
		
	}



## setState异步更新


> setState通过一个队列机制实现state的更新。当执行setState时，会把需要更新的state合并后放入状态队列，而不会立刻更新this.state，利用这个队列机制可以高效的批量的更新state。


----------
> React文档中对setState的说明

	void setState(
      function|object nextState,
      [function callback]
    )

> The second (optional) parameter is a callback function that will be executed once setState is completed and the component is re-rendered. 

----------
> 翻译： 第二个（可选）参数是一个回调函数，它将在setstate完成并重新呈现组件后执行。
> 
> 也就是说，我们可以通过这个回调来拿到更新的state的值。 
React也正是利用状态队列机制实现了setState的异步更新，避免频繁地重复更新state(pending的意思是未定的

	//将新的state合并到状态更新队列中
	   var nextState =  this._processPendingState(nextProps, nextContext);
	   //根据更新队列和shouldComponent的状态来判断是否需要更新组件
	   var shouldUpdate = 
	      this._pendingForceUpdate ||
	      !inst.shouldComponentUpdate ||
	      inst.shouldComponentUpdate(nextProps, nextState, nextContext);

## setState循环调用风险

**如果在shouldComponentUpdate或者componentWillUpdate方法中调用setState，此时this._pending-StateQueue != null，就会造成循环调用，使得浏览器内存占满后崩溃**

## 调用栈

	import React, { Component } from 'react';
	   class Example extends Component {
	       constructor(){
	           super();
	           //在组件初始化可以直接操作this.state
	           this.state = {
	               val: 0
	           }
	       }
	       componentDidMount(){
	           this.setState({
	              val: this.state.val + 1
	           });
	           //第一次输出
	           console.log(this.state.val);
	           this.setState({
	              val: this.state.val + 1
	           });
	           //第二次输出
	           console.log(this.state.val);
	           setTimeout(()=>{
	              this.setState({val: this.state.val + 1});
	               //第三次输出
	               console.log(this.state.val);
	               this.setState({
	                  val: this.state.val + 1
	               });
	               //第四次输出
	               console.log(this.state.val);
	           }, 0);  
	       }
	       render(){
	           return null;
	       }
	   }


**上述代码中，4次console.log打印出来的val分别是: 0，0，2 ，3**

**我们来看一个简化的setState的调用栈**

	this.setState(newState) =>
	   newState存入pending队列 =>
	   调用enqueueUpdate =>
	   是否处于批量更新模式 =>
	   是的话将组件保存到dirtyComponents
	   不是的话遍历dirtyComponents，调用updateComponent,更新pending state or props

## 事务(transaction)

**事务就是将需要执行的方法用wrapper封装起来，再通过事务提供的perform方法执行。而再perform之前，先执行所wrapeer中的initialize方法，执行完需要执行的方法后，再执行close方法。一组initialize和close方法称为一个wrapper，事务支持多个wrapper叠加。**

**我们可以将4次setState简单规成两类，componentDidMount是一类，setTimeOut中的又是一类，因为这两次在不同的调用栈中执行。**

> **我们先看看在componentDidMount中setState的调用栈：**

![](https://user-gold-cdn.xitu.io/2019/4/3/169e13913dbee157?w=446&h=341&f=png&s=100421)

> **再看看在setTimeOut中的调用栈：**

![](https://user-gold-cdn.xitu.io/2019/4/3/169e13a474c5073a?w=446&h=83&f=png&s=22748)

**前两次是整个将React组件渲染到DOM的过程就处于一个大的事务中**

**componentDidMount中调用setState时,两次setState的结果并没有立即生效，而是被放进了dirtyComponents中。因为新的state还没被应用到组件中。**

**setTimeOut中的两次setState，因为没有跟随组件到渲染dom的一个流程，导致了新的state马上生效，也就是说，setTimeOut中的第一次执行，setState时，this.state.val为1，而setState完成后打印时this.state.val变成了2。第二次的setState同理。**

## 总结

### 在执行setState并不是说他是异步的，官方给出的说明是

> 不保证this.state会立即更新，所以在调用这个方法后存取this.state可能会回传旧的值。
> 
> 不保证调用setState就会同步地执行，而它们也可能最终被被批量调用(多次调用的情况下)。你可以提供额外的回调，回调将会在setState实际被完成时被执行。

### 在执行setState，他是跟随将react组件渲染到dom这个流程走的，会将新的state值放入到一个更新队列中，事务（transaction）会进行下一步操作。在批量调用的情况下，会对多个setState进行合并。

### setTimeout中setState和在生命周期里setState的区别在于，setTimeout中的setState会自己触发一个transaction，而生命周期中的setState已经处于React生命周期的transaction中了。
