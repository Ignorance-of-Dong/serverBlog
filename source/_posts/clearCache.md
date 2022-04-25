---
title: 清除单文件应用浏览器缓存
date: "2/23/2022 4:28:16 PM "
tag: ["js", "catch"]
meta:
  - name: description
    content: null
  - name: keywords
    content: null
---

# 清除缓存

> 开发网页时，需要清除用户的页面缓存，各个厂商标准不一致，也不给类似说明，是个令人头疼的问题，经调研，有一种方式可以清除页面的缓存，甚至是小程序里webview页面类似牛皮鲜一样顽固的缓存都可以清除掉

```javascript
(function(){
  var href = location.href, origin = location.origin, pathname = location.pathname, search = location.search, hash = location.hash;
  var searchs = search.replace(/_t_=[^&\?]*[&\?]*/g, '').replace(/(^[&\?]*)|([&\?]*$)/g, '');
  var ct = parseInt(new Date().valueOf() / 10000);
  var _t_ = (/_t_=[^&\?]*[&\?]*/.exec(href) || [])[0];
  if(_t_){
    _t_ = +_t_.replace(/(_t_=)|\?|&/g, '');
    var _t_p = +(localStorage.getItem('_t_') || ct);
    _t_p !== ct ? add() : clear();
  } else add(true);
  function add(bol){
    (document.getElementsByTagName('html')[0] || {}).innerHTML = '';
    localStorage.setItem('_t_', ct);
    if(bol) location.replace(origin + pathname + '?' + searchs + (searchs ? '&' : '') + '_t_=' + ct + hash);
    else location.replace(origin + pathname + '?' + searchs + (searchs ? '&' : '') + '_t_=' + ct + hash);
  }
  function clear(){
    history.replaceState({}, null, origin + pathname + (searchs ? '?' : '') + searchs + hash);
    clear = undefined;
  }
})()
```
> 将以下代码复制到页面里，写到最顶部的script,就可以清除页面的缓存了，速度快，不影响使用

> 可以有效解决meta nocha标签，链接加时间戳不生效的缓存