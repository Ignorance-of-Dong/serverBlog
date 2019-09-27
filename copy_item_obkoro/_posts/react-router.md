---
title: 对react-router的封装及api
date: '4/3/2019 7:10:00 PM  '
tag: ['js', 'react']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## 对react-router的封装

**直接上代码吧**

> config.js // 该文件是对路由的配置

	//组件的引入
	import Home from '../contentais/home/index'
	import Login from "../contentais/login/index"
	import Business from './../contentais/home/business/index';
	import Finance from './../contentais/home/finance/index';
	import Tissue from './../contentais/home/tissue/index';
	import Statistics from './../contentais/home/statistics/index';
	import Order from './../contentais/home/order/index';
	import UserHome from './../contentais/home/userHome/index';
	import Loans from './../contentais/home/order/loans/index';
	import Transfer from './../contentais/home/order/transfer/index';
	import Insurance from './../contentais/home/order/insurance/index';
	
	const RouteConfig = [
	    {
	        //title 
	        title: "首页",
	        //路由地址
	        path: "/Home",
	        //关键字重定向
	        defaultRedirect: true,
	        //组件
	        component: Home,
	        //二级路由
	        children: [
	            {
	                key: "1",
	                defaultRedirect: true,
	
	                title: "首页",
	                path: "/Home/one",
	                component: UserHome,
	            },
	            {
	                key: "sub1",
	                title: "订单管理",
	                path: "/Home/order",
	                component: Order,
	                //三级路由
	                children: [
	                    {
	                        defaultRedirect: true,
	
	                        key: "2",
	                        title: "贷款订单",
	                        path: "/Home/order/loans",
	                        component: Loans,
	                    },
	                    {
	                        key: "3",
	                        title: "转单订单",
	                        path: "/Home/order/transfer",
	                        component: Transfer,
	                    },
	                    {
	                        key: "4",
	                        title: "保险订单",
	                        path: "/Home/order/insurance",
	                        component: Insurance,
	                    },
	                    //三级路由的重定向   默认显示的页面
	                    {
	                        path: "/Home/order",
	                        redirect: "/Home/order/loans"
	                    }
	                ]
	            },
	            {
	                key: "5",
	                title: "财务管理",
	                path: "/Home/finance",
	                component: Finance,
	            }
	            ,
	            {
	                key: "6",
	                title: "组织架构",
	                path: "/Home/tissue",
	                component: Tissue,
	            },
	            {
	                key: "7",
	                title: "数据统计",
	                path: "/Home/statistics",
	                component: Statistics,
	            },
	            {
	                key: "8",
	                title: "商务管理",
	                path: "/Home/business",
	                component: Business,
	            },
	            //二级路由的重定向   默认显示的页面
	            {
	                path: "/Home",
	                redirect: "/Home/one"
	            }
	        ]
	    },
	    {
	        title: "登陆",
	        path: "/Login",
	        component: Login,
	    }, {
	        //一级路由的重定向
	        path: "/",
	        redirect: "/Home"
	    }
	]
	export default RouteConfig;

> routerView.js // 路由递归逻辑实现

	import { Route, Switch, Redirect } from "react-router-dom"
	import React, { Component } from 'react';
	class RouteView extends Component {
	    render() {
	
	        // props接收配置文件
	        // routers 下一级路由的参数
	        // defaultConfig默认传参

	        const { routers, defaultConfig } = this.props

			// 这里判断【下一级路由的参数】是否有值 ? 【使用下一级路由的参数】 ： 【默认路由参数】

	        let routerDate = routers ? routers : defaultConfig;

	        //数据二次处理
	
	        //筛除没有重定向的
	        let routerDatepath = routerDate.filter((item) => {
	            return !item.redirect
	        })

	        //筛选重定向
	        let defualtRouter = routerDate.filter((item) => {
	            return item.redirect
	        })

	        //重定向
	        let defualtRedirect = defualtRouter.map((item, i) => {
	            return <Redirect key={i} path={item.path} to={item.redirect}></Redirect>
	        })

	        return (<Switch>
	            {
	                routerDatepath && routerDatepath.map((item, index) => {
	                    const Comp = item.component
	                    // 一个大坑 要用render 不然用component会导致页面的回流
	                    return <Route path={item.path} render={
	                        //api 路由相关参数参数及其它
	                        (api) => {
	                            //动态的title
	                            document.title = item.title || "路由配置"
	                            //把下一级路由参数存入props中
	                            return <Comp routers={item.children} {...api}></Comp>
	                        }
	                    } key={"key" + item.key}></Route>
	                    //重定向
	                }).concat(defualtRedirect)
	            }
	        </Switch>)
	    }
	}
	export default RouteView;

> app.js // 路由调用的使用方式

	import React, { Component } from 'react';
	import { BrowserRouter as Router } from "react-router-dom"
	import RouteConfig from './config.js'; // 引入路由的配置信息
	import RouteView from './routeView,js'; // 引入路由的逻辑实现
	class App extends Component {
	    render() {
	        return <div className="wrapper">
	            <Router>
	                //传入默认路由配置文件
	                <RouteView defaultConfig={RouteConfig}></RouteView>
	            </Router>
	        </div>
	    }
	}
	export default App;

> 二级路由的调用

	import React, { Component } from 'react';
	import RouteView from './../../router/RouteView';
	import SiderMenu from './../../components/SiderMenu/index';
	import "./index.css"
	class Home extends Component {
	    render() {
	        //接收路由配置
	        const { routers } = this.props
	        return <div className="home-wrapper">
	            <div className="left">
	                <div className="user">
	                    <div className="user-img">
	                    </div>
	                    <p className="mt12">你瞅啥</p>
	                    <b className="mt12 radius"></b>
	                </div>
	                //侧边栏的组件
	                <SiderMenu style={{ background:"#2F3B4C"}} {...this.props}></SiderMenu>
	            <div className="ri
	            </div>ght">
	                //传入RouteView当中进行处理
	                <RouteView routers={routers}></RouteView>
	            </div>
	        </div>
	    }
	
	}
	export default Home;

## 'react-router-dom的api

**react-router-dom提供了BrowserRouter, Route, Link等api,我们可以通过dom的事件控制路由。例如点击一个按钮进行跳转，大多数情况下我们是这种情况，所以在开发过程中，我们更多是使用React-router-dom。安装很简单npm i react-router-dom --save,安装了淘宝镜像的就用cnpm吧。**

### 常用的路由api

----------


- HashRouter和BrowserRouter

**它们两个是路由的基本，就像盖房子必须有地基一样，我们需要将它们包裹在最外层，我们只要选择其一就可以了。现在讲它们的不同：**

> HashRouter

**如果你使用过react-router2或3或者vue-router，你经常会发现一个现象就是url中会有个#，例如localhost:3000/#，HashRouter就会出现这种情况，它是通过hash值来对路由进行控制。如果你使用HashRouter，你的路由就会默认有这个#。**

> BrowserRouter

**很多情况下我们则不是这种情况，我们不需要这个#，因为它看起来很怪，这时我们就需要用到BrowserRouter。**

----------

- Route

**Route是路由的一个原材料，它是控制路径对应显示的组件。我们经常用的是exact、path以及component属性。**

	<Route path='/' component='' exact></Route>

> exact控制匹配到/路径时不会再继续向下匹配，
> 
> path标识路由的路径
> 
> component表示路径对应显示的组件

----------


- Link和NavLink的选择

**两者都是可以控制路由跳转的，不同点是NavLink的api更多，更加满足你的需求。**

> Link

**主要api是to，to可以接受string或者一个object，来控制url。使用方法如下**

<Link to='/api'>

> NavLink

**它可以为当前选中的路由设置类名、样式以及回调函数等。使用如下**

	<Navlink to='' activeClassName='actived'>

**activeClassName是选中状态的类名，我们可以为其添加样式**

----------

- Switch

**Switch常常会用来包裹Route，它里面不能放其他元素，用来只显示一个路由。**

----------

