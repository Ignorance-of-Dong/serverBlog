---
title: sass基本语法使用
date: '2018-08-04 16:46:31'
tag: ['css', 'scss', sass]
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
1/26/2019 10:54:49 AM 
----------


# sass
	
### 学过CSS的人都知道，它不是一种编程语言。

#### 你可以用它开发网页样式，但是没法用它编程。也就是说，CSS基本上是设计师的工具，不是程序员的工具。在程序员眼里，CSS是一件很麻烦的东西。它没有变量，也没有条件语句，只是一行行单纯的描述，写起来相当费事。

## 基本语法

- ## 变量

	#### SASS允许使用变量，所有变量以$开头。

		$blue : #1875e7;　

		　　div {
		　　　color : $blue;
		　　}

	#### 如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。

		$side : left;
		　　.rounded {
		　　　　border-#{$side}-radius: 5px;
		　　}

- ## 计算功能

	#### SASS允许在代码中使用算式：

		body {
		　　　　margin: (14px/2);
		　　　　top: 50px + 100px;
		　　　　right: $var * 10%;
		　　}

- ## 嵌套

	#### SASS允许选择器嵌套。比如，下面的CSS代码：

		div h1 {
		　　　　color : red;
		　　}

	可以写成：

		div {
		　　　　hi {
		　　　　　　color:red;
		　　　　}
		　　}

- ## 代码的重用 

----------
【继承】

#### SASS允许一个选择器，继承另一个选择器。比如，现有class1：

		.class1 {
		　　　　border: 1px solid #ddd;
		　　}
#### class2要继承class1，就要使用@extend命令：

		.class2 {
		　　　　@extend .class1;
		　　　　font-size:120%;
		　　}

- ## Mixin

	#### Mixin有点像C语言的宏（macro），是可以重用的代码块。

	#### 使用@mixin命令，定义一个代码块。

		@mixin left {
		　　　　float: left;
		　　　　margin-left: 10px;
		　　}

	#### 使用@include命令，调用这个mixin。

		div {
		　　　　@include left;
		　　}

	#### mixin的强大之处，在于可以指定参数和缺省值。

		@mixin left($value: 10px) {
		　　　　float: left;
		　　　　margin-right: $value;
		　　}

	#### 使用的时候，根据需要加入参数：

		div {
		　　　　@include left(20px);
		　　}

	#### 下面是一个mixin的实例，用来生成浏览器前缀。

		@mixin rounded($vert, $horz, $radius: 10px) {
		　　　　border-#{$vert}-#{$horz}-radius: $radius;
		　　　　-moz-border-radius-#{$vert}#{$horz}: $radius;
		　　　　-webkit-border-#{$vert}-#{$horz}-radius: $radius;
		　　}
	#### 使用的时候，可以像下面这样调用：

			.navbar li { @include rounded(top, left); }

		    .footer { @include rounded(top, left, 5px); }

- ## 插入文件

	#### @import命令，用来插入外部文件。

		@import "path/filename.scss";

	#### 如果插入的是.css文件，则等同于css的import命令。

		@import "foo.css";

- ## 高级用法

		
	### 1. 条件语句

	#### @if可以用来判断：

		p {
		　　　　@if 1 + 1 == 2 { border: 1px solid; }
		　　　　@if 5 < 3 { border: 2px dotted; }
		　　}

	#### 配套的还有@else命令：

		@if lightness($color) > 30% {
		　　　　background-color: #000;
		　　} @else {
		　　　　background-color: #fff;
		　　}

	### 2. 循环语句

	#### SASS支持for循环：

		@for $i from 1 to 10 {
		　　　　.border-#{$i} {
		　　　　　　border: #{$i}px solid blue;
		　　　　}
		　　}

	#### 也支持while循环：

		$i: 6;

		　　@while $i > 0 {
		　　　　.item-#{$i} { width: 2em * $i; }
		　　　　$i: $i - 2;
		　　}

	#### each命令，作用与for类似：

		@each $member in a, b, c, d {
		　　　　.#{$member} {
		　　　　　　background-image: url("/image/#{$member}.jpg");
		　　　　}
		　　}

	### 3. 自定义函数

	#### SASS允许用户编写自己的函数。

		@function double($n) {
		　　　　@return $n * 2;
		　　}
		
		　　#sidebar {
		　　　　width: double(5px);
		　　}
