---
title: js创建对象的几种方式
date: '3/29/2019 8:27:10 PM '
tag: ['js', 'object']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## js创建对象的几种方式

### 对象字面两的方式

	person = {
		firstname:"Mark",
		lastname:"Yun",
		age:25,
		eyecolor:"black"
	}

### 用function来模拟无参的构造函数 

	function Person () {} 
		//定义一个function，如果使用new"实例化",该function可以看作是一个Class 
       var person=new Person();
       person.name=“Mark"; 
       person.age="25"; 
       person.work = function () { 
       	alert(person.name+" hello..."); 
      } 
   	person.work(); 

### 用function来模拟参构造函数来实现（用this关键字定义构造的上下文属性） 

	function Pet(name,age,hobby){ 
       this.name=name; // this作用域：当前对象 
       this.age=age; 
       this.hobby=hobby; 
       this.eat=function(){ 
           alert("我叫"+this.name+",我喜欢"+this.hobby+",是个程序员"); 
        } 
    } 
	var maidou =new Pet("麦兜",25,"coding"); // 实例化、创建对象 
	maidou.eat();//调用eat方法 

### 用工厂方式来创建（内置对象） 

	var wcDog =new Object(); 
      wcDog.name="旺财"; 
      wcDog.age=3; 
      wcDog.work=function(){ 
       	alert("我是"+wcDog.name+",汪汪汪......"); 
      } 
	wcDog.work(); 

### 用原型方式来创建 

	function Dog(){ } 
    Dog.prototype.name="旺财"; 
    Dog.prototype.eat=function(){alert(this.name+"是个吃货");} 
    var wangcai =new Dog(); 
    wangcai.eat(); 

### 用混合方式来创建 

	function Car(name,price){ 
       this.name=name; 
       this.price=price; 
    } 
    Car.prototype.sell=function(){ 
       alert("我是"+this.name+"，我现在卖"+this.price+"万元"); 
    } 
    var camry =new Car("凯美瑞",27); 
    camry.sell(); 




