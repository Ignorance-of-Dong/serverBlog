---
title: 😈Flutter 布局😈
date: '10/11/2019 11:42:35 AM '
tag: ['Dart', 'flutter']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# 😈Flutter 布局😈

## 👿水平布局Row的使用

> Flutter的row控件就是水平控件，它可以让Row的里面的子元素进行水平排列

### 不灵活水平布局

    import 'package:flutter/material.dart';
    void main () => runApp(MyApp());

    class MyApp extends StatelessWidget{
        @override
        Widget build(BuildContext context ){
            return MaterialApp(
                title:'ListView widget',
            
                home:Scaffold(
                    appBar:new AppBar(title:new Text('水平方向布局')),
                    body:new Row(
                        children: <Widget>[
                            new RaisedButton(
                                onPressed: (){
                                
                                },
                                color:Colors.redAccent,
                                child:new Text('红色按钮')
                            ),
                            new RaisedButton(
                                onPressed: (){
                            
                                },
                                color:Colors.orangeAccent,
                                child: new Text('黄色按钮'),
                            ),  
                            new RaisedButton(
                                onPressed: (){
                                
                                },
                                color:Colors.pinkAccent,
                                child:new Text('粉色按钮')
                            )
                        ],
                    )
                ),
            );
        }
    }

> 运行我们可以发现，按钮在一行没有平均分布，右侧还有空隙，如果想要他平均分布，我们就要使用灵活水平布局

### 灵活水平布局

> 需要解决上面的问题，我们可以通过Expanded来进行解决，将按钮包在Expanded中

    body: Row(
        children: <Widget>[
            Expanded(
                child:RaisedButton(
                    onPressed: (){

                    },
                    color: Colors.red,
                    child: Text('红褐色按钮')
                ),
            ),
            Expanded(
                child: RaisedButton(
                    onPressed: (){

                    },
                    color: Colors.yellow,
                    child: Text('黄褐色按钮')
                ),
            )
        ],
    ),

## 👹垂直布局Column组件

> Column组件是垂直布局控件，可以将子组件垂直排列

    import 'package:flutter/material.dart';
    void main () => runApp(MyApp());

    class MyApp extends StatelessWidget{
        @override
        Widget build(BuildContext context ){
            return MaterialApp(
                title:'ListView widget',
                home:Scaffold(
                    appBar:new AppBar(
                        title:new Text('垂直方向布局'),
                    ),
                    body: Column(
                        children: <Widget>[
                            Text('data'),
                            Text('wwwwwwwwwwwwwwwwwwwwwwwwww'),
                            Text('data')
                        ],
                    ),
                ),
            );
        }
    }

**这样你会发现中间一段字母很长，并且整个布局是居中对齐的，如果我们希望他是靠左对齐的，需要加一个对齐属性**

- CrossAxisAlignment.star: 居左对齐
- CrossAxisAlignment.end: 居右对齐
- CrossAxisAlignment.center: 居中对齐

### 主轴和副轴的辨识【mainAxisAlignment】

- main轴：如果你用cloumn组件，那垂直就是主轴，如果用的是Row组件，那么水平就是主轴
- cross轴：Cross轴称为副轴，是和主轴垂直的方向，例：Row组件，垂直就是副轴，Column的副轴就是水平方向

> 现在将上面布局改为垂直居中

    body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
            Text('data'),
            Text('wwwwwwwwwwwwwwwwwwwwwwwwww'),
            Text('data')
        ],
    ),

### Expanded属性的使用

> 如果我们想要让中间部分变大，上下根据文字大小在底部显示，

    body: Column(
        // crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
            Center(child: Text('data'),),
            Expanded(
                child: Container(
                    color: Colors.red,
                )
            ),
            Center(child: Text('data'),)
        ],
    ),

## 👺Stack层叠布局

> 层叠布局就是就是放入一张图片，然后在图片上面加入文字，或者放入容器

    import 'package:flutter/material.dart';
    void main () => runApp(MyApp());

    class MyApp extends StatelessWidget{
        @override
        Widget build(BuildContext context ){
            var stack = new Stack(
                alignment: const FractionalOffset(0.5, 0.8),
                children: <Widget>[
                    new CircleAvatar(
                        backgroundImage: new NetworkImage('http://jspang.com/static//myimg/blogtouxiang.jpg'),
                        radius: 100.0,
                    ),
                    new Container(
                        decoration: new BoxDecoration(
                            color: Colors.lightBlue,
                        ),
                        padding: EdgeInsets.all(5.0),
                        child: new Text("sssssssssssss"),
                    )
                ],
            );


            return MaterialApp(
                title:'ListView widget',
                home:Scaffold(
                    appBar:new AppBar(
                        title:new Text('垂直方向布局'),
                    ),
                    body:Center(child:stack),
                ),
            );
        }
    }

> 运行以上代码，就可以得到我们想要的布局效果

### alignment属性

> 层叠布局alignment属性是控制层叠的位置的, 建议两个元素进行层叠时使用，他有两个值X轴距离和Y轴的距离，值是0到1，都是从上层容器的左上角开始算起的

### CircleAvatar组件的使用

> CircleAvatar这个组件是经常是用来制作头像的，组件里面有一个radius的值可以设置图片的弧度

    new CircleAvatar(
        backgroundImage: new NetworkImage('http://jspang.com/static//myimg/blogtouxiang.jpg'), // 放入一张背景图片
        radius: 100.0,
    ),

## 👽Stack的Positioned属性

> 上述只是两个容器之间的嵌套，如果超过了两个容器之间的层叠嵌套，我们就要使用Positioned组件

- bottom：距离层叠组件下面的距离
- left：距离层叠组件左面的距离
- top: 距离层叠组件上面的距离
- right: 距离层叠组件右边的距离
- width：层叠定位组件的宽度
- height： 层叠定位组件的高度

-----------------

    import 'package:flutter/material.dart';
    void main () => runApp(MyApp());

    class MyApp extends StatelessWidget{
        @override
        Widget build(BuildContext context ){
            var stack = Stack(
			alignment: const FractionalOffset(0.5, 0.8),
			children: <Widget>[
				CircleAvatar(
					backgroundImage: new NetworkImage('http://img5.mtime.cn/mt/2018/10/22/104316.77318635_180X260X4.jpg'),
					radius: 100.0,
				),
				Positioned(
					top:10.0,
					left:10.0,
					child: Container(
						decoration: BoxDecoration(
							color: Colors.blue
						),
						padding: EdgeInsets.all(10.0),
						child: Text('ssssssss')
					),
				),
				Positioned(
					bottom:10.0,
					right: 10.0,
					child: Container(
						decoration: BoxDecoration(
							color: Colors.red
						),
						padding: EdgeInsets.fromLTRB(10.0, 20.0, 30.0, 40.0),
						child: Text('data'),
					),
				)
				
			],
		);


            return MaterialApp(
                title:'ListView widget',
                home:Scaffold(
                    appBar:new AppBar(
                        title:new Text('层叠布局'),
                    ),
                    body:Center(child:stack),
                ),
            );
        }
    }

**运行即可实现我们想要的效果**

## 💣卡片组件布局

> 卡片布局是撑满整个外部容器的，如果你想设置卡片的宽高，需要在外部容器进行制定

    import 'package:flutter/material.dart';
    void main () => runApp(MyApp());

    class MyApp extends StatelessWidget{
        @override
        Widget build(BuildContext context ){
            var card = Card(
                child: Column(
                    children: <Widget>[
                        ListTile(
                            title: Text('data',style: TextStyle(fontWeight: FontWeight.w800),),
                            subtitle: Text('data'),
                            leading: Icon(Icons.access_alarms, color: Colors.blue),
                        ),
                        Divider(), // 分割线
                        ListTile(
                            title: Text('data',style: TextStyle(fontWeight: FontWeight.w800),),
                            subtitle: Text('data'),
                            leading: Icon(Icons.access_alarms, color: Colors.blue),
                        ),
                        Divider(),
                        ListTile(
                            title: Text('data',style: TextStyle(fontWeight: FontWeight.w800),),
                            subtitle: Text('data'),
                            leading: Icon(Icons.access_alarms, color: Colors.blue),
                        ),
                        Divider(),
                    ],
                ),
            );
            return MaterialApp(
                title:'ListView widget',
                home:Scaffold(
                    appBar:new AppBar(
                        title:new Text('卡片布局'),
                    ),
                    body:Center(child: card),
                ),
            );
        }
    }