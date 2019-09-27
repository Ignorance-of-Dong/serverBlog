---
title: vue和react的区别
date: '4/1/2019 12:00:53 PM '
tag: ['react', 'vue']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## vue和react的区别

> react和vue都是组件化，整体功能类似，但是设计思路有有所不同，


### 出身

> react

**React是由Facebook创建的JavaScript UI框架，它的诞生改变了JavaScript世界，最大的一个改变就是React推广了Virtual DOM， 并且创造了新的语法 – JSX，JSX 允许在JavaScript中写html代码。**

> vue

**Vue是由尤大大开发的一个MVVM框架，它采用的是模板系统而不是JSX。**

### 模板渲染方式不同

> react

**React是通过JSX来渲染模板，React通过原生JS实现模板中的常见语法，比如说条件啊、循环啊、三元运算符啊等，都是通过JS语法实现**

> vue

**vue是通过扩展的HTML来进行模板的渲染，Vue是在和组件代码分离的单独模板中，通过指令v-if、v-for等实现**

### Virtual DOM

> react

**React默认是通过比较引用得方式进行，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。如果想避免不必要的子组件重新渲染，你需要在所有可能的地方使用PureComponent，或者手动实现shouldComponentUpdate方法。但是Vue中，你可以认定它是默认的优化。**

> vue

**Vue可以更快地计算出Virtual DOM的差异，这是由于它在渲染过程中，由于vue会跟踪每一个组件的依赖收集，通过setter / getter 以及一些函数的劫持，能够精确地知道变化，并在编译过程标记了static静态节点，在接下来新的Virtual DOM 并且和原来旧的 Virtual DOM进行比较时候，跳过static静态节点。所以不需要重新渲染整个组件树。**

### 数据流

### Vuex 和 Redux

> react

**在React中，我们需要每一个组件都引入connect，目的就是把props和dispatch连接起来。redux只能通过dispatch，然后在reducer里，接收到action，通过判断action的type，从而进行对应的操作，redux不能直接调用reducer进行修改！！**

> vue

**在vuex中，我们可以通过在main.js中，引入 store文件夹，并把store挂载到new Vue实例中，这样我们可以直接通过$store灵活使用。**

> - 你可以通过dispatch和commit进行更新数据，
> - 通过this.$store.state.xx读取数据
> - 你可以通过mapState / mapActions 进行vuex的操作


## 总结

----------


> - 组件的创建方式不一样
> 	- react使用class和函数创建组件【只有局部】
> 	- vue则使用vue的实例的components方法和components属性【有局部和全局一说】
> - 在react中没有指令，计算属性，watch监听，computed，这些内容
> - 在react组件中只有几个概念，生命周期，state。props。合成事件
> - 在vue中可以使用v-modle完成数据的双向绑定，而在react并没有指令的概念，所以使用受控组件代替
> - 在vue中使用getter，setter拦截器，处理数据的绑定，而react则使用的是setState手动触发

----------




