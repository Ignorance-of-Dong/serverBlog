---
title: react-redux
date: '4/5/2019 8:03:01 PM '
tag: ['js', 'react']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## react-redux

### 为什么需要redux

**学过react的都知道，react用state和props控制组件的渲染情况，而对于JavaScript单页面日趋复杂的今天，JavaScript需要管理越来越多的state，而这些state包括着各种乱七八糟途径来的数据。甚至有的应用的state会关系到另一个组件的状态。所以为了方便对这些state的管理以及对state变化的可控性。这个时候Redux这个东西就出来了，它可以让state的变化变得可预测。**

### Redux的基本概念

**什么是redux？这里非权威的解释：就是一个应用的state管理库，甚至可以说是前端数据库。更包括的是管理数据。**

#### state

**state是整个应用的数据，本质上是一个普通对象。**

#### action

**数据state已经有了，那么我们是如何实现管理这些state中的数据的呢？那就是action，什么是action？按字面意思解释就是动作，也可以理解成，一个可能！改变state的动作包装。就这么简单。。。。**

**比如有一个counter数量加减应用，我们就有两个action，一个decrement，一个increment。 所以这里的action creator写成如下：**

	export function decrement() {
	    return{
	        type:DECREMENT_COUNTER
	    }
	}
	
	export function increment(){
	    return{
	        type:INCREMENT_COUNTER
	    }
	}


**那么，当action创建完成了之后呢，我们怎么触发这些action呢，这时我们是要利用dispatch，比如我们执行count增减减少动作。**

	export function incrementIfOdd(){
	    return(dispatch,getState)=>{
	        const {counter} = getState();
	        if(counter%2==0) {
	            return;
	        }
	        dispatch(increment());
	    }
	}
	
	export function incrementAsync() {
	    return dispatch => {
	        setTimeout(() => {
	            dispatch(increment());
	        }, 1000);
	    };
	}

**为了减少样板代码，我们使用单独的模块或文件来定义 action type 常量**

	export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
	export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

**这么做不是必须的，在大型应用中把它们显式地定义成常量还是利大于弊的。**

#### reducer

**既然这个可能改变state的动作已经包装好了，那么我们怎么去判断并且对state做相应的改变呢？对，这就是reducer干的事情了。**

**reducer是state最终格式的确定。它是一个纯函数，也就是说，只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。**

**reducer对传入的action进行判断，然后返回一个通过判断后的state，这就是reducer的全部职责。如我们的counter应用：**

	import {INCREMENT_COUNTER,DECREMENT_COUNTER} from '../actions';

	export default function counter(state = 0, action) {
	    switch (action.type){
	        case INCREMENT_COUNTER:
	            return state+1;
	        case DECREMENT_COUNTER:
	            return state-1;
	        default:
	            return state;
	    }
	}

**对于一个比较大一点的应用来说，我们是需要将reducer拆分的，最后通过redux提供的combineReducers方法组合到一起。 如此项目上的：**

	const rootReducer = combineReducers({
	    counter
	});
	export default rootReducer;

**每个reducer只负责管理全局state中它负责的一部分。每个reducer的state参数都不同，分别对应它管理的那部分state数据。combineReducers()所做的只是生成一个函数，这个函数来调用你的一系列reducer，每个reducer根据它们的key来筛选出state中的一部分数据并处理， 然后这个生成的函数再将所有reducer的结果合并成一个大的对象。**

#### store

**store是对之前说到一个联系和管理。具有如下职责**


> - 维持应用的state；
> - 提供getState()方法获取 state
> - 提供dispatch(action)方法更新 state；
> - 通过subscribe(listener)注册监听器;
> - 通过subscribe(listener)返回的函数注销监听器。

**强调一下 Redux 应用只有一个单一的store。当需要拆分数据处理逻辑时，你应该使用reducer组合,而不是创建多个store。store的创建通过redux的createStore方法创建，这个方法还需要传入reducer，很容易理解：毕竟我需要dispatch一个action来改变state嘛。 应用一般会有一个初始化的state，所以可选为第二个参数，这个参数通常是有服务端提供的，传说中的Universal渲染。 第三个参数一般是需要使用的中间件，通过applyMiddleware传入。**

### redux-thunk

**一个比较流行的redux的action中间件，它可以让actionCreator暂时不返回action对象，而是返回一个函数，函数传递两个参数(dispatch, getState)，在函数体内进行业务逻辑的封装，比如异步操作，我们至少需要触发两个action，这时候我们可以通过redux-thunk将这两个action封装在一起，如下：**

> store.js

	import { createStore, applyMiddleware } from "redux";
	import RankReducer from "./reducers/reducer"
	import thunk from "redux-thunk";
	const store = createStore(RankReducer, applyMiddleware(thunk));
	export default store

> reducer.jsx

	const defaultState = {
	    rankList: []
	}
	const RankReducer = (state = defaultState, action) => {
	    const { type, layload } = action;
	    switch (type) {
	        case "UPDATE":
	            return { ...state, rankList: layload }
	        default:
	            return state;
	    }
	}
	export default RankReducer;

> rank.js

	import axios from "axios"

	export function updata(layload){
	    return function(dispatch){
	        return axios.get("/getrankList").then(result=>{
	            return dispatch({
	                type:"UPDATA",
	                layload:result.data.data
	            })
	        })
	    }
	}

> index.jsx

	import {updata} from "../../store/action/rank"
	const mapdispatchToprops=(dispatch)=>{
	    return {
	        updata(){
	            dispatch(updata())
	        },
	        add(layload){
	            dispatch({
	                type:"ADD",
	                layload:layload
	            })
	        }
	    }
	}

### react-redux

**redux和react的桥梁工具。**

> index.js

	import React from 'react';
	import ReactDOM from 'react-dom';
	import "./common/css/index.css"
	import App from '../src/containers/app';
	import {Provider} from "react-redux"
	import {store} from "./store/store"
	
	ReactDOM.render(
	        <Provider store={store}>
	          
	                <App />
	            
	        </Provider>
	     ,document.getElementById('root')
	);


> home.js

	import React from "react"
	import {connect} from "react-redux"
	class Home extends React.Component{


	}

	const mapstateToprops=(state)=>{
	    return state
	}
	const mapdispatchToprops=(dispatch)=>{
	    return {
	        updata(){
	            dispatch(updata())
	        },
	        add(layload){
	            dispatch({
	                type:"ADD",
	                layload:layload
	            })
	        }
	    }
	}
	export default connect(mapstateToprops,mapdispatchToprops)(Home) 

### redux-saga

**上面介绍了redux-thunk是异步操作的方法，我们可以看出，他的函数内部比较复杂，如果需要每个异步操作都定义一个action的话，显然是不易维护的**

### redux-saga的API

**redux-saga是通过ES6中的generator实现的（babel的基础版本不包含generator语法，因此需要在使用saga的地方import ‘babel-polyfill’）。redux-saga本质是一个可以自执行的generator。**

#### redux-saga中的Effect

**redux-saga中定义了Effect，Effect是什么呢，本质就是一个特定的函数，返回的是纯文本对象。简单理解，通过Effect函数，会返回一个字符串，saga-middleware根据这个字符串来执行真正的异步操作，可以具体表现成如下形式：**

> 异步操作——>Effect函数——>纯文本对象——>saga-middleware——>执行异步操作

**因为Effect的存在，方便saga测试异步操作。**

#### Effect具体函数

**Effect函数有很多个，在redux-saga/effects提供，主要包括call，fork，put，take，select等，它们都与middleware中的操作一一对应。**

- call 和 fork

> call和fork表示异步调用，其中call表示的是阻塞调用，fork表示的是非阻塞调用。

- put和select

> put对应的是middleware中的dispatch方法，参数是一个plain object，一般在异步调用返回结果后，接着执行put。select相当于getState，用于获取store中的相应部分的state。

- take、takeEvery、takeLatest

> redux-saga中如果在非阻塞调用下（fork）,那么遵循的是worker/watcher模式，通过take可以监听某个action是否被发起，此外通过take结合fork，可以实现takeEvery和takeLatest的效果。

> 如果一个异步操作的action被发起多次，takeEvery会执行多次action，而takeLatest只会执行最近的一次。

###  redux-saga的优缺点

> 优点：

（1）集中处理了所有的异步操作，异步接口部分一目了然

（2）action是普通对象，这跟redux同步的action一模一样

（3）通过Effect，方便异步接口的测试

（4）通过worker 和watcher可以实现非阻塞异步调用，并且同时可以实现非阻塞调用下的事件监听

（5） 异步操作的流程是可以控制的，可以随时取消相应的异步操作。

> 缺点：

 太复杂，学习成本较高


### 使用方式

> sagas.js

	import { takeEvery, takeLatest } from 'redux-saga';
	import { call, put } from 'redux-saga/effects';
	import axios from 'axios';
	import { BEGIN_GET_POSTS, GET_POSTS, GET_POSTS_ERROR } from '../reducers';
	
	// worker saga
	function* showPostsAsync(action) {
	    try {
	        const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/posts');
	        yield put(GET_POSTS(response.data));
	    } catch(e) {
	        yield put(GET_ERROR(e));
	    }
	}

> reducers.js

	import { combineReducers } from 'redux'

	// actions
	export const RECEIVE_USERS = 'RECEIVE_USERS';
	export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
	export const RECEIVE_POSTS = 'RECEIVE_POPTS';
	export const FETCH_POSTS_ERROR = 'FETCH_USERS_ERROR';
	export const BEGIN_GET_POSTS = 'BEGIN_GET_POSTS';
	
	// action creators
	export function GET_USERS(users) {
		return { type: RECEIVE_USERS, users }
	}
	
	export function GET_ERROR(error) {
		return { type: FETCH_USERS_ERROR, error }
	}
	
	export function GET_POSTS(posts) {
	    return { type: RECEIVE_POSTS, posts }
	}
	
	export function Begin_GET_POSTS() {
	    return { type: BEGIN_GET_POSTS }
	}
	
	export function GET_POSTS_ERROR(error) {
		return { type: FETCH_POSTS_ERROR, error }
	}
	
	// reducer
	const initialState = { 
		fetched: false, 
		users: [{
			key: '1',
			name: '张三',
			email: 'zhangsan@126.com'
	    }],
	    posts: [{
	        key: '1',
	        id: '1',
	        title: 'test'
	    }],
		error: null
	};
	
	const appReducer = (state = initialState, action) => {
	    switch(action.type) {
	        case FETCH_USERS_ERROR: {
	            return {...state, error: action.error} 
	            break;
	        }
	        case RECEIVE_USERS: {
	            return {...state, fetched: true, users: action.users} 
	            break;
	        }
	        case FETCH_POSTS_ERROR: {
	            return {...state, error: action.error} 
	            break;
	        }
	        case RECEIVE_POSTS: {
	            return {...state, fetched: true, posts: action.posts} 
	            break;
	        }
	    }
	    return state;
	}
	
	export default appReducer


> app.js

	'use strict';
	
	import '../asset/css/style.scss';
	import 'antd/dist/antd.min.css';
	import React from 'react';
	import { render } from 'react-dom';
	import { Provider } from 'react-redux';
	import { createStore, applyMiddleware, combineReducers } from 'redux';
	import logger from 'redux-logger';
	import thunk from 'redux-thunk';
	import createSagaMiddleware from 'redux-saga';
	import axios from 'axios';
	
	import appReducer from './reducers';
	import AppRouter from './router';
	import rootSaga from './sagas';
	
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [thunk, sagaMiddleware, logger];
	
	const store = createStore(appReducer, applyMiddleware(...middlewares));
	sagaMiddleware.run(rootSaga);
	
	render(
	    <Provider store={store}>
	        <AppRouter />
	    </Provider>,
	    document.getElementById('app')
	);


## 总结

### 本文介绍了react-redux基本使用方法：

**首先需要创建仓库，使用redux创建仓库，创建reducer，页面中使用dispatch执行action，将改变的值传递到renducer中，然而链接页面与仓库需要react-redux中的{provider,connect},在根目录进行链接，将组件使用provider包裹起来，将创建的仓库，传入到provider中，视图中使用connect链接仓库。**

### redux-thunk

**使用applymiddle引入插件thunk，创建一个函数，他返回一个函数，这个函数可以接收dispatch，他可以在异步任务执行完以后在，dispatch**

### redux-saga

**redux-sage中的effect中有put，call，select...几个属性，call使用来提交一个异步操作，有两个参数，第一个要执行的异步函数，第二个是要传递的参数，put是用来执行reducer，使用时需要创建一个sage**


