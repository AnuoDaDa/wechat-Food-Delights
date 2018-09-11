//1, 引入链接数据库模块
var Wechat = require('../Dao/Wechat');
// 引入腾讯云上传图片模块
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    // 必选参数
    SecretId: "AKIDmQvELKHi7KfqfMJ7jFcopeHn9NQIgTms",
    SecretKey: "8ATedQ3VlpiQ6jIk4GKI8rtV4Sfg7OVQ",
});

// 食材查询
exports.material = function (req, res) {
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

};

// 食材修改
exports.update_material = function (req, res) {
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

};

// 食材修改页面展示
exports.updateMaterialOn = function (req, res) {
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

};

// 添加食材
exports.addMaterial = function (req, res) {
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

};

// 删除食材
exports.deMaterial = function (req, res) {
    var id=req.body.id;
    var result;
    console.log(id)
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

};

