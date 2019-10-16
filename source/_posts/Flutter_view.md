---
title: 🥰Flutter 常用组件🥰
date: '10/10/2019 11:42:35 AM '
tag: ['Dart', 'flutter']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# Flutter 常用组件


> **🥰Flutter 常用组件🥰**

## 🌟Text Widget文本组件的使用

    import 'package:flutter/material.dart';
    void main () => runApp(MyApp());

    class MyApp extends StatelessWidget{
        @override
        Widget build(BuildContext context ){
            return MaterialApp(
                title:'Text widget',
                home:Scaffold(
                    body:Center(
                        child:Text('hello Flutter， i like')
                    ),
                ),
            );
        }
    }

### TextAlign属性

> TextAlign属性就是文本的对齐方式

- center ---------- 文本以居中的形式对齐
- left-------------- 文本以左对齐的方式对齐
- right------------- 文本以右对齐的方式对齐
- start------------- 文本以开始的位置对齐，类似left
- end -------------- 文本以结尾处对齐，类似于right

--------------------------------

    child:Text(
        'hello Flutter， i like',
        textAlign: TextAlign.left,
    )

### maxLines属性

> 设置最多显示行数

    child:Text(
        'hello Flutter， i like',
        textAlign: TextAlign.left,
        maxLines: 1 // 最多显示一行
    )

### overflow属性

> overflow属性是设置文本溢出的

- clip：直接切断，相当于css中hidden
- ellipsis：在后面显示省略号
- fade：溢出部分采用渐变消失的状态(是上线渐变消失))

---------------------------

    child:Text(
        'hello Flutter， i like',
        textAlign: TextAlign.left,
        maxLines: 1, // 最多显示一行
        overflow: TextOverflow.ellipsis // 超出部分以省略号的形式出现
    )

### style属性

> style的属性比较多，这里只演示部分【下面制作一个字体大小为25.0，颜色为蓝色，有下划线的,下划线颜色为黄色】

    child:Text(
        'hello Flutter， i like',
        textAlign: TextAlign.left,
        maxLines: 1, // 最多显示一行
        overflow: TextOverflow.ellipsis, // 超出部分以省略号的形式出现
        style: TextStyle(
            fontSize: 25.0,
            color: Colors.blue,
            // color:Color.fromARGB(255, 255, 150, 150), // 颜色也可以用这种方式表示
            decoration: TextDecoration.underline,
            decorationStyle: TextDecorationStyle.solid,
            decorationColor: Colors.yellow
        ), 
    )

**更多属性资料[ Flutter中文网 - 文本 Widget](https://api.flutter.dev/flutter/painting/TextStyle-class.html)**

## ⚡Container容器组件的使用

> Container（容器组件）是经常使用的组件，相当于HTML的div标签

    class MyApp extends StatelessWidget{
        @override
        Widget build(BuildContext context ){
            return MaterialApp(
                title:'Text widget',
                home:Scaffold(
                    body:Center(
                        child:Container(
                            child:new Text('hello Flutter， i like'),
                        ),
                    ),
                ),
            );
        }
    }

### Alignment属性

> 这个属性是争对Container内child的对齐方式，也就是容器子内容的对齐方式

- bottomCenter -------------- 下部居中对齐
- bottomLeft ---------------- 下部左对齐
- bottomRight --------------- 下部右对齐
- center -------------------- 纵横双向居中对齐
- centerLeft ---------------- 纵向居中横向居左对齐。
- centerRight --------------- 纵向居中横向居右对齐。
- topLeft ------------------- 顶部左侧对齐。
- topCenter ----------------- 顶部居中对齐。
- topRight ------------------ 顶部居左对齐。

---------------------------

    home:Scaffold(
        body:Center(
            child:Container(
                child:new Text('hello Flutter， i like'),
                alignment: Alignment.center,
            ),
        ),
    ),

### 设置宽、高和颜色属性

> 设置宽高相对容易，只要在属性名称后面加入浮点数字就可以

    home:Scaffold(
        body:Center(
            child:Container(
                child:new Text('hello Flutter， i like'),
                alignment: Alignment.center,
                width:500.0,
                height:400.0,
                color: Colors.lightBlue,
            ),
        ),
    ),

### padding属性

> padding指的的是Container和child内容器的距离

    home:Scaffold(
        body:Center(
            child:Container(
                child:new Text('hello Flutter， i like'),
                alignment: Alignment.center,
                width:500.0,
                height:400.0,
                color: Colors.lightBlue,
                padding: const EdgeInsets.all(10.0), // 代表上下左右的padding距离都是10
            ),
        ),
    ),

**上面主要说明了padding的一个统一的值，如果我们想分别设置呢**

    padding: const EdgeInsets.fromLTRB(10.0, 50.0, 0.0, 0.0)

**这样我们就可以分别设置各个方向的padding值**

### margin属性

> 用法同上

    margin: const EdgeInsets.all(10.0), // 代表上下左右的margin距离都是10
                ||或
    margin: const EdgeInsets.fromLTRB(10.0, 50.0, 0.0, 0.0)

### decoration属性

> decoration是container的修饰器，主要功能设置背景和边框

**如果你想要给一个背景加一个渐变，这时候需要这个BoxDecoation**

    home:Scaffold(
        body:Center(
            child:Container(
                child:new Text('hello Flutter， i like'),
                alignment: Alignment.center,
                width:500.0,
                height:400.0,
                // color: Colors.lightBlue,
                padding: const EdgeInsets.all(10.0), // 代表上下左右的padding距离都是10
                decoration: new BoxDecoration(
                    gradient: const LinearGradient(
                        colors: [Colors.blue, Colors.red, Colors.white] // 设置渐变色
                    ),
                    border: Border.all(width: 2.0, color: Colors.red) // 设置边框线的样式
                ),
            ),
        ),
    ),

> **注意color和decoration不能共存,会有冲突**

## 🔥Image图片的使用

- Image.asset: 加载资源图片,就是加载项目资源的目录中的图片,加入图片会增加打包的体积,以相对路径引入
- Image.network: 网络资源图片,意思就是引入网络图片路径
- Image.file: 加载本地图片,就是加载本地文件中的图片,不会增加打包体积,以绝对路径引入
- Image.memory: 加载Uint8List资源图片


-------------------------------

    home:Scaffold(
        body:Center(
            child:Container(
                child: Image.network(
                    'http://my.ignorantscholar.cn/images/headers.png',
                    width: 300.0,
                    height: 300.0,
				),
                alignment: Alignment.center,
                width:500.0,
                height:400.0,
                // color: Colors.lightBlue,
                padding: const EdgeInsets.all(10.0), // 代表上下左右的padding距离都是10
                decoration: new BoxDecoration(
                    gradient: const LinearGradient(
                        colors: [Colors.blue, Colors.red, Colors.white] // 设置渐变色
                    ),
                    border: Border.all(width: 2.0, color: Colors.red) // 设置边框线的样式
                ),
            ),
        ),
    ),

### fit属性

> fit属性可以控制图片的拉伸和挤压,这些都是根据图片的父级容器来的

- BoxFit.fill: 全图显示,图片会被拉伸,并且充满父容器
- BoxFit.contain: 全图显示,显示原比例,可能会有空隙
- BoxFit.cover: 显示可能拉伸,可能裁剪,充满(图片要充满整个容器,还不变形)
- BoxFit.fitWidth: 宽度充满,(横向充满)
- BoxFit.fitHeight: 高度充满 (属相充满)
- BoxFit.scaleDown: 效果和contain差不多,但是此属性不能超过图片大小,可小不可大

----------------------

    child: Image.network(
        'http://my.ignorantscholar.cn/images/headers.png',
        width: 300.0,
        height: 300.0,
        fit: BoxFit.cover, // 不变形,充满整个容器
    ),

### 图片混合模式

> 图片混合模式(colorBlendMode) 和 color 属性一起使用,可以让图片改变颜色

**！！！！！！colorBlendMode和color需要同时使用,单独使用一个达不到预期效果**

    child: Image.network(
        'http://my.ignorantscholar.cn/images/headers.png',
        width: 300.0,
        height: 300.0,
        color: Colors.yellow,
        colorBlendMode: BlendMode.modulate,
        fit: BoxFit.cover,
    ),

### 使用项目资源图片

    pubspec.yaml文件

> 如果想配置项目资源文件，就需要使用pubspec.yaml文件，需要把资源文件在这里声明

**比如在项目根目录下建立了一个文件images用来存放图片，文件夹下面有一个图片，pic.png，那我们在pubspec.yaml文件中进行声明**

    assets:
        - images/pic.png

--------------------------------------

    child: Image.asset('images/pic.png'),

## 💧ListView列表组件

### ListView的声明

    import 'package:flutter/material.dart';
    void main () => runApp(MyApp());

    class MyApp extends StatelessWidget{
        @override
        Widget build(BuildContext context ){
            return MaterialApp(
                title:'Text widget',
                home:Scaffold(
                    body:ListView(
                        child: <Widget>[
                            ListTile(
                                leading: Icon(Icons.assess_time),
                                title: new Text('assess_time')
                            ),
                            ListTile(
                                leading: Icon(Icons.assess_time),
                                title: new Text('assess_time')
                            )   
                        ]
                    ),
                ),
            );
        }
    }

> 我们使用了ListView，然后在他的内部children中，使用了widget数组，因为是一个列表，所以他接受一个数组，然后使用了ListTile组件【列表瓦片】，具体效果可以在项目中查看

### 图片列表的使用

> 我们使用网络的方式，插入两张图片

    body: new ListView(
        children:<Widget>[
            new Image.network('http://jspang.com/static/upload/20181111/G-wj-ZQuocWlYOHM6MT2Hbh5.jpg'),
            new Image.network('http://jspang.com/static/upload/20181109/1bHNoNGpZjyriCNcvqdKo3s6.jpg'),
        ]
    ),

### 横向列表的使用

> 使用横向列表需要加一个属性scrollDirection

- Axis.horizontal: 横向滚动
- Axis.vertical: 纵向滚动 【默认纵向滚动】
---
    home:Scaffold(
        body:Center(
            child:Container(
            height:200.0,
            child:new ListView(
                scrollDirection: Axis.horizontal,
                children: <Widget>[
                    new Container(
                        width:180.0,
                        color: Colors.lightBlue,
                    ), 
                    new Container(
                        width:180.0,
                        color: Colors.amber,
                    ), 
                    new Container(
                        width:180.0,
                        color: Colors.deepOrange,
                    ),
                    new Container(
                        width:180.0,
                        color: Colors.deepPurpleAccent,
                    ),
                ],
            )
        ),
    ),

**从上面代码我们可以看出，代码嵌套比较深，进行优化，提取**

    class MyList extends StatelessWidget{
        @override
        Widget build(BuildContext context) {
            return ListView(
                scrollDirection: Axis.horizontal,
                children: <Widget>[
                    Container(
                        width: 180.0,
                        color: Colors.red,
                    ),
                    Container(
                        width: 180.0,
                        color: Colors.yellow,
                    ),
                    Container(
                        width: 180.0,
                        color: Colors.red,
                    ),
                    Container(
                        width: 180.0,
                        color: Colors.yellow,
                    )
                ]
            );
        }
    }


    home:Scaffold(
        body:Center(
            child:Container(
            height:200.0,
            child: MyList()
        ),
    ),

> 这样看就简洁许多

### 动态列表的使用

> 上面的列表是写死的，我们在实际开发中，大多数是不会死的

    class MyList extends StatelessWidget{
        final List<String> items = new List<String>.generate(1000, (i)=> "Item $i"); // 使用list中的属性generate方法产生List里面的元素
        @override
        Widget build(BuildContext context) {
            return ListView.builder( // 调用动态列表生成
                itemCount:items.length,
                    itemBuilder:(context,index){
                        return new ListTile(
                            title:new Text('${items[index]}'),
                        );
                    }
                );
        }
    }

## 🌊GridView网格列表布局组件

    import 'package:flutter/material.dart';
    void main () => runApp(MyApp());

    class MyApp extends StatelessWidget{
        @override
        Widget build(BuildContext context ){
            return MaterialApp(
                title:'ListView widget',
                home:Scaffold(
                    body:GridView.count(
                        padding:const EdgeInsets.all(20.0),
                        crossAxisSpacing: 10.0,
                        crossAxisCount: 3,
                        children: <Widget>[
                            Container(
                                color: Colors.red,
                            ),
                            Container(
                                color: Colors.red,
                            ),
                            Container(
                                color: Colors.red,
                            ),
                            Container(
                                color: Colors.red,
                            ),
                            Container(
                                color: Colors.red,
                            )
                        ],
                    )
                ),
            );
        }
    }

- crossAxisSpacing: 网格之间 的空隙
- crossAxisSpacing：网格列数，相当于一行放置的网格数量

> 现在做一个图片的网格布局

    body: GridView.count(
        padding: const EdgeInsets.all(10.0),
        crossAxisSpacing: 2.0,
        crossAxisCount: 3,
        mainAxisSpacing: 2,
        childAspectRatio: 0.7,
        children: <Widget>[
            new Image.network('http://img5.mtime.cn/mt/2018/10/22/104316.77318635_180X260X4.jpg',fit: BoxFit.cover),
            new Image.network('http://img5.mtime.cn/mt/2018/10/10/112514.30587089_180X260X4.jpg',fit: BoxFit.cover),
            new Image.network('http://img5.mtime.cn/mt/2018/11/13/093605.61422332_180X260X4.jpg',fit: BoxFit.cover),
            new Image.network('http://img5.mtime.cn/mt/2018/11/07/092515.55805319_180X260X4.jpg',fit: BoxFit.cover),
            new Image.network('http://img5.mtime.cn/mt/2018/11/21/090246.16772408_135X190X4.jpg',fit: BoxFit.cover),
            new Image.network('http://img5.mtime.cn/mt/2018/11/17/162028.94879602_135X190X4.jpg',fit: BoxFit.cover),
            new Image.network('http://img5.mtime.cn/mt/2018/11/19/165350.52237320_135X190X4.jpg',fit: BoxFit.cover),
            new Image.network('http://img5.mtime.cn/mt/2018/11/16/115256.24365160_180X260X4.jpg',fit: BoxFit.cover),
            new Image.network('http://img5.mtime.cn/mt/2018/11/20/141608.71613590_135X190X4.jpg',fit: BoxFit.cover),
        ],
    ),

- childAspectRatio： 宽高比， 这个值的意思是宽是高的多少倍




