var titleTime,OriginTitile=document.title;document.addEventListener("visibilitychange",function(){document.hidden?(document.title="Web page loss ~",clearTimeout(titleTime)):(document.title="(ฅ>ω<*ฅ) ~"+OriginTitile,titleTime=setTimeout(function(){document.title=OriginTitile},2e3))});