//1, 引入链接数据库模块
var Wechat = require('../Dao/Wechat');
// 引入腾讯云上传图片模块
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    // 必选参数
    SecretId: "AKIDmQvELKHi7KfqfMJ7jFcopeHn9NQIgTms",
    SecretKey: "8ATedQ3VlpiQ6jIk4GKI8rtV4Sfg7OVQ",
});

//菜品查询
exports.foods = function (req, res)  {
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
};

//菜品简介
exports.intros = function (req, res)  {
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
};

//菜品删除
exports.deFood = function (req, res)  {
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
};