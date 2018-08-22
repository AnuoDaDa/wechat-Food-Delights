var express = require("express");
var app = express();
var fs = require("fs");
//设置cookie
var cookieParser = require('cookie-parser');
app.use(cookieParser());
//设置session
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
//设置静态文件
app.use(express.static('public'));
//指定模板引擎
app.set("views engine", 'ejs');
//指定模板位置
app.set('views', __dirname + '/views');

app.use(bodyParser.json()); // for parsing application/json
//1,接受表单的请求
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//2,设置下载的地址
// app.use(multer({dest: '/public/'}).array('image'));
app.use(bodyParser.urlencoded({extended: false}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//食物分类
app.get("/food_material", function (req, res) {
    //1, 引入模块
    var ImageUtil = require('./dao/ImageUtil');
    //2,创建对象
    imageUtil = new ImageUtil();
    imageUtil.init();
    //1, 引入腾讯模块
    var BannerUtil = require('./util/BannerUtil');
    //2,创建对象
    BannerUtil = new BannerUtil();
    BannerUtil.init();
    imageUtil.queryFoodType(function (imageData) {
        //根据数据，获得key值
        var length = imageData.length;
        for (var i = 0; i < length; i++) {
            var key = imageData[i].imageKey;
            //到腾讯云平台获得图片地址
            BannerUtil.query(key, function (url) {
                imageData[i].imageKey = url;
            })
        }
        // console.log(imageData);
       var data={
            food: imageData
        }
        res.end(JSON.stringify(data));
    });
});

app.get("/three_meals", function (req, res) {
    //1, 引入模块
    var ImageUtil = require('./dao/ImageUtil');
    //2,创建对象
    imageUtil = new ImageUtil();
    imageUtil.init();
    //1, 引入腾讯模块
    var BannerUtil = require('./util/BannerUtil');
    //2,创建对象
    BannerUtil = new BannerUtil();
    BannerUtil.init();
    imageUtil.querythreeMeals(function (imageData) {
        //根据数据，获得key值
        var length = imageData.length;
        for (var i = 0; i < length; i++) {
            var key = imageData[i].imageKey;
            //到腾讯云平台获得图片地址
            BannerUtil.query(key, function (url) {
                imageData[i].imageKey = url;
            })
        }
        // console.log(imageData);
        var data={
            food: imageData
        }
        res.end(JSON.stringify(data));
    });
});

app.get("/bread_dessert", function (req, res) {
    //1, 引入模块
    var ImageUtil = require('./dao/ImageUtil');
    //2,创建对象
    imageUtil = new ImageUtil();
    imageUtil.init();
    //1, 引入腾讯模块
    var BannerUtil = require('./util/BannerUtil');
    //2,创建对象
    BannerUtil = new BannerUtil();
    BannerUtil.init();
    imageUtil.querybreadDessert(function (imageData) {
        //根据数据，获得key值
        var length = imageData.length;
        for (var i = 0; i < length; i++) {
            var key = imageData[i].imageKey;
            //到腾讯云平台获得图片地址
            BannerUtil.query(key, function (url) {
                imageData[i].imageKey = url;
            })
        }
        // console.log(imageData);
        var data={
            food: imageData
        }
        res.end(JSON.stringify(data));
    });
});

app.get("/all_food", function (req, res) {
    //1, 引入模块
    var ImageUtil = require('./dao/ImageUtil');
    //2,创建对象
    imageUtil = new ImageUtil();
    imageUtil.init();
    //1, 引入腾讯模块
    var BannerUtil = require('./util/BannerUtil');
    //2,创建对象
    BannerUtil = new BannerUtil();
    BannerUtil.init();
    imageUtil.queryallFood(function (imageData) {
        //根据数据，获得key值
        var length = imageData.length;
        for (var i = 0; i < length; i++) {
            var key = imageData[i].ch_url;
            //到腾讯云平台获得图片地址
            BannerUtil.query(key, function (url) {
                imageData[i].ch_url = url;
            })
        }
        // console.log(imageData);
        var data={
            food: imageData
        }
        res.end(JSON.stringify(data));
    });
});

app.get("/step", function (req, res) {
    //1, 引入模块
    var ImageUtil = require('./dao/ImageUtil');
    //2,创建对象
    imageUtil = new ImageUtil();
    imageUtil.init();
    //1, 引入腾讯模块
    var BannerUtil = require('./util/BannerUtil');
    //2,创建对象
    BannerUtil = new BannerUtil();
    BannerUtil.init();
    imageUtil.queryStep(function (imageData) {
        //根据数据，获得key值
        var length = imageData.length;
        for (var i = 0; i < length; i++) {
            var key = imageData[i].imageKey;
            //到腾讯云平台获得图片地址
            BannerUtil.query(key, function (url) {
                imageData[i].imageKey = url;
            })
        }
        // console.log(imageData);
        var data={
            food: imageData
        }
        res.end(JSON.stringify(data));
    });
});

app.get("/new_food", function (req, res) {
    //1, 引入模块
    var ImageUtil = require('./dao/ImageUtil');
    //2,创建对象
    imageUtil = new ImageUtil();
    imageUtil.init();
    //1, 引入腾讯模块
    var BannerUtil = require('./util/BannerUtil');
    //2,创建对象
    BannerUtil = new BannerUtil();
    BannerUtil.init();
    imageUtil.querynewFood(function (imageData) {
        //根据数据，获得key值
        var length = imageData.length;
        for (var i = 0; i < length; i++) {
            var key = imageData[i].imageKey;
            //到腾讯云平台获得图片地址
            BannerUtil.query(key, function (url) {
                imageData[i].imageKey = url;
            })
        }
        // console.log(imageData);
        var data={
            food: imageData
        }
        res.end(JSON.stringify(data));
    });
});

app.get("/home_dish", function (req, res) {
    //1, 引入模块
    var ImageUtil = require('./dao/ImageUtil');
    //2,创建对象
    imageUtil = new ImageUtil();
    imageUtil.init();
    //1, 引入腾讯模块
    var BannerUtil = require('./util/BannerUtil');
    //2,创建对象
    BannerUtil = new BannerUtil();
    BannerUtil.init();
    imageUtil.queryhomeDish(function (imageData) {
        //根据数据，获得key值
        var length = imageData.length;
        for (var i = 0; i < length; i++) {
            var key = imageData[i].imageKey;
            //到腾讯云平台获得图片地址
            BannerUtil.query(key, function (url) {
                imageData[i].imageKey = url;
            })
        }
        // console.log(imageData);
        var data={
            food: imageData
        }
        res.end(JSON.stringify(data));
    });
});

app.get("/breakfast", function (req, res) {
    //1, 引入模块
    var ImageUtil = require('./dao/ImageUtil');
    //2,创建对象
    imageUtil = new ImageUtil();
    imageUtil.init();
    //1, 引入腾讯模块
    var BannerUtil = require('./util/BannerUtil');
    //2,创建对象
    BannerUtil = new BannerUtil();
    BannerUtil.init();
    imageUtil.querybreakFast(function (imageData) {
        //根据数据，获得key值
        var length = imageData.length;
        for (var i = 0; i < length; i++) {
            var key = imageData[i].imageKey;
            //到腾讯云平台获得图片地址
            BannerUtil.query(key, function (url) {
                imageData[i].imageKey = url;
            })
        }
        console.log(imageData);
        var data={
            food: imageData
        }
        res.end(JSON.stringify(data));
    });
});
var server = app.listen(6032,function(){
    console.log("the  server is running..");
});