---
title: 微信小程序实现瀑布流
date: '3/24/2019 4:36:42 PM '
tag: ['wx', '瀑布流']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# 微信小程序实现瀑布流

### 简单，便捷

> - 无需知道图片宽高（当然要实现懒加载是必须的）
> - 一个判断
> - 一句css

----------

>  1. 先用css3中的column-count属性把页面元素分为俩列及多列。


----------

### 直接上代码

> **wxml**

	
	<view class="free-WaterfallFlow">
	  <block>
	    <view class="flex-wrap" wx:for="{{images}}" wx:key='{{item.src}}' 
	    wx:if="{{item.id%2!=''}}">
	      <image mode="widthFix" src="{{item.src}}"></image>
	      <view>{{item.name}}</view>
	      <view>{{item.data}}</view>
	    </view>
	  </block>
	  <block>
	    <view class="flex-wrap" wx:for="{{images}}" wx:key='{{item.src}}'
	    wx:if="{{item.id%2==''}}">
	      <image mode="widthFix" src="{{item.src}}"></image>
	      <view>{{item.name}}</view>
	      <view>{{item.data}}</view>
	    </view>
	  </block>
	</view>


----------
> **wxss**

	.free-WaterfallFlow{
	  width:94%;
	  column-count:2;/*column-count 属性规定元素应该被分隔的列数：*/
	}
	.free-WaterfallFlow .flex-wrap{
	  display: inline-block;
	  width:98%;
	  margin-bottom:2%;
	  border:1px solid #ccc;
	  padding:2%;
	  padding-top:5%;
	  margin-right:2%;
	  box-shadow: 0 1px 2px rgba(34, 25, 25, 0.4);
	  text-align: center;
	}
	.flex-wrap image{
	  width:95%;
	  margin:0 auto;
	}
	.flex-wrap view:nth-child(2){
	  font-size:15px;
	  padding:2% 0;
	  color:#717171;
	}
	.flex-wrap view:nth-child(3){
	  font-size:13px;
	  padding:2% 0;
	  color:#aaa;
	  text-align: right;
	}


----------
> **js**

	Page({
	  data: {
	    images:[
	      { 
	        id:'1',
	        src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531825645104&di=0cfede1dd354581e22385b1862375a6a&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F13%2F71%2F35%2F24k58PICSiB_1024.jpg',
	        name:'照片01',
	        data:'2017/11/1'
	      }, {
	        id: '2',
	        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531825645032&di=826b8cfa4f7c5a8765d5c2156913dcbb&imgtype=0&src=http%3A%2F%2Fimg382.ph.126.net%2Fp4dMCiiHoUGxf2N0VLspkg%3D%3D%2F37436171903673954.jpg',
	        name: '照片02',
	        data: '2017/11/2'
	      }, {
	        id: '3',
	        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531825645104&di=2c9e1223e705806967640495e4bac26b&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0147a458783b1ba801219c77f9ec2e.jpg%402o.jpg',
	        name: '照片03',
	        data: '2017/11/3'
	      }, {
	        id: '4',
	        src: 'http://t1.hxzdhn.com/uploads/tu/bj/slt/yezpvg0x23b.jpg',
	        name: '照片04',
	        data: '2017/11/4'
	      }, {
	        id: '5',
	        src: 'http://t1.hxzdhn.com/uploads/tu/201807/9999/95ed87388b.jpg',
	        name: '照片05',
	        data: '2017/11/5'
	      }, {
	        id: '6',
	        src: 'http://t1.hxzdhn.com/uploads/tu/201807/9999/99495c4cf4.jpg',
	        name: '照片06',
	        data: '2017/11/6'
	      }, {
	        id: '7',
	        src: 'http://t1.hxzdhn.com/uploads/tu/201807/9999/f867c97e25.jpg',
	        name: '照片07',
	        data: '2017/11/7'
	      }, {
	        id: '8',
	        src: 'http://t1.hxzdhn.com/uploads/tu/201807/9999/2cc7ab0bc5.jpg',
	        name: '照片08',
	        data: '2017/11/8'
	      }, {
	        id: '9',
	        src: 'http://t1.hxzdhn.com/uploads/tu/201807/9999/2f4435caaf.jpg',
	        name: '照片09',
	        data: '2017/11/9'
	      }, {
	        id: '10',
	        src: 'http://t1.hxzdhn.com/uploads/tu/201807/9999/ce76898540.jpg',
	        name: '照片10',
	        data: '2017/11/10'
	      }, {
	        id: '11',
	        src: 'http://t1.hxzdhn.com/uploads/tu/201807/9999/a2ccc41e47.jpg',
	        name: '照片11',
	        data: '2017/11/11'
	      }, {
	        id: '12',
	        src: 'http://t2.hddhhn.com/uploads/tu/201707/521/83.jpg',
	        name: '照片12',
	        data: '2017/11/12'
	      }, {
	        id: '13',
	        src: 'http://t2.hddhhn.com/uploads/tu/20150700/2hndrjt0jxe.jpg',
	        name: '照片13',
	        data: '2017/11/13'
	      }, {
	        id: '14',
	        src: 'http://t2.hddhhn.com/uploads/tu/20150700/2hndrjt0jxe.jpg',
	        name: '照片14',
	        data: '2017/11/14'
	      }
	    ]
	  }
	})

