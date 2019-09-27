---
title: react组件优化及组件通讯
date: '4/3/2019 4:46:51 PM '
tag: ['js', 'react']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## react组件优化

### key值

**在使用v-for的情况下，给每个变量的元素都加上key值，加key值得好处已经在上一文中提到过，主要为了提高渲染效率**

### shouldComponentUpdate

**该生命周期可以决定数据改变的时候是否进行render，返回值为boolean，返回true即为渲染，返回false及不渲染，默认不写为true**

### 纯函数组件

**将单独的项封装成一个组件，已达到服用效果**

## 组件通讯

### 父传子

> 使用props传值

**父组件**

	import React,{ Component } from "react";
	import Sub from "./SubComponent.js";
	import "./App.css";
	
	export default class App extends Component{
	
	    render(){
	        return(
	            <div>
	                <Sub title = "今年过节不收礼" />
	            </div>
	        )
	    }
	}

**子组件**

	import React from "react";

	const Sub = (props) => {
	    return(
	        <h1>
	            { props.title }
	        </h1>
	    )
	}
	
	export default Sub;

### 子传父

**父组件**

	import React,{ Component } from "react";
	import Sub from "./SubComponent.js";
	import "./App.css";
	
	export default class App extends Component{
	    callback(msg){
	        console.log(msg);
	    }
	    render(){
	        return(
	            <div>
	                <Sub callback = { this.callback.bind(this) } />
	            </div>
	        )
	    }
	}

**子组件**

	import React from "react";

	const Sub = (props) => {
	    const cb = (msg) => {
	        return () => {
	            props.callback(msg)
	        }
	    }
	    return(
	        <div>
	            <button onClick = { cb("我们通信把") }>点击我</button>
	        </div>
	    )
	}
	
	export default Sub;

### 跨组件传值

> 16.3版本提供了新的context api,并且用了生产者消费者模式，
	
	const {Provider, Consumer} = React.createContext({
	    color: 'white'
	});
	 
	 
	class Item extends Component {
	    static contextTypes = {
	        color: React.PropTypes.string,
	    };
	 
	    render() {
	        const {value} = this.props;
	        return (
	            <Consumer>
	                {context => (
	                    <li style={{background: context.color}}>
	                        <span>{value}</span>
	                    </li>
	                )}
	            </Consumer>
	        );
	    }
	}
	 
	 
	class List extends Component {
	 
	    render() {
	        const {list} = [{id: '1', text: 1}, {id: '1', text: 2}, {id: '1', text: 3}]
	        return (
	            <Provider value={{color: 'green'}}>
	                <div>
	                    <ul>
	                        {list.map((entry, index) => (
	                            <Item key={entry.id} value={entry.text}/>
	                        ))}
	                    </ul>
	                </div>
	            </Provider>
	        );
	    }
	}

**上面的代码通过React.createContext创建出一个上下文：Context对象，然后这个Context对象又包含两个属性，一个叫Provider，另一个叫Consumer，这两个属性都是纯种的React组件。**

**在父组件中运用Provider，在子组件中运用Consumer即可，Provider中通过value属性可以向Consumer传递参数，而Consumer的子组件则是一个函数，在这个子组件中定义一个函数，Consumer会向它传递一个context，这个context来自于Provider，达到通信的目的**

### 非嵌套组件间通信

**这里我们采用自定义事件的方式来实现非嵌套组件间的通信。**

	npm install events --save

> 新建一个 ev.js，引入 events 包，并向外提供一个事件对象，供通信时使用：

	import { EventEmitter } from "events";
	export default new EventEmitter();

> App.js：

	import React, { Component } from 'react';

	import Foo from "./Foo";
	import Boo from "./Boo";
	
	import "./App.css";
	
	export default class App extends Component{
	    render(){
	        return(
	            <div>
	                <Foo />
	                <Boo />
	            </div>
	        );
	    }
	}

> Foo.js：

	import React,{ Component } from "react";
	import emitter from "./ev"
	
	export default class Foo extends Component{
	    constructor(props) {
	        super(props);
	        this.state = {
	            msg:null,
	        };
	    }
	    componentDidMount(){
	        // 声明一个自定义事件
	        // 在组件装载完成以后
	        this.eventEmitter = emitter.addListener("callMe",(msg)=>{
	            this.setState({
	                msg
	            })
	        });
	    }
	    // 组件销毁前移除事件监听
	    componentWillUnmount(){
	        emitter.removeListener(this.eventEmitter);
	    }
	    render(){
	        return(
	            <div>
	                { this.state.msg }
	                我是非嵌套 1 号
	            </div>
	        );
	    }
	}

> Boo.js：

	import React,{ Component } from "react";
	import emitter from "./ev"
	
	export default class Boo extends Component{
	    render(){
	        const cb = (msg) => {
	            return () => {
	                // 触发自定义事件
	                emitter.emit("callMe","Hello")
	            }
	        }
	        return(
	            <div>
	                我是非嵌套 2 号
	                <button onClick = { cb("blue") }>点击我</button>
	            </div>
	        );
	    }
	}

**自定义事件是典型的发布/订阅模式，通过向事件对象上添加监听器和触发事件来实现组件间通信。**

## 总结：

- 父传子：通过props
- 子传父：通过回调
- 跨组件传值： 引入react.createContext()中的{provider, consumer}，使用生产者和消费者模式，在父组件中使用provider 传入值，子组件通consumer 接收一个对象的函数回调[<consumer>{context => (<\li>{context}<\/li>)}]
- 同级组件通讯：使用events插件，通过发布订阅者模式执行





