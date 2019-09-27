---
title: JS 防抖（debouce）与节流（throttle）
date: '2019-02-21 16:46:31'
tag: ['js', 'vue', 'debouce', 'throttle']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## JS 防抖（debouce）与节流（throttle）


###  防抖和节流是针对响应跟不上触发频率这类问题的两种解决方案。 在给DOM绑定事件时，有些事件我们是无法控制触发频率的。 如鼠标移动事件onmousemove, 滚动滚动条事件onscroll，窗口大小改变事件onresize，瞬间的操作都会导致这些事件会被高频触发。 如果事件的回调函数较为复杂，就会导致响应跟不上触发，出现页面卡顿，假死现象。 在实时检查输入时，如果我们绑定onkeyup事件发请求去服务端检查，用户输入过程中，事件的触发频率也会很高，会导致大量的请求发出，响应速度会大大跟不上触发。

> #### 针对此类快速连续触发和不可控的高频触发问题，debounce 和 throttling 给出了两种解决策略；

## 防抖(debouce)

### 定义
	
> 函数防抖的含义就是在一定时间段内只有一个同类的事件触发并执行；如果该时间段有同类的事件触发，则重新开始响应该事件


----------


> **实例**

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Test</title>
	</head>
	<body>
		<input type="text" name="input" onkeyup="debouce(inputHandler);">
		<script type="text/javascript">
			 let i = 0;
	    	function inputHandler () {
				console.log(i++); 
			}
			let timer;
			function debouce (fn) {
				clearTimeout(timer); 
				timer = setTimeout(() => {
					fn();
				}, 500)
			}
		</script>
	</body>
	</html>

## 节流（throttle）

## 定义

> **函数节流的含义就是在一定的时间段内相应的事件只能被触发一次；如果某段有已经有相应的事件在执行，则在该时间段内不再触发，直到本次事件执行结束；**


----------
> 实例

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Test</title>
	</head>
	<body>
		<input type="text" name="input" onkeyup="debouce(inputHandler);">
		<script type="text/javascript">
			 let i = 0;
	    	function inputHandler () {
				console.log(i++); 
			}
			let timer;
			function throttle (fn) {
			    if (timer) {
			        return;
			    }
			    timer = setTimeout(() => {
			        fn();
			    }, 200);
			}
		</script>
	</body>
	</html>


## 区别

>    **——— 函数去抖和函数节流都是密集型操作中避免事件频繁出发造成性能损耗的解决方案；函数节流，顾名思义就是节约流量，所以每个时间段内只会执行一次，并在此时间段内屏蔽触发的同类事件；而函数去抖则是在用户连续操作中避免事件处理的处理效率不及时间触发速度，从而导致画面卡顿，操作不畅等不良用户体验，所以在很短的时间段内只响应最近触发的事件；**