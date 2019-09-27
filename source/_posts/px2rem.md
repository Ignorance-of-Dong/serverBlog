---
title: px2rem 移动端自适应方案
date: ' 1/25/2019 4:36:42 PM '
tag: ['js', 'vue' , 'vue-cli' , 'px2rem']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
----------

1/25/2019 4:36:42 PM

----------

# px2rem

## vue-cli中如何使用px2rem

### 实际开发中，我们通过设计稿得到的值单位是 px，所以要将 px 转换成 rem 再写进样式中。将 px 转换成 rem 我们将使用 px2rem 这个工具，它有 webpack 的 loader：px2rem-loader

## 安装 px2rem-loader

### 在命令行中运行如下安装：

	npm i px2rem-loader --save-dev

## 配置 px2rem-loader

1/25/2019 4:36:17 PM 
### 在 vue-cli 生成的 webpack 配置中，vue-loader 的 options 和其他样式文件 loader 最终是都是由 build/utils.js 里的一个方法生成的。

### 我们只需在 cssLoader 后再加上一个 px2remLoader 即可，px2rem-loader 的 remUnit 选项意思是 1rem=多少像素，结合 lib-flexible 的方案，我们将 px2remLoader 的 options.remUnit 设置成设计稿宽度的 1/10，这里我们假设设计稿宽为 750px。

	// utils.js
	var cssLoader = {
	loader: 'css-loader',
	    options: {
	    sourceMap: options.sourceMap
	  }
	}
	var px2remLoader = {
	loader: 'px2rem-loader',
	    options: {
	    remUnit: 75
	  }
	}

## 并放进 loaders 数组中

	// utils.js
	function generateLoaders(loader, loaderOptions) {
	    var loaders = [cssLoader, px2remLoader]
	}

## 也可以动态的根据可视窗口的大小来设置[在这里写一个计算]

	const size = 200
	const screen = 375
	const flexFn = () => {
	    const windowWidth = window.outerWidth
	    const ratio = windowWidth / screen
	    const newSize = ratio * (size / 2)
	
	    document.querySelector('html').style.fontSize = newSize + "px"
	}
	
	flexFn()
	
	window.addEventListener("resize", () => {
	    flexFn()
	},false)

直接将该js引入到main.js中即可


## 修改配置后需要重启，然后我们在组件中写单位直接写 px，设计稿量多少就可以写多少了，舒服多了。