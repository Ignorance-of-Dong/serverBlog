---
title: 常见的几种数组排序算法JS实现
date: '4/1/2019 9:14:36 AM '
tag: ['js', 'sort', '排序']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
## 常见的几种数组排序算法JS实现

### 冒泡排序

> 故名思意 ，就是一个个冒泡到最前端或者最后端，主要是通过两两依次比较，以升序为例，如果前一项比后一项大则交换顺序，一直比到最后一对 

		function bubbleSort(arr) {
	  　　var len = arr.length; // 定义该数组的长度
	  　　for (var i = 0; i < len; i++) { // 遍历
	        console.log(arr[i], arr[i+1])
	  　　　　for (var j = 0; j < len - 1 - i; j++) {
	              
	  　　　　　　if (arr[j] > arr[j+1]) { //相邻元素两两对比
	  　　　　　　　　var temp = arr[j+1]; //元素交换
	  　　　　　　　　arr[j+1] = arr[j];
	  　　　　　　　　arr[j] = temp;
	  　　　　　　}
	  　　　　}
	  　　}
	  　　return arr;
	  }
	  var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
	  console.log(bubbleSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50] ；

### 选择排序 

> 获取到数组长度，遍历第一次【不遍历最后一个】，定义变量保存下标，遍历第二次【不遍历第一个】，将数组的第一个与数组的第二个值作比较，如果第二个值小于第一个值，将第一次保存的变量下标进行一个替换【替换成最小数的索引】，如果不小于就不做操作，


		function selectionSort(arr) {
	  　　var len = arr.length;
	  　　var minIndex, temp;
	  　　console.time('选择排序耗时');
	  　　for (var i = 0; i < len - 1; i++) {
	  　　　　minIndex = i;
	  　　　　for (var j = i + 1; j < len; j++) {
	  　　　　　　if (arr[j] < arr[minIndex]) { //寻找最小的数
	  　　　　　　　　minIndex = j; //将最小数的索引保存
	  　　　　　　}
	  　　　　}
	  　　　　temp = arr[i];
	  　　　　arr[i] = arr[minIndex];
	  　　　　arr[minIndex] = temp;
	  　　}
	  　　console.timeEnd('选择排序耗时');
	  　　return arr;
	  }
	  var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
	  console.log(selectionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]；

### 二分法插入排序

> 第一次遍历【不遍历第一个】，将遍历的第一个值保存起来，定义起始点


		function binaryInsertionSort(array) {
	  　　console.time('二分插入排序耗时：');
	  　　for (var i = 1; i < array.length; i++) {
	  　　　　var key = array[i], left = 0, right = i - 1;
	          // key = 3 ,left = 0, right = 0
	          // key = 44 ,left = 0, right = 1
	  　　　　while (left <= right) { // 0 <= -1   // 0 <= 1
	  　　　　　　var middle = parseInt((left + right) / 2); // 0 // 0
	  　　　　　　if (key < array[middle]) { // 3 < arr[0] = 44 44 < 44
	  　　　　　　　　right = middle - 1; // right = -1
	  　　　　　　} else {
	  　　　　　　　　left = middle + 1;  // left = 1
	  　　　　　　}
	  　　　　}
	  　　　　for (var j = i - 1; j >= left; j--) { // 循环 
	  　　　　　　array[j + 1] = array[j]; // arr[1] = arr[0]  arr [2] = 
	  　　　　}
	  　　　　array[left] = key; // arr[0] = 44
	  　　}
	  　　console.timeEnd('二分插入排序耗时：');
	  　　return array;
	  }
	  var arr=[44,3,38,5,47,15,36,26,27,2,46,4,19,50,48];
	  console.log(binaryInsertionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50];


### 