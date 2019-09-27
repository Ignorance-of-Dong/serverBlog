---
title: node简单的压缩/解压缩
date: '8/10/2019 10:41:49'
tag: ['js', 'node']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# node简单的压缩/解压缩

> 为了减少网络传输数据量，http传输过程中会采用通用的压缩算法来压缩数据，gzip属于最常用的压缩算法。

## 压缩文件

    //压缩文件

    let zlib=require("zlib")
    let fs=require("fs")

    var gzip=zlib.createGzip()
    let rs=fs.createReadStream('./copy.js')
    let ws=fs.createWriteStream('./copy.js.gz')

    re.pipe(gzip).pipe.(ws)

## 解压文件

    //解压文件
    let zlib=require("zlib")
    let fs=require("fs")

    var gzip=zlib.createGzip()
    let rs=fs.createReadStream('./copy.js.gz')
    let ws=fs.createWriteStream('./copy.js')

    re.pipe(gzip).pipe.(ws)

## 服务端的gzip压缩

    //服务端的gzip压缩

    //先起一个服务，判断req.headers['accept-encoding']是否包含gzip

    let server=http.createServer(function(req,res){
        console.log(req)
        var zp=req.headers[['accept-encoding']]
        console.log(zp)
        if(zp.indexOf('gzip')!=-1){//判断是否需要gzip压缩
        
            var gzip = zlib.createGzip();
            res.writeHead(200, {//记得响应 Content-Encoding，告诉浏览器：文件被 gzip 压缩过
                'Content-Encoding': 'gzip'
            });
            let ws=fs.createWriteStream("./cop.js.gz")
            fs.createReadStream("./cop.js").pipe(gzip).pipe(ws);
        }else{
            
            fs.createReadStream("./cop.js").pipe(res);
        }
        res.end()
        
    }).listen(3000)
