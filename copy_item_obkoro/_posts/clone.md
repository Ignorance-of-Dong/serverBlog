---
title: 浅拷贝与深拷贝
date: '3/29/2019 5:00:10 PM '
tag: ['js', '拷贝']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# 浅拷贝与深拷贝

----------


## 数据类型

###数据类型分为两种【基本数据类型，复杂数据类型】

> - 基本数据类型：直接存储在栈(stack)中的数据
> 	- String
> 	- Number
> 	- Boolean
> 	- Null
> 	- Undefined
> 	- Symbol
> 	

----------

> - 引用数据类型：存储的是该对象在栈中引用，真实的数据存放在堆内存里
>  - 对象数据类型【object，function】

## 浅拷贝与深拷贝

### 深拷贝和浅拷贝是只针对Object和Array这样的引用数据类型的。

#### 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

## 赋值和浅拷贝的区别

> - **当我们把一个对象赋值给一个新的变量时，赋的其实是该对象的在栈中的地址，而不是堆中的数据。也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的。**

----------

> - **浅拷贝是按位拷贝对象，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。即默认拷贝构造函数只是对对象进行浅拷贝复制(逐个成员依次拷贝)，即只复制对象空间而不复制资源。**

## 浅拷贝的实现方式

### Object.assign()

> **Object.assign()进行的是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身。**
> 
> **当object只有一层的时候，是深拷贝**

### Array.prototype.concat()

	let arr = [1, 3, 
	  {
	    username: 'kobe',
		  childran: [
	        {
	          username: 'kobe',
	          childran: [
	              {
	                username: 'kobe',
	                  childran: [
	                      
	                  ]
	              }
	          ]
	        }
	    ]
	    }];
	let arr2=arr.concat();    
	console.log(arr);

> 修改新对象会改到原对象:

### Array.prototype.slice()

	let arr = [1, 3, {
	    username: ' kobe'
	    }];
	let arr3 = arr.slice();
	arr3[2].username = 'wade'
	console.log(arr);

> 同样修改新对象会改到原对象:

### 关于Array的slice和concat方法的补充说明:

**Array的slice和concat方法不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。**

## 深拷贝的实现方式

### JSON.parse(JSON.stringify())

	let arr = [1, 3, {
	    username: ' kobe'
	}];
	let arr4 = JSON.parse(JSON.stringify(arr));
	arr4[2].username = 'duncan'; 
	console.log(arr, arr4)

> 原理：

**用JSON.stringify将对象转成JSON字符串，再用JSON.parse()把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。**

> 弊端：

> **这种方法虽然可以实现数组或对象深拷贝,但不能处理函数**

### 递归方法

> 递归方法实现深度克隆原理:

**遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝**

	//定义检测数据类型的功能函数
	function checkedType(target) {
	  return Object.prototype.toString.call(target).slice(8, -1)
	}
	//实现深度克隆---对象/数组
	function clone(target) {
	  //判断拷贝的数据类型
	  //初始化变量result 成为最终克隆的数据
	  let result,
	    targetType = checkedType(target)
	  if (targetType === 'Object') {
	    result = {}
	  } else if (targetType === 'Array') {
	    result = []
	  } else {
	    return target
	  }
	  //遍历目标数据
	  for (let i in target) {
	    //获取遍历数据结构的每一项值。
	    let value = target[i]
	    //判断目标结构里的每一值是否存在对象/数组
	    if (checkedType(value) === 'Object' || checkedType(value) === 'Array') {
	      //对象/数组里嵌套了对象/数组
	      //继续遍历获取到value值
	      result[i] = clone(value)
	    } else {
	      //获取到value值是基本的数据类型或者是函数。
	      result[i] = value
	    }
	  }
	  return result
	}