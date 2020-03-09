var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var files;
var mypath = path.join(__dirname, '../src/media/');
fs.readdir(mypath, function (err, names) {
    if (!err) {
        files = names;
    }
})
//解决跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();   
});

//获取歌曲列表；
app.get('/getList.json', function (req, res) {
    //返回的json对象
    var obj = {
        code: 0,
        list: files
    };
    res.setHeader('Access-Control-Allow-Origin','*')
    res.jsonp(obj);
});

//获取音频；
app.get('/media/:id', function (req, res) {
    console.log(req.params.id);
    console.log('/media/'+req.params.id);
    let songPath = path.join(mypath,req.params.id);
    console.log(songPath);
    res.sendFile(songPath);
});

//启动服务，监听一个端口，不要和页面的端口
app.listen(5000);
console.log('server服务已经开启，请打开localhost:5000!');

