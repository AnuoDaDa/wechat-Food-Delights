//1, 引入链接数据库模块
var Wechat = require('../Dao/Wechat');
// 引入腾讯云上传图片模块
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    // 必选参数
    SecretId: "AKIDmQvELKHi7KfqfMJ7jFcopeHn9NQIgTms",
    SecretKey: "8ATedQ3VlpiQ6jIk4GKI8rtV4Sfg7OVQ",
});

//查询三餐
exports.meals = function (req, res)  {
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
};

// 删除三餐
exports.deMeal = function (req, res)  {
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
};

// 添加三餐
exports.addMeals = function (req, res)  {
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
};

// 三餐查询页面展示
exports.updateMealOn = function (req, res)  {
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
};

// 三餐修改
exports.update_meals = function (req, res)  {
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
};