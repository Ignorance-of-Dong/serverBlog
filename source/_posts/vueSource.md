---
title: vue2.0 某些原理概述
date: "7/6/2021 4:28:16 PM "
tag: ["vue", "vue2"]
meta:
  - name: description
    content: null
  - name: keywords
    content: null
---

# Vue2.0

## Vue初始化过程中（new Vue(options)） 都做了什么

- 处理组件配置项

    - 初始化根组件进行了 选项合并操作，将全局配置合并到根组件的局部配置上
    - 初始化每个子组件做了一些性能优化，将组件配置对象上的一些深层次的属性放到vm.$options选项中，提高代码执行效率

- 初始化组件实例的关系属性，如$pranet, $children, $root, $refs

- 处理自定义事件

- 调用beforeCreate 钩子函数

- 初始化inject 配置项，得到`ret[key] = val`形式的配置对象，然后对该配置进行响应式处理，并代理每个key到vm实例上

- 数据响应式，处理props methods data watch 等选项

- 解析组件配置上的provide对象，将其挂载到vm_provoded属性上

- 调用created钩子函数

- 如果发现配置选项中有el选项，则自动调用$mount方法，如果没有el选项则需要调用$mount

- 接下来进入挂载阶段

## vue 响应式原理实现

- 响应式的核心是通过Object.defondProperty 拦截对数据的访问和设置

- 响应式的数据分为两类

    - 对象，循环遍历对象的所有属性，为每个属性设置getter，setter，以达到拦截访问和设置的母的，如果属性值依旧为对象
    ，则递归为属性值上的每一个key设置getter，setter
        - 访问数据是`{obj.key}`进行依赖收集，在dep中存储相关的watcher
        - 设置数据时有dep通知相关的watcher去更新
    
    - 数组，增强数组的那7个可以更改自身的原型方法，然后拦截对这些方法的操作
        - 添加新数据进行响应式处理，然后dep通知watcher去更新
        - 删除数据时，也要有dep通知watcher去更新

## methods, computed, 和 watch有什么区别

- 使用场景

    - methods 一般用于封装一写较为复杂的处理逻辑（同步 or 异步）
    - computed 一般用于封装一些简单的同步逻辑，将处理的数据返回，然后显示在模版中，以减轻模版的重量
    - watch 一般用于当需要在数据变化时需要执行操作

- 区别

    - methods VS conputed

