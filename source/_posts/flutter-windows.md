---
title: 😎flutter环境搭建（window）🤔
date: '10/08/2019 11:42:35 AM '
tag: ['Dart', 'flutter']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# 😎flutter环境搭建（window）🤔



## 🤣搭建 Android 开发环境

----------------------------

> **具体环境搭建参考[使用react-native基础环境搭建](http://my.ignorantscholar.cn/2019/05/22/react-native-windows/)**

-----------------------------

## 😁配置flutter环境变量

> 打开高级系统设置 => 配置环境变量

> 用户变量下，选择新建环境变量


    FLUTTER_STORAGE_BASE_URL     https://storage.flutter-io.cn

    PUB_HOSTED_URL               https://pub.flutter-io.cn

### Flutter SDK

> Flutter 开发需要安装 Flutter SDK，这里只介绍 Flutter SDK 在 Windows 这个平台上的安装过程。

#### 下载 Flutter SDK

- 你可以在 Flutter SDK 的下载页面，选择你想要的版本，一般选择稳定版的，目前最新的稳定版是 v1.9.1+hotfix.2。

- 将 Flutter SDK 的 zip 包解压到一个目录下，例如 E:\src\flutter（目录随意，但是不要放在需要权限的目录下，例如 C:\Program Files\ ）

#### 设置 Flutter SDK 的环境变量

> 计算机 -> 属性 -> 高级系统设置 -> 环境变量，打开环境变量设置框。

> 在用户变量下, 将 Flutter SDK 的完整路径 E:\src\flutter\bin 添加到[Path]变量上。

#### 运行 flutter doctor

> 为了验证 Flutter 是否安装成功，在 cmd 运行：

    flutter doctor


    C:\Users\Administrator>flutter doctor
    Doctor summary (to see all details, run flutter doctor -v):
    [✓] Flutter (Channel stable, v1.9.1-hotfix.2, on Microsoft Windows [Version 6.1.7601], locale zh-CN)
    [✓] Android toolchain - develop for Android devices (Android SDK 27.0.3)
    [✓] Android Studio (version 3.1)
    [!] Connected device 
        ! No devices available

    ! Doctor found issues in 1 categories.

#### 可能会遇到的报错

    Some Android licenses not accepted（Android证书的问题）

> 运行 **flutter doctor --android-licenses** 修护

**得到X:\xxxxsdk\tool\bin\sdkmanager --update**

**复制运行[会出现的报错]]**

- Exception in thread “main” java.lang.UnsupportedClassVersionError
> 查看Java版本 [如果Java版本大于8,去下载8版本的Java包,下载完成后,将Java的环境变量进行替换,并且Java的环境变量要优先于flutter],修复完成后继续运行X:\xxxxsdk\tool\bin\sdkmanager --update

- Warning: An error occured during installation: Failed to move away or delete existing target file: X盘:\androidSDK\sdk\tools

> 把sdk下面的tools文件夹，重命名一下tool或者随意，然后打开cmd，前往其目录下的bin\sdkmanager

> 执行--update，也就是你的X:\xxxxsdk\tool\bin\sdkmanager --update，执行

> 这里会有警告，也就是你刚刚重命名了，给你提醒一下，直接忽略警告等待完成，过程有点久，逛逛小网站，该干嘛干嘛

> 最终会在刚刚的sdk目录下生成新的tools文件夹，然后覆盖刚刚重命名的tool文件夹里的内容，删掉tools

> 就是把刚刚更新下来的tools里面的东西copy到tool里去，然后抛弃它

> 最后再次执行flutter doctor --android-licenses

> 并且在指令里跳出来的y/N那里，全部选y

> 最后提示所有的都接受了, 问题应该解决了。


## 🤑如何鏈接模擬器進行debug開發

> 這裏我下載的是逍遙模擬器【👄进入D:\Microvirt\MEmu文件夹下，打开cmd输入以下代码】

    adb connect 127.0.0.1:21503

**可能遇到的问题**

> 拒绝连接 ‼ ‼ ‼

----------------------------------

- 1. 确定全局的adb版本是否与逍遥模拟器的adb版本一致
- 2. 如果不一致, 将全局变量代表的adb.exe文件复制到逍遥模拟器中的adb.exe进行替换
- 3. 版本一致后, 继续执行adb connect 127.0.0.1:21503
- 4. 出现successfully, 表示连接成功


## 😍使用vscode启动项目

### 创建 Flutter 项目

> 在 VS Code 中，点击 View > Command Palette…，或者快捷键 Shift+cmd+P(MacOS) /Ctrl+Shift+P(Windows、Linux)，打开命令面板,输入 Flutter

> 选择 Flutter: New Project,会弹出出入框

> 然你输入 Flutter 工程的名字，你可以自己起一个，例如： hello_world。输入 Flutter 工程的名字后，回车，会弹出保存文件的目录地址,选择好等待即可 (大约1-2分钟) ：

### 运行Flutter APP

> VS Code 有两种方式运行 Flutter APP：

    Start Debugging
    Start Without Debugging


## 😱报错( 1 )

* Error running Gradle:
ProcessException: Process "C:\Users\asus\Desktop\myflutter\android\gradlew.bat" exited abnormally:
Starting a Gradle Daemon, 1 incompatible Daemon could not be reused, use --status for details


> 修改 android目录下的build.gradle文件，将google()和jcenter()注释掉，新加如下代码；

    buildscript {
        ext.kotlin_version = '1.2.71'
        repositories {
            // google()
            // jcenter()
            maven { url 'https://maven.aliyun.com/repository/google' }
            maven { url 'https://maven.aliyun.com/repository/jcenter' }
            maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
        }

        dependencies {
            classpath 'com.android.tools.build:gradle:3.2.1'
            classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        }
    }

    allprojects {
        repositories {
            // google()
            // jcenter()
            maven { url 'https://maven.aliyun.com/repository/google' }
            maven { url 'https://maven.aliyun.com/repository/jcenter' }
            maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
        }
    }

> 修改Flutter SDK包下的 flutter.gradle 文件

    buildscript {
        repositories {
            // google()
            // jcenter()
            maven { url 'https://maven.aliyun.com/repository/google' }
            maven { url 'https://maven.aliyun.com/repository/jcenter' }
            maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:3.2.1'
        }
    }

## 😇VSCode 开发 Flutter 必用插件

- Flutter Widget Snippets       //提供 Widget 代码片段，
- Awesome Flutter Snippets      //插件提供常用函数的代码片段。
- Bracket Pair Colorizer        // 高亮