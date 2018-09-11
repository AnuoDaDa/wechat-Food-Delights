//1, 引入链接数据库模块
var Wechat = require('../Dao/Wechat');
// 引入腾讯云上传图片模块
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    // 必选参数
    SecretId: "AKIDmQvELKHi7KfqfMJ7jFcopeHn9NQIgTms",
    SecretKey: "8ATedQ3VlpiQ6jIk4GKI8rtV4Sfg7OVQ",
});

//评论查询
exports.comment = function (req, res)  {
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
};

//评论内容查询
exports.comment_dis = function (req, res)  {
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
};

//评论删除
exports.deComment = function (req, res)  {
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
};