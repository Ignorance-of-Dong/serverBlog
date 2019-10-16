---
title: 🍉Dart学习【基础】🍉
date: '10/09/2019 11:42:35 AM '
tag: ['Dart', 'flutter']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# 🍉Dart学习【基础】🍉

## 🍌Dart简介

- 在Dart中，一切都是对象，一切对象都是class实例，哪怕是数字类型，方法甚至是null都是对象，所有对象继承于Object

- Dart是强语言类型，但是Dart可以自动推变变量类型，所以也可以支持动态类型

- Dart具有强大的异步编程能力

## 🍍Dart用法

> import 导入库

    import 'package:flutter/material.dart';

> 注释【和js一样】

    //单行注释
    /****/多行注释

> => [Dart的箭头函数，即Lambda表达式]

    void main() => runApp(MyApp());

> extends 继承

    class MyApp extends StatelessWidget {

        var content = 'Dart'; // 声明并初始化变量
        String _name = "Flutter";

        @override
        Widget build(BuildContext context) {

            print('display $content'); // 打印【对应js的console】

            // return a Widget
            return MaterialApp(
            title: "Flutter Demo",
            theme: ThemeData(
                primaryColor: Colors.blue,
            ),
            home: Scaffold(
                appBar: AppBar(title: Text("Flutter Dart 语法")),
                body: Text(content+_name)
                ),
            );
        }
    }

> var 变量申明并且不指定其类型的方法

    var content = 'Dart 语法'; // 声明并初始化变量

> _  以下划线 _ 开头的类或成员变量是私有的

**Dart 没有 Public、Protected、Private 的关键字，在 Dart 里，类或成员变量默认都是 Public 的，以下划线 _ 开头的就是私有的，例如成员变量 _name 就是私有的。**

    String _name = "Flutter";

> String 在声明变量时也可以指定具体类型，String 是字符串，还有其他的数据类型：int、double等。

    String _name = "Flutter";

> $variableName 或 ${expression} 

**字符串插值：将变量的值直接插入字符串中。**

    print('display $content');


## 🍑变量声明（一共有四种方式）

- 1. var

--------------

    var content = 'Dart 语法'

    var switchOn = false

    var current = 0

**使用var来申明变量，不需要指定变量的数据类型，因为Dart会自动推断其数据类型，所以可以使用var来定义任何变量**

> var不是直接储存值，而是存储的对象的引用，例如：var content = 'Dart',是名字为content的var的变量存储了值为Dart的String对象的引用，因此var可以定义定义任何变量

- 2. 明确数据类型

---------------------

    String name = 'Flutter'
    int count = 0

**就是在声明变量的时候，使用明确的数据类型**

- dynamic

------------------------------------

    dynamic example = 'example'

**意思是数据类型是动态可变的，也可以定义任何变量，但是和var不同，var一旦赋值以后，就不能改变数据类型了**

- Object

------------------------------------

    Object index = 100

**Dart里面的所有东西都是对象，因为Dart的所有东西都是对象，都继承于Object，因此可以定义任意类型，而且赋值以后也可以更改**

    Object index = 100

    index = 'string' √  因为'string'也是object

**！！！注意： 请不要滥用dynamic，一般情况下都可以使用Object来代替**

### dynamic 使用场景

> 在与native对接时，对传入的参数类型不确定时，进行使用

### 常量：final 和 const

    final content = 'Dart

    static const bool switch = false

**使用的时候需要注意一下几点**

- 使用final和const时候可以把var省略
- final和const变量只能赋值一次，并且他在声明的时候就已经赋值
- const是隐式的const
- 在使用const的时候，如果是在全局声明的话，不需要加static属性，如果是在类里面声明，则需要加上


> final与const的区别

**const是编译时常量，在编译的时候就已经初始化了，而final变量是当类创建的时候才初始化**

## 🍓Dart支持的数据类型

- int

> 整数，范围带-2^63到2^63-1

    int x = 1; // 没有小数点就是int

- double

> 浮点数，64位，双精度- 浮点数

    double y = 1.1; // 有小数的就是浮点数

- num

> num是数字类型，既可以表示整数，也可以表示浮点数，具体看赋值

    num x = 1;

    num y = 2;

- String

> 字符串【Dart字符串采用UTF-8编码，可以采用单引号或双引号】

    var s1 = 'string'

    String s1 = 'string'

- bool 

> 布尔值

    var isShow = true

    bool isShow = true

- List

> List[E] E表示List里面的数据类型

    List<int> = [1, 2, 3]

- Set

> Set<\E> E表示Set的数据类型，使用大括号进行赋值

    Set<String> halong = {'hellow', 'world', 'koal'}

- Map

> Map<\k, v>k是Key的数据类型，V是Value的数据类型

    Map<String, String> gits = {
        'first': 'partridge',
        'second': 'turtledoves',
    }

- Runes

> 表示采用UTF-32字符串，用于显示Unicode，因为Dart字符串是UTF-16，因此在Dart中表示32位的Unicode需要Runes这个特殊的语法

    Runes input = new Runes('\u{1f600}');
    print(new String.fromCharCodes(input));
    打印出来的是笑脸emoji：😆

## 🍄函数

> 在Dart中函数也是对象,函数的类型是Function

### 函数的写作格式

    bool say(String msg , String from, int clock){
        print(msg+" from " + from + " at " + clock?.toString());
        return true;
    }

    返回类型 函数名(函数参数){
    
    }   

### 函数的类型

    print(say is Function) // 判断say是否为函数

### 函数的参数： 必选参数 ===== 可选参数

> 首先必选参数必须在前面，和普通函数一样，后面跟可选参数，可选参数需要用{}或者[]包起来，用不同的括号，可选参数的意义也不一样

**必选参数和普通函数一样，这里不多阐述，主要说明可选参数**

> **可选参数**

- **可选命名参数：**：使用{}包起来的参数是可选命名参数
- **可选位置参数：**：使用[]包起来的参数是可选位置参数

> 可选命名参数：{}

**用{}包起来的参数，前面说的数据类型，使用{}来赋值的数据类型是Map，所以可选参数的的类型也是Map，因此调用函数时，可选参数的赋值必须是key: value这种格式的，如下：**

    bool say(String msg , {String from, int clock}){
        print(msg+" from " + from + " at " + clock.toString());
        return true;
    }

    // 调用

    say('Hello Flutter');//✅ 因为 from 和 clock 是可选参数，所以可以不填
    
    say('Hello Flutter', from: 'XiaoMing');//对 用命名参数格式 paramName: value 为 from 赋值
    say('Hello Flutter', clock: 11);//✅
    say('Hello Flutter', from: 'XiaoMing', clock: 11);//✅

**同时也可以给命名参数加@required，意思是这个也是必选参数，如下：**

    bool say(String msg , {@required String from, int clock}){
        print(msg+" from " + from + " at " + clock.toString());
        return true;
    }

    // 调用

    say('Hello Flutter');//❌  错误调用方式，因为 from 是必选参数，不填的话会报错
    
    say('Hello Flutter', from: 'XiaoMing');//✅ 正确调用方式
    say('Hello Flutter', from: 'XiaoMing', clock: 11);//✅ 这个调用方式也是正确的

> 可选位置参数：[]

**用[ ]包起来的参数是可选位置参数，前面说的数据类型的时候，使用[ ]来赋值的数据类型是List，所以可选参数的命名参数也是List，所以赋值和参数是一一对应的，如下：**

    bool say(String msg , [String from , int clock]){
        print(msg+" from " + from + " at " + clock.toString());
        return true;
    }

    // 调用

    say('Hello Flutter');//✅ 因为 from 和 clock 是可选参数，所以可以不填
    
    say('Hello Flutter', 'XiaoMing',1);//✅ 为可选位置参数赋值，只能一个参数一个参数对应的赋值，所以要全部赋值
        
    say('Hello Flutter', 'XiaoMing')//✅
    say('Hello Flutter', 1)//❌ 因为  1 赋值给了 from,但是 from 是String，所以会报错

> 可选参数的默认值： =

**因为参数是可选的，那么参数的值很可能没有赋值，也就是null，我们如果需要用到该参数，可以赋值给他一个默认值**

    bool say(String msg , {String from = 'empty', int clock = 0}){
        print(msg+" from " + from + " at " + clock.toString());
        return true;
    }

## 🍒=> 箭头语法

> => 语句后面的只能加一行代码，而且这一行代码只能一个表达式，而且不能跟语句，表达式可以使函数或值

    void main() => runApp(MyApp());

等价于：

    void main(){
        return runApp(MyApp());//runApp() 返回的是 void
    }

## 🍭操作符

> 类型判断操作符

- as

**类型转换**

    (emp as Person).firstName = 'Bob';

- is

**判断是否为某个类型，如果是的话，就返回true**

    if (emp is Person) {    // 如果 emp 是 Person 类型
        emp.firstName ='Bob';
    }

- is!

**判断是否不是某个类型，如果不是的话就返回true**

    if (emp is! Person) {
        // 如果 emp 不是 Person 类型
    }

## 🍬条件运算符

    condition ? expr1 : expr2

> 如果condition为true的时候，返回expr1，否则返回expr2

    var visibility = isPublic ? 'public' : 'private';

-------------------------------------

    expr1 ?? expr2

> 如果 expr1 为 null，就返回 expr2 的值，否则返回 expr1 的值。

**如果需要根据一个 boolean 表达式是否为 null 来作为条件，可以使用 ??，例如：**

    String playerName(String name) => name ?? 'Guest';