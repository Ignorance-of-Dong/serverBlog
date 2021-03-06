---
title: JS 堆&栈
date: '3/4/2019 11:19:27 AM '
tag: ['js', '堆&栈']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## JS 堆&栈

### 两者都是存放临时数据的地方

### ⊙ 栈是先进后出的，就像一个桶，后进去的先出来，它下面本来有的东西要等其他出来之后才能出来。

### ⊙ 堆是在程序运行时，而不是在程序编译时，申请某个大小的内存空间。即动态分配内存，对其访问和对一般内存的访问没有区别。对于堆，我们可以随心所欲的进行增加变量和删除变量，不用遵循次序。

### ◎ 栈区（stack） 由编译器自动分配释放 ，存放函数的参数值，局部变量的值等。 

### ◎ 堆区（heap） 一般由程序员分配释放，若程序员不释放，程序结束时可能由OS回收。


----------
 

> **堆是动态分配内存，内存大小不一，也不会自动释放。栈是自动分配相对固定大小的内存空间，并由系统自动释放.**


----------

## JS数据类型访问

- 基本数据类型

> Undefined、Null、Boolean、String、Number、Symbol都是直接按值直接存在栈中，每种类型的数据占用的内存空间大小都是固定的，并且由系统自动分配自动释放

- 引用数据类型

> Object，Array，Function这样的数据存在堆内存中，但是数据指针是存放在栈内存中的，当我们访问引用数据时，先从栈内存中获取指针，通过指针在堆内存中找到数据

	var a = 2;

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/4.0.png)

	var b = new Object();

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/4.1.png)

## 传值和传址

> **从一个向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终指向同一个对象。即复制的是栈中的地址而不是堆中的对象。**

> **从一个变量复向另一个变量复制基本类型的值，会创建这个值的副本。**