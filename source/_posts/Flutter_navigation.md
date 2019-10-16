---
title: 🌑Flutter 页面导航及打包🌑
date: '10/12/2019 11:42:35 AM '
tag: ['Dart', 'flutter']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# 🌑Flutter 页面导航及打包🌑

## 🌓一般页面导航和返回

### RaisedButton按钮组件

- child： 可以放入容器，图标，文字
- onPressed：点击的相应事件，一般会调用Navigator组件

### Navigator.push和Navigator.pop

- Navigator.push: 是跳转到下一个页面，他要接受两个参数一个是上下文的context，另一个是要跳转的函数
- Navigator.pop: 是返回到上一个页面，使用时传递一个context（上下文参数），使用的时候要注意是，你必须有上级页面，也就是说上级页面使用了Navgitor.push


-------------------

    import 'package:flutter/material.dart';

    void main() => runApp(MaterialApp(
        title:'导航演示1',
        home:Home()
    ));

    class Home extends StatelessWidget{
        @override
        Widget build(BuildContext context) {
            return Scaffold(
                appBar: AppBar(title: Text('首页'),),
                body: Center(
                    child: RaisedButton(
                        onPressed: (){
                            Navigator.push(context,MaterialPageRoute(builder: (context) => new Detail()));
                        },
                        child: Text('跳转到商品详情页'),
                    ),
                ),
            );
        }
    }

    class Detail extends StatelessWidget{
        @override
        Widget build(BuildContext context) {
            return Scaffold(
                appBar: AppBar(title: Text('商品详情页'),),
                body: Center(
                    child: RaisedButton(
                        onPressed: (){
                            Navigator.pop(context);
                        },
                        child: Text('该回去了，老弟'),
                    ),
                ),
            );
        }
    }

## 🌔导航参数的传递和接受

    import 'package:flutter/material.dart';

    void main() => runApp(MaterialApp(
        title:'导航演示1',
        home:TextWidget()
    ));

    // 创建一个列表
    class MyList extends StatelessWidget{
        final List<String> items = new List<String>.generate(1000, (i)=> "Item $i");
        @override
        Widget build(BuildContext context) {
            return ListView.builder(
                itemCount:items.length,
                itemBuilder:(context,index){
                    return new ListTile(
                        title:new Text('${items[index]}'),
                        onTap: () {
                            Navigator.push(
                                context, 
                                MaterialPageRoute(
                                    builder: (context) => Detail(value: items[index]) // 传递参数
                                )
                            );
                        },
                    );
                }
            );
        }
    }
    class TextWidget extends StatelessWidget {
        @override
        Widget build(BuildContext context) {
            return MaterialApp(
                title: "Flutter Demo",
                theme: ThemeData(
                    primaryColor: Colors.blue,
                ),
                home: Scaffold(
                    appBar: AppBar(title: Text("首页1")),
                    body: Center(
                        child: Container(
                            child: MyList() // 调用列表组件
                        ),
                    ),

                ),
            );
        }
    }

    class Detail extends StatelessWidget{
        final String value;
        Detail({Key key,@required this.value}):super(key:key); // 接受参数
        @override
        Widget build(BuildContext context) {
            return Scaffold(
                appBar: AppBar(title: Text('商品详情页'),),
                body: Center(
                    child: RaisedButton(
                        onPressed: (){
                            Navigator.pop(context);
                        },
                        child: Text('来了，老弟 $value'),
                    ),
                ),
            );
        }
    }

## 🌙页面跳转并返回数据

> 实际开发我们可能遇到这种需求，列表页跳转到详情页，详情页在跳转到列表页，需要把详情页的某些数据传递到列表页

**先贴出代码**

    import 'package:flutter/material.dart';

    void main() => runApp(MaterialApp(
        title:'导航演示1',
        home:TextWidget()
    ));

    class MyList extends StatelessWidget{
        final List<String> items = new List<String>.generate(1000, (i)=> "Item $i");
        @override
        Widget build(BuildContext context) {
            return ListView.builder(
                itemCount:items.length,
                itemBuilder:(context,index){
                    return new ListTile(
                        title:new Text('${items[index]}'),
                        onTap: () {
                            _navigatoreto(context, items, index);
                        },
                    );
                }
            );
        }
        _navigatoreto(BuildContext context, List<String> items, index) async{
            final result = await Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => Detail(value: items[index],)
                )
            );
            Scaffold.of(context).showSnackBar(SnackBar(content: Text('$result'),));
        }
    }

    class TextWidget extends StatelessWidget {
        @override
        Widget build(BuildContext context) {
            return MaterialApp(
                title: "Flutter Demo",
                theme: ThemeData(
                    primaryColor: Colors.blue,
                ),
                home: Scaffold(
                    appBar: AppBar(title: Text("首页1")),
                    body: Center(
                        child: Container(
                            child: MyList() // 调用列表组件
                        ),
                    ),

                ),
            );
        }
    }

    class Detail extends StatelessWidget{
        final String value;
        Detail({Key key,@required this.value}):super(key:key);
        @override
        Widget build(BuildContext context) {
            return Scaffold(
                appBar: AppBar(title: Text('商品详情页'),),
                body: Center(
                    child: RaisedButton(
                        onPressed: (){
                            Navigator.pop(context, '恭喜你选中了$value');
                        },
                        child: Text('来了，老弟 $value'),
                    ),
                ),
            );
        }
    }

### 异步请求和等待

> Dart中的异步请求和ES6中的方法很像，可以直接使用async   await就可以实现

    _navigatoreto(BuildContext context, List<String> items, index) async{
        final result = await Navigator.push( // 这是一个异步的方法，我们等这个方法执行完毕以后，【等待结果回来】
            context,
            MaterialPageRoute(
                builder: (context) => Detail(value: items[index],)
            )
        );
        Scaffold.of(context).showSnackBar(SnackBar(content: Text('$result'),)); // 我们在显示具体内容
    }

### SnackBar的使用

> SnackBar使用户操作以后，显示提示信息的一个控件，类似Toast，会自动隐藏，SnackBar是以Scaffold的showSnackBar的方法来进行显示的

    Scaffold.of(context).showSnackBar(SnackBar(content: Text('$result'),)); // 我们在显示具体内容

### 返回数据的方式

> 返回数据其实特别容易，只要在返回的时候带上第二个参数就可以了

    Navigator.pop(context,'xxxx');  //xxx就是返回的参数

## 🌛Flutter 客户端打包【Android】

### 配置app的图标

> 找到目录

    /android/app/src/main/res/

**进入之后你会看到很多mipomap-为前缀命名的文件夹，后面是像素密度，可以看出图标的分辨率**

- mdpi（中） ~ 160dpi
- hdpi （高） ~240dip
- xhdpi （超高） ~320dip
- xxhdpi （超超高） ~480dip
- xxxhdpi （超超超高） ~640dip

> 将对应的像素密度的图片放入对应的文件夹中，图片记得使用png格式，记得名字要统一，才能一次性进行配置

### AndroidManifest.xml 文件

**这个文件主要用来配置APP的名称、图标和系统权限，所在的目录在:**

    /android/app/src/main/AndroidManifest.xml

--------------------------

    android:label="flutter_app"   //配置APP的名称，支持中文
    android:icon="@mipmap/ic_launcher" //APP图标的文件名称

### 生成 keystore

    keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key

> 这里会有报错： 如下

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/F1.0.png)

**很容易知道，没有环境变量，这里我们就不去配值，直接拿到他的根目录进行执行**

> 通过下面的命令进行查找他的根目录

    flutter doctor -v

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/F1.1.png)

**这时候你直接拷贝命令并进行输入，但这里也有个坑，就是如果文件夹中间带有空空，你需要用带引号扩上。**

**！！！有可能还会报错**

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/F1.2.png)

这个错误的主要问题是目录不存在和没有写权限，所以我们要更换一个有写权限的目录。我们把命令改成了下面的形式。

    D:\Program\Android\'Android Studio'\jre\bin\keytool -genkey -v -keystore D:\key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key

**有了这个key.jks文件后，可以到项目目录下的android文件夹下，创建一个名为key.properties的文件，并打开粘贴下面的代码。**

    storePassword=<password from previous step>    //输入上一步创建KEY时输入的 密钥库 密码
    keyPassword=<password from previous step>    //输入上一步创建KEY时输入的 密钥 密码
    keyAlias=key
    storeFile=<E:/key.jks>    //key.jks的存放路径

我的文件最后是这样的：

    storePassword=123123
    keyPassword=123123
    keyAlias=key
    storeFile=D:/key.jks

### 配置key注册

**key生成好后，需要在build.gradle文件中进行配置。这个过程其实很简单，就是粘贴复制一些东西，你是不需要知道这些文件的具体用处的。**

> 第一项：

进入项目目录的/android/app/build.gradle文件，在android{这一行前面,加入如下代码:

    def keystorePropertiesFile = rootProject.file("key.properties")
    def keystoreProperties = new Properties()
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

把如下代码进行替换

    buildTypes {
        release {
            signingConfig signingConfigs.debug
        }
    }

替换成的代码：

    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }

### 生成apk

> 直接在终端中输入：

    flutter build apk

**打包成功**

> 打包成功的apk文件在根目录下的

    /build/app/outputs/apk/app.apk

