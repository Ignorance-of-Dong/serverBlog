---
title: React.Component 与 React.PureComponent（React之性能优化）
date: '4/3/2019 10:05:06 AM '
tag: ['js', 'react']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## React.Component 与 React.PureComponent（React之性能优化）

**提起React.PureComponent，首先要从一个生命周期函数【shouldComponentUpdate】说起，都知道这个函数是用来控制组件是否应该被渲染**

	shouldComponentUpdate

**这个生命周期返回的是一个布尔值，如果返回为false的，其实就是不执行render函数，不执行就不会重新渲染，返回为true的时候，就会执行，如果不写这个生命周期，默认返回true**

**写入shouldComponentUpdate，可以提高性能，你可以在该函数根据业务需求来判断是否重新渲染**

	class CounterButton extends React.Component {
	    constructor(props) {
	        super(props);
	        this.state = {count: 1};
	    }
	    shouldComponentUpdate(nextProps, nextState) {
	        if (this.props.color !== nextProps.color) {
	            return true;
	        }
	        if (this.state.count !== nextState.count) {
	            return true;
	        }
	        return false;
	    }
	    render() {
	        return (
	            <button
	                color={this.props.color}
	                onClick={() => this.setState(state => ({count: state.count + 1}))}
	            >
	                Count: {this.state.count}
	            </button>
	        );
	    }
	}

## React.Component 与 React.PureComponent

**通常情况下，我们会使用ES6的class关键字来创建React组件：**
	
	class MyComponent extends React.Component {
	    // some codes here ...
	}

**但是，你也可以创建一个继承React.PureComponent的React组件，就像这样**

	class MyComponent extends React.PureComponent {
	    // some codes here
	}

### 区别：

- 继承PureComponent时，不能再重写shouldComponentUpdate，否则会引发警告

----------


	Warning: ListOfWords has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.

> 警告：ListOfWords有一个名为ShouldComponentUpdate（）的方法。扩展react.pureComponent时不应使用ShouldComponentUpdate。如果使用shouldComponentUpdate，请扩展react.component。

- 继承PureComponent时，进行的是浅比较，也就是说，如果是引用类型的数据，只会比较是不是同一个地址，而不会比较具体这个地址存的数据是否完全一致

### PureComponent

#### 原理:

**当组件更新时，如果组件的 props 和 state 都没发生改变， render 方法就不会触发，省去 Virtual DOM 的生成和比对过程，达到提升性能的目的。具体就是 React 自动帮我们做了一层浅比较：**

	if (this._compositeType === CompositeTypes.PureClass) {
	    shouldUpdate = !shallowEqual(prevProps, nextProps) || !shallowEqual(inst.state, nextState);
	}

**而 shallowEqual 又做了什么呢？会比较 Object.keys(state | props) 的长度是否一致，每一个 key 是否两者都有，并且是否是一个引用，也就是只比较了第一层的值，确实很浅，所以深层的嵌套数据是对比不出来的。**

#### 问题:

**大部分情况下，你可以使用React.PureComponent而不必写你自己的shouldComponentUpdate，它只做一个浅比较。但是由于浅比较会忽略属性或状态突变的情况，此时你不能使用它。**

	class ListOfWords extends React.PureComponent {
	  render() {
	    return <div>{this.props.words.join(',')}</div>;
	  }
	}
	
	class WordAdder extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      words: ['marklar']
	    };
	    this.handleClick = this.handleClick.bind(this);
	  }
	
	  handleClick() {
	    // This section is bad style and causes a bug
	    const words = this.state.words;
	    words.push('marklar');
	    this.setState({words: words});
	  }
	
	  render() {
	    return (
	      <div>
	        <button onClick={this.handleClick} />
	        <ListOfWords words={this.state.words} />
	      </div>
	    );
	  }
	}

**在ListOfWords中，this.props.words是WordAdder中传入的其state的一个引用。虽然在WordAdder的handelClick方法中被改变了，但是对于ListOfWords来说，其引用是不变的，从而导致并没有被更新。**

### 解决方法

**在上面的问题中可以发现，当一个数据是不变数据时，可以使用一个引用。但是对于一个易变数据来说，不能使用引用的方式给到PureComponent。简单来说，就是我们在PureComponent外层来修改其使用的数据时，应该给其赋值一个新的对象或者引用，从而才能确保其能够进行重新渲染。例如上面例子中的handleClick可以通过以下几种来进行修改从而确认正确的渲染：**

	handleClick() {
	  this.setState(prevState => ({
	    words: prevState.words.concat(['marklar'])
	  }));
	}
	
	或者
	
	handleClick() {
	  this.setState(prevState => ({
	    words: [...prevState.words, 'marklar'],
	  }));
	};
	
	或者针对对象结构：
	
	function updateColorMap(oldObj) {
	  return Object.assign({}, oldObj, {key: new value});
	}

#### immutable.js

**是解决这个问题的另一种方法。它通过结构共享提供不可突变的，持久的集合：**

详情参考[immutable.js](https://github.com/immutable-js/immutable-js)

## 总结

> **PureComponent 真正起作用的，只是在一些纯展示组件上，复杂组件使用的话shallowEqual 那一关基本就过不了。另外在使用的过程中为了确保能够正确的渲染，记得 props 和 state 不能使用同一个引用哦。**