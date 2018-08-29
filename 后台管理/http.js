//引入模块
var express = require('express');
//1, 引入模块
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

//食材查询
app.get('/material', function (req, res) {
    //链接数据库
    material = new Wechat();
    material.init();
    //取出数据
    var sql = "select * from food_material ";
    material.queryAll(sql, function (materials) {
        materials.forEach(function (material) {
            var filename=material.imageKey;
                material.imageKey=cos.getObjectUrl({
                Bucket: "class-1257212730", /* 必须 */ // Bucket 格式：test-1250000000
                Region: "ap-chengdu",
                Key: filename,
                Expires: 600000,
                Sign: true,
            }, function (err, data) {
            });
        })
      var response={
          materials:materials,
      }
        res.end(JSON.stringify(response));
    });
});

//食材修改
app.post('/update_material',function (req, res) {
    console.log('3333')
    var id=req.body.id;
    var type=req.body.type;
    var type_name=req.body.type_name;
    var imageKey=req.body.image;
    var result;
    console.log(id);
    //链接数据库
    material = new Wechat();
    material.init();
    //取出数据
    var sql = "update food_material set type=?,type_name=?,imageKey=? where id="+id;
    var params = [type,type_name,imageKey,id];
    if(!material.updata(sql,params)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

//食材修改页面展示
app.post('/updateMaterialOn', function (req, res) {

    var id=req.body.id;
    var result;
    //链接数据库
    material = new Wechat();
    material.init();
    //取出数据
    var sql = "select * from food_material where id="+id;
    material.queryAll(sql, function (materials) {
        var filename=materials[0].imageKey;
        materials[0].imageKey=cos.getObjectUrl({
            Bucket: "class-1257212730", /* 必须 */ // Bucket 格式：test-1250000000
            Region: "ap-chengdu",
            Key: filename,
            Expires: 600000,
            Sign: true,
        }, function (err, data) {
        });
        var response={
            materials:materials[0]
        }
        res.end(JSON.stringify(response));
    });
});

//食材添加
app.post('/addMaterial', function (req, res) {

    console.log('4444')
// add_material_type  add_material_name
    var material_type=req.body.material_type;
    var material_name=req.body.material_name;
    var material_img=req.body.material_img;
    var result;
    //链接数据库
    material = new Wechat();
    material.init();
    //取出数据
    var sql = "insert into food_material(type,type_name,imageKey) values (?,?,?)";
    var params = [material_type,material_name,material_img];
    material.insert(sql,params,function (data) {
        result=data.insertId;
        var response={
            result:result
        }
        res.end(JSON.stringify(response));
    })
});

//食材删除
app.post('/deMaterial', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    material = new Wechat();
    material.init();
    //取出数据
    var sql = "delete from food_material where id="+id;
    if(!material.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

//三餐查询
app.get('/meals', function (req, res) {
    //链接数据库
    meal = new Wechat();
    meal.init();
    //取出数据
    var sql = "select * from three_meals ";
    meal.queryAll(sql, function (meals) {
        meals.forEach(function (meal) {
            var filename=meal.imageKey;
            meal.imageKey=cos.getObjectUrl({
                Bucket: "class-1257212730", /* 必须 */ // Bucket 格式：test-1250000000
                Region: "ap-chengdu",
                Key: filename,
                Expires: 600000,
                Sign: true,
            }, function (err, data) {
            });
        })
        var response={
            meals:meals
        }
        res.end(JSON.stringify(response));
    });
});

//三餐删除
app.post('/deMeal', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    meal = new Wechat();
    meal.init();
    //取出数据
    var sql = "delete from three_meals where id="+id;
    if(!meal.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

//三餐添加
app.post('/addMeals', function (req, res) {
// add_material_type  add_material_name
    var meals_type=req.body.meals_type;
    var meals_name=req.body.meals_name;
    var meals_img=req.body.meals_img;
    var result;
    //链接数据库
    meals = new Wechat();
    meals.init();
    //取出数据
    var sql = "insert into three_meals(type,type_name,imageKey) values (?,?,?)";
    var params = [meals_type,meals_name,meals_img];
    meals.insert(sql,params,function (data) {
        result=data.insertId;
        var response={
            result:result
        }
        res.end(JSON.stringify(response));
    })
});

//三餐修改页面展示
app.post('/updateMealOn', function (req, res) {

    var id=req.body.id;
    var result;
    //链接数据库
    meal = new Wechat();
    meal.init();
    //取出数据
    var sql = "select * from three_meals where id="+id;
    meal.queryAll(sql, function (meals) {
        var filename=meals[0].imageKey;
        meals[0].imageKey=cos.getObjectUrl({
            Bucket: "class-1257212730", /* 必须 */ // Bucket 格式：test-1250000000
            Region: "ap-chengdu",
            Key: filename,
            Expires: 600000,
            Sign: true,
        }, function (err, data) {
        });
        var response={
            meals:meals[0]
        }
        res.end(JSON.stringify(response));
    });
});

//三餐修改
app.post('/update_meals',function (req, res) {
    var id=req.body.id;
    var type=req.body.type;
    var type_name=req.body.type_name;
    var imageKey=req.body.image;
    var result;
    console.log(imageKey)
    //链接数据库
    meal = new Wechat();
    meal.init();
    //取出数据
    var sql = "update three_meals set type=?,type_name=?,imageKey=? where id="+id;
    var params = [type,type_name,imageKey,id];
    if(!meal.updata(sql,params)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

//甜品查询
app.get('/desserts', function (req, res) {
    //链接数据库
    dessert = new Wechat();
    dessert.init();
    //取出数据
    var sql = "select * from bread_dessert ";
    dessert.queryAll(sql, function (desserts) {
        desserts.forEach(function (dessert) {
            var filename=dessert.imageKey;
            dessert.imageKey=cos.getObjectUrl({
                Bucket: "class-1257212730", /* 必须 */ // Bucket 格式：test-1250000000
                Region: "ap-chengdu",
                Key: filename,
                Expires: 600000,
                Sign: true,
            }, function (err, data) {
            });
        })
        var response={
            desserts:desserts
        }
        res.end(JSON.stringify(response));
    });
});

//甜品添加
app.post('/addDessert', function (req, res) {
    //add_dessert_name add_dessert_type add_dessert_typename
    var dessert_type=req.body.dessert_type;
    var dessert_name=req.body.dessert_name;
    var dessert_img=req.body.dessert_img;
    var result;
    //链接数据库
    dessert = new Wechat();
    dessert.init();
    //取出数据
    var sql = "insert into bread_dessert(type,type_name,imageKey) values (?,?,?)";
    var params = [dessert_type,dessert_name,dessert_img];
    dessert.insert(sql,params,function (data) {
        result=data.insertId;
        var response={
            result:result
        }
        res.end(JSON.stringify(response));
    })
});

//甜品删除
app.post('/deDessert', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    dessert = new Wechat();
    dessert.init();
    //取出数据
    var sql = "delete from bread_dessert where id="+id;
    if(!dessert.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

//甜品修改页面展示
app.post('/updateDessertOn', function (req, res) {

    var id=req.body.id;
    var result;
    //链接数据库
    dessert = new Wechat();
    dessert.init();
    //取出数据
    var sql = "select * from bread_dessert where id="+id;
    dessert.queryAll(sql, function (desserts) {
        var filename=desserts[0].imageKey;
        desserts[0].imageKey=cos.getObjectUrl({
            Bucket: "class-1257212730", /* 必须 */ // Bucket 格式：test-1250000000
            Region: "ap-chengdu",
            Key: filename,
            Expires: 600000,
            Sign: true,
        }, function (err, data) {
        });
        var response={
            desserts:desserts[0]
        }
        res.end(JSON.stringify(response));
    });
});

//食材修改
app.post('/update_dessert',function (req, res) {
    var id=req.body.id;
    var type=req.body.type;
    var type_name=req.body.type_name;
    var imageKey=req.body.image;
    var result;
    console.log(id);
    //链接数据库
    dessert = new Wechat();
    dessert.init();
    //取出数据
    var sql = "update bread_dessert set type=?,type_name=?,imageKey=? where id="+id;
    var params = [type,type_name,imageKey,id];
    if(!dessert.updata(sql,params)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }
    res.end(JSON.stringify(response));
});

//菜品查询
app.get('/foods', function (req, res) {
    //链接数据库
    food = new Wechat();
    food.init();
    //取出数据
    var sql = "select all_food.ch_id,all_food.ch_name,all_food.ch_short_intro,all_food.ch_long_intro,"+
        "all_food.type,all_food.ch_url,users.user_name from all_food , users where "+
    "all_food.user_id=users.user_id";
    food.queryAll(sql, function (foods) {
        var response={
            foods:foods
        }
        res.end(JSON.stringify(response));
    });
});

//菜品简介
app.post('/intros', function (req, res) {
    var id=req.body.id;
    //链接数据库
    food = new Wechat();
    food.init();
    //取出数据
    var sql = "select ch_short_intro,ch_long_intro from all_food where ch_id="+id;
    food.queryAll(sql, function (food) {
        var response={
            intro:food[0]
        }
        res.end(JSON.stringify(response));
    });
});

//菜品删除
app.post('/deFood', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    food = new Wechat();
    food.init();
    //取出数据
    var sql = "delete from all_food where ch_id="+id;
    if(!food.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

//用户收藏删除
app.post('/deCollect', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    collect = new Wechat();
    collect.init();
    //取出数据
    var sql = "delete from collect where collect_id="+id;
    if(!collect.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

//评论查询
app.get('/comment', function (req, res) {
    //链接数据库
    comments = new Wechat();
    comments.init();
    //取出数据
    var sql = "select comments.comment_id,users.user_name,all_food.ch_name,comment_cont from comments,users,all_food where comments.user_id=users.user_id and comments.ch_id=all_food.ch_id";
    comments.queryAll(sql, function (comments) {
        var response={
            comments:comments
        }

        res.end(JSON.stringify(response));
    });
});

//评论内容查询
app.post('/comment_dis', function (req, res) {
    var id=req.body.id;
    //链接数据库
    comment = new Wechat();
    comment.init();
    //取出数据
    var sql = "select comment_cont from comments where comments.comment_id="+id;
    comment.queryAll(sql, function (comment) {
        var response={
            content:comment[0]
        }
        res.end(JSON.stringify(response));
    });
});

//评论删除
app.post('/deComment', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    comment = new Wechat();
    comment.init();
    //取出数据
    var sql = "delete from comments where comment_id="+id;
    if(!comment.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }
    res.end(JSON.stringify(response));
});

//用户收藏删除
app.post('/deCollect', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    collect = new Wechat();
    collect.init();
    //取出数据
    var sql = "delete from collect where collect_id="+id;
    if(!collect.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

//用户查询
app.get('/user', function (req, res) {
    //链接数据库
    users = new Wechat();
    users.init();
    //取出数据
    var sql = "select * from users ";
    users.queryAll(sql, function (users) {
        var response={
            users:users
        }

        res.end(JSON.stringify(response));
    });
});

//用户删除
app.post('/deUser', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    songList = new Wechat();
    songList.init();
    //取出数据
    var sql = "delete from users where user_id="+id;
    if(!songList.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

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