var OriginTitile = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
 if (document.hidden) {
     document.title = 'Web page loss ~';
     clearTimeout(titleTime);
 }
 else {
     document.title = '(ฅ>ω<*ฅ) ~' + OriginTitile;
     titleTime = setTimeout(function () {
         document.title = OriginTitile;
     }, 2000);
 }
});
