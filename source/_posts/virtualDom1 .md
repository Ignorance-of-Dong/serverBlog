---
title: 浅谈React的最大亮点——虚拟DOM
date: '4/3/2019 3:09:41 PM '
tag: ['js', 'react']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## 浅谈React的最大亮点——虚拟DOM

**React非常快速是因为它从不直接操作DOM。**

**虚拟DOM是在DOM的基础上建立了一个抽象层，对数据和状态所做的任何改动，都会被自动且高效的同步到虚拟DOM，最后再批量同步到DOM中。**

**在React中，render执行的结果得到的并不是真正的DOM节点，而仅仅是JavaScript对象，称之为虚拟DOM。**

**虚拟DOM具有批处理和高效的Diff算法，可以无需担心性能问题而随时“刷新”整个页面，因为虚拟DOM可以确保只对界面上真正变化的部分进行实际的DOM操作。**

## 虚拟DOM的原理：

**React会在内存中维护一个虚拟DOM树，对这个树进行读或写，实际上是对虚拟DOM进行。当数据变化时，React会自动更新虚拟DOM，然后将新的虚拟DOM和旧的虚拟DOM进行对比，找到变更的部分，得出一个diff，然后将diff放到一个队列里，最终批量更新这些diff到DOM中。**

## 虚拟DOM的优点：

**最终表现在DOM上的修改只是变更的部分，可以保证非常高效的渲染。**

## 虚拟DOM的缺点：

**首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。**

## 虚拟DOM的理解误区

**对虚拟DOM的理解往往停留在：通过JavaScript对象模拟原生DOM，加上DOM Diff 极大提升了DOM操作的性能。然而，虚拟DOM最大的意义不在于性能的提升（JavaScript对象比DOM对象性能高），而在于抽象了DOM的具体实现（对DOM进行了一层抽象），这在浏览器中使用 React时不是特别明显，因为写的DOM标签跟原生的没有区别，并且最终都被渲染成了DOM，在React Native中将会有很好的说明。**

## 模拟方法和渲染方法

> 调用

	let virtualDom1 = createElement('ul', {class: 'list'}, [
	    createElement('li', {class: 'item'}, ['a']),
	    createElement('li', {class: 'item'}, ['b']),
	    createElement('li', {class: 'item'}, ['c']),
	])
	let virtualDom2 = createElement('ul', {class: 'list'}, [
	    createElement('li', {class: 'item'}, ['1']),
	    createElement('li', {class: 'item'}, ['2']),
	    createElement('li', {class: 'item'}, ['3']),
	])
	let el = render(virtualDom);
	renderDom(el, window.root);
	let patchs = diff(virtualDom1, virtualDom2);

> 生成虚拟对象的方法createElement

	function createElement(type, props, children) {
	    return new Element(type, props, children)
	}
	class Element{
	    constructor(type, props, children){
	        this.type = type;
	        this.props = props;
	        this.children = children
	    }
	}

> 将虚拟对象渲染成真实DOM的render方法

	//render方法将vNode转化成真实DOM
	function render(eleObj){
	    //创建元素
	    let el = document.createElement(eleObj.type);
	    //设置属性
	    for(let key in eleObj.props) {
	        setAttr(el, key, eleObj.props[key]);
	    }
	    //递归渲染子元素
	    eleObj.children.foEach(child => {
	        child = child instanceof Element ? render(child) : document.createTextNode(child);
	        el.appendChild(child);
	    })
	}
	setAttr(node, key, value) {
	    switch(key) {
	        case 'value':
	            if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
	                node.value = value;          
	            }else {
	                node.setAttribute(key, value);
	            }
	            break;
	        case 'style':
	            node.style.cssText = value;
	            break;
	        default:
	            node.setAttribute(key, value);
	            break;
	    }
	}

> 渲染节点到页面的方法renderDom

	//将真实DOM渲染到页面
	function renderDom(el, target) {
	    target.appendChild(el);
	}

## DOM DIFF 算法

**DOM DIFF 就是比较两个虚拟DOM的区别，实际上就是比较两个对象的区别。根据两个虚拟对象创建出补丁，描述改变的内容。将这个补丁用来更新DOM。**

> 【注意】不会更改所有节点，只更改有改变的部分


### 算法实现

> 差异计算：先序深度优先遍历

#### 规则：

1. 若节点类型不相同，直接采用替换模式，{type:'REPLACE',newNode:newNode}
2. 当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包，比如{type:'ATTRS',attrs:{class: 'list-group'}
3. 新的DOM节点不存在，也返回一个不存在的补丁包{type:'REMOVE',index:XXX}
4. 文本的变化{type:'TEXT', text:1}

----------


	//diff 算法
	let Index = 0;
	function diff(oldTree, newTree) {
	    let patches = {};
	    let index = 0;
	    //递归数比较后的结果放到补丁包中
	    walk(oldTree, newTree, index, patches);
	    return patches;
	}
	function walk(oldTree, newTree, index, patches){
	    let currentPatch = [];//每个元素都有一个补丁对象
	    if (!newTree) {
	        currentPatch.push({type:'REMOVE', index})
	    } 
	    if (isString(oldTree) && isString(newTree)) {
	        // 判断文本是否一致
	        if (oldTree !== newTree) {
	            currentPatch.push({type:'TEXT',text:newTree}); 
	        }
	    }else if(oldTree.type === newTree.type) {
	        //比较属性是否有更改
	        let attrs = diffAttr(oldTree.props, newTree.props);
	        if(Object.keys(attrs).length) {
	            currentPatch.push({type:'ATTRS', attrs});
	        }
	        // 如果有儿子节点，遍历子节点
	          diffChildren(oldTree.children, newTree.children, index, patches);
	    } else {
	        // 节点类型不同的时候，直接替换
	        currentPatch.push({type:'REPLACE', newTree});
	    }
	    // 当前元素有补丁的情况下，将元素和补丁对应起来，放到大补丁包中
	    if(currentPatch.length) {
	        patches[index] = currentPatch; 
	    }
	}
	function diffAttr(oldAttrs, newAttrs) {
	    let patch = {};
	    for(let key in oldAttrs) {
	        if(oldAttrs[key] !== newAttrs[key]) {
	            patch[key] = newAttrs[key];//有可能是undefined，新节点没有旧节点的属性      
	        }
	    }
	    for(let key in newAttrs) {
	        //老节点没有新节点的属性
	        if(! oldAttrs.hasOwnProperty(key)) {
	            patch[key] = newAttrs[key]
	        }
	    }
	    return patch;
	}
	
	function diffChildren(oldChildren, newChildren, index, patches){
	    // 比较老的第一个和新的第一个
	    oldChildren.forEach((child, idx) => {
	        // 记得索引得改
	        // Index 每次传递给walk时，index是递增的，所有节点都基于一个序号实现，因此需要维护一个全局Index
	        walk(child, newChildren[idx], ++Index, patches);
	    }) 
	}
	
	
	function isString(node) {
	    return Object.prototype.toString.call(node) === '[object string]';
	}
	
	
	function patch(node, patches) {
	 // 给某个元素打补丁
	 
	}

## 总结

- dom结构发生改变： 直接卸载并重新create
- dom结构一样： 不会卸载，但是会更新
- 在同一层级的子节点，他们都可以通过key开区分【同时遵循上面两点】

## 衍生：

### 加了key的好处:

> 加了key值可以具体确定哪些元素被修改，便于对比新旧dom树，加快虚拟dom的渲染速度

### 我们该不该把map的index作为key

> 最好将数据本身的id最为key值，如果使用index作为key值，如果前后两次两次arr分别为[1,2,3,4]和[5,6,7,8]和前后两次arr分别为[1,2,3,4]和[4,3,2,1]的情况,很明显前者可以认为是DOM改变了,后者可以认为是DOM节点的位移操作,那么对于第一种情况来说index作为key和没有key值无区别,但是第二种情况用index作为key值效果没有比用数据本身作为key值好

### key值必须唯一且不重复么

> 前提条件是是否为同一父节点

----------
> [参考文章：飞飞廉的简书](https://www.jianshu.com/p/8c1505ebcf0e)
