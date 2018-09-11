//引入模块
var express = require('express');
// //1, 引入模块
var Wechat = require('./Dao/Wechat');
//表单处理引入模块
var bodyParser = require('body-parser');
//引入cookie模块
var cookieParser = require('cookie-parser');
var session = require('express-session');
//图片上传
var formidable = require('formidable');
//引入md5加密模块
var crypto = require('crypto');
var multer = require('multer');
var fs = require("fs");


var formidable = require('formidable');
// 引入腾讯云上传图片模块
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    // 必选参数
    SecretId: "AKIDmQvELKHi7KfqfMJ7jFcopeHn9NQIgTms",
    SecretKey: "8ATedQ3VlpiQ6jIk4GKI8rtV4Sfg7OVQ",
});
//创建对象
var app = express();
app.use(bodyParser.json({limit: '50mb'}));
//1,接受表单的请求
app.use(bodyParser.urlencoded({extended: false}));
//设置静态文件
app.use(express.static('public'));
app.use(cookieParser());
//handle request entity too large
app.use(bodyParser.json({limit:'50mb'}));
//指定模板引擎
app.set('view engine', 'ejs');
//指定模板位置
app.set('views', __dirname + '/views');


app.get('/index', function (req, res) {
    res.render('index', {
    });
});

// 食材
var materialController = require('./controllers/MaterialController');
app.get('/material', materialController.material);  //食材查询
app.post('/update_material', materialController.update_material);  //食材修改
app.post('/updateMaterialOn', materialController.updateMaterialOn);   //食材修改页面展示
app.post('/addMaterial', materialController.addMaterial);  //食材添加
app.post('/deMaterial', materialController.deMaterial);   //食材删除

// 三餐
var mealsController = require('./controllers/MealsController');
app.get('/meals', mealsController.meals);  //三餐查询
app.post('/update_meals', mealsController.update_meals);  //三餐修改
app.post('/updateMealOn', mealsController.updateMealOn);   //三餐修改页面展示
app.post('/addMeals', mealsController.addMeals);  //三餐添加
app.post('/deMeal', mealsController.deMeal);   //三餐删除

// 甜品
var dessertController = require('./controllers/DessertController');
app.get('/desserts', dessertController.desserts);  //甜品查询
app.post('/update_dessert', dessertController.update_dessert);  //甜品修改
app.post('/updateDessertOn', dessertController.updateDessertOn);   //甜品修改页面展示
app.post('/addDessert', dessertController.addDessert);  //甜品添加
app.post('/deDessert', dessertController.deDessert);   //甜品删除

// 菜品
var foodsController = require('./controllers/FoodsController');
app.get('/foods', foodsController.foods);  //菜品查询
app.post('/intros', foodsController.intros);  //菜品簡介
app.post('/deFood', foodsController.deFood);   //刪除菜品

// 评论
var commentController = require('./controllers/CommentController');
app.get('/comment', commentController.comment);  //评论查询
app.post('/comment_dis', commentController.comment_dis);  //评论内容查询
app.post('/deComment', commentController.deComment);   //评论删除

// 用戶
var userController = require('./controllers/UserController');
app.get('/user', userController.user);  //评论查询
app.post('/deCollect', userController.deCollect);  //评论内容查询
app.post('/deUser', userController.deUser);   //评论删除



//图片上传至腾讯云
app.post("/upload",multer({dest: __dirname + '/public/upload/img/'}).array('file'), function (req, res) {

    var filepath = req.files[0].path;

    var filename = req.files[0].originalname+new Date().getTime();
    // 调用方法
    cos.putObject({
        Bucket: "class-1257212730", /* 必须 */ // Bucket 格式：test-1250000000 存储桶的名称
        Region: "ap-chengdu",
        Key: filename, /* 必须 */
        TaskReady: function (tid) {
        },
        onProgress: function (progressData) {

        },
        // 格式1. 传入文件内容
        // Body: fs.readFileSync(filepath),
        // 格式2. 传入文件流，必须需要传文件大小
        Body: fs.createReadStream(filepath),
        ContentLength: fs.statSync(filepath).size
    }, function (err, data) {
        if(data.statusCode==200){
            var url = cos.getObjectUrl({
                Bucket: "class-1257212730", /* 必须 */ // Bucket 格式：test-1250000000
                Region: "ap-chengdu",
                Key: filename,
                Expires: 600000,
                Sign: true,
            }, function (err, data) {
            });
            var body = {
                key:filename,
                url:url
            }
            res.json(body);
        }
    });

});

//设置监听
app.listen(8000);