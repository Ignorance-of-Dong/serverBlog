---
title: js事件机制
date: '3/29/2019 7:22:50 PM '
tag: ['js', 'Event']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## js事件机制

**、主要分为Dom0级事件和Dom2事件**

> Dom0级事件处理方式： 

	btn.onclick = func; 
   	btn.onclick = null; 

> Dom2级事件处理方式：
	
	// 非IE
	btn.addEventListener('click', func, false); 
    btn.removeEventListener('click', func, false); 
	// IE
    btn.attachEvent("onclick", func); 
    btn.detachEvent("onclick", func); 

## 事件的三个阶段

- 捕获
- 目标
- 冒泡

> **js冒泡和捕获的的区别**

**冒泡型事件：**

> 事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发。 

**捕获型事件:**

> 事件从最不精确的对象(document 对象)开始触发，然后到最精确(也可以在窗口级别捕获事件，不过必须由开发人员特别指定)。 

**DOM事件流:**

> 同时支持两种事件模型：捕获型事件和冒泡型事件，但是，捕获型事件先发生。两种事件流会触及DOM中的所有对象，从document对象开始，也在document对象结束。 

**事件捕获:**

> 当你使用事件捕获时，父级元素先触发，子级元素后触发，即div先触发，p后触发。 

**事件冒泡:**

> 当你使用事件冒泡时，子级元素先触发，父级元素后触发，即p先触发，div后触发。 

## 阻止冒泡

> 非IE

	e.stopPropagation()

> IE

	cancelBubble = true

## 阻止捕获

> 非IE

	e.preventDefault()

> IE

	returnValue = false

## 事件“捕获”和“冒泡”执行顺序和事件的执行次数？

**按照W3C标准流程如下：**

> 进入捕获阶段 →→→ 到达目标元素 →→→ 进入到冒泡阶段

**事件执行次数**

> 元素上绑定事件的个数

### 在一个DOM上同时绑定两个点击事件：一个用捕获，一个用冒泡。事件会执行几次，先执行冒泡还是捕获？ 

> 该DOM上的事件如果被触发，会执行两次（执行次数等于绑定次数）
>  
> 如果该DOM是目标元素，则按事件绑定顺序执行，不区分冒泡/捕获
> 
> 如果该DOM是处于事件流中的非目标元素，则先执行捕获，后执行冒泡 


