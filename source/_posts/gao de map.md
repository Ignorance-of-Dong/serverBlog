---
title: vue中使用高德地图定位
date: '2/22/2019 2:27:00 PM '
tag: ['js', 'vue', '定位']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## 高德地图API

### javascript API[高德地图官网链接](https://lbs.amap.com/api/javascript-api/guide/services/geolocation)

#### 首先注册成为开发者

> 为项目添加key

### 在vue中使用高德地图定位

> **/index.html**

	<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.12&key=添加你自己的key"></script>

> **/build/webpack.base.conf.js**

	module.exports = {
		externals: {
		    AMap: 'AMap'
		  },
	}


### 以模块的形式引入

> **/map.js**

	import AMap from 'AMap'
	/* eslint-disable */
	let maps
	const map = { // 定位
	  geolocation () {
	    return new Promise((resolve, reject) => {
	      AMap.plugin('AMap.Geolocation', () => {
	        var geolocation = new AMap.Geolocation({
	          // 是否使用高精度定位，默认：true
	          enableHighAccuracy: true,
	          // 设置定位超时时间，默认：无穷大
	          timeout: 10000
	        })
	        geolocation.getCurrentPosition() // 执行定位
	        AMap.event.addListener(geolocation, 'complete', (data) => {
	          resolve(data)
	        }) // 成功的回调
	        AMap.event.addListener(geolocation, 'error', (data) => {
	          reject(data)
	        }) // 失败的回调
	      })
	    })
	  },
	  citySearch () { // 当前所在城市信息
	    return new Promise((resolve, reject) => {
	      AMap.plugin('AMap.CitySearch', () => {
	        const citySearch = new AMap.CitySearch()
	        citySearch.getLocalCity(function (status, result) {
	          if (status === 'complete' && result.info === 'OK') {
	            // 查询成功，result即为当前所在城市信息
	            resolve(result)
	          }
	        })
	      })
	    })
	  },
	  search (key, city) { // 根据城市搜索附近地区
	    return new Promise((resolve, reject) => {
	      AMap.plugin(['AMap.PlaceSearch'], () => {
	        var placeSearch = new AMap.PlaceSearch({
	          city: city
	        })
	        placeSearch.search(key, (status, result) => {
	          if (result.poiList) {
	            resolve(result.poiList.pois)
	          }
	        })
	      })
	    })
	  },
	  renderMap (el) { // 渲染一张地图
	    console.log(el)
	    maps = new AMap.Map(el, {
	      resizeEnable: true, // 是否监控地图容器尺寸变化
	      zoom: 17,
	      center: [116.408075, 39.950187],
	      features: ['bg', 'road', 'building', 'point']
	    })
	    // AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
	    //   maps.addControl(new AMap.ToolBar())
	    //   maps.addControl(new AMap.Scale())
	    // })
	  }
	}
	
	export default map


> **使用的时候直接调用即可**




