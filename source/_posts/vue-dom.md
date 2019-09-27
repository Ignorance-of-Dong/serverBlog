---
title: vue中的Dom操作
date: '2019-01-27 13:40:31'
tag: ['dom', 'vue']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## vue中的Dom操作

### 在vue，react，。。。。以数据驱动视图的框架，都是通过数据更新视图，一般不使用dom操作，但是也有一些特定的时候需要用到dom操作


## dom操作的方法

----------

> 
> 
1. transition:组件中的钩子函数可以接受一个el属性，作用动画的dom，可以多dom添加实现动画效果
2. ref：ref可以作用在dom元素和组件元素上，作用在dom元素上通过refs获取到就是dom节点，作用在组件元素上获取到组件实例
3. 在mounted生命周期中我们可以使用document的dom的操作方法，比如添加一些滚动事件...
4. #el：可以获取组件的根节点元素
5. ￥mount()：可以手动渲染组件，成为真实的dom节点
6. 事件中的e.target可以获取都绑定事件的dom，但不准确，因为获取到的是点击最内层的元素，当然如果作用在表单元素就无所谓
7. 指令也可以操作dom的
>  


----------

