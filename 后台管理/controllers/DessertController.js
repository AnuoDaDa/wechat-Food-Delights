//1, 引入链接数据库模块
var Wechat = require('../Dao/Wechat');
// 引入腾讯云上传图片模块
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    // 必选参数
    SecretId: "AKIDmQvELKHi7KfqfMJ7jFcopeHn9NQIgTms",
    SecretKey: "8ATedQ3VlpiQ6jIk4GKI8rtV4Sfg7OVQ",
});

//甜品查询
exports.desserts = function (req, res)  {
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
};

//甜品添加
exports.addDessert = function (req, res)  {
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
};

//甜品删除
exports.deDessert = function (req, res)  {
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
};

//甜品修改页面展示
exports.updateDessertOn = function (req, res)  {
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
};

//甜品修改
exports.update_dessert = function (req, res)  {
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
};
