function ImageUtil() {
    var connection;
    this.init = function () {
        var mysql = require('mysql');  //调用MySQL模块

        //1，创建一个connection
        connection = mysql.createConnection({
            host: 'localhost',       //主机 ip
            user: 'root',            //MySQL认证用户名
            password: 'root',                //MySQL认证用户密码
            port: '3306',                 //端口号
            database: 'food_delights'          //数据库里面的数据
        });

        //2,连接
        connection.connect();
    }
//遍历食材分类
    this.queryFoodType = function (call) {

        var sql = "select * from food_material";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });

        connection.end();
    }
//遍历三餐
    this.querythreeMeals = function (call) {

        var sql = "select * from three_meals";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
        connection.end();
    }
//遍历面包甜点
    this.querybreadDessert = function (call) {

        var sql = "select * from bread_dessert";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
        connection.end();
    }

    this.queryallFood = function (call) {

        var sql = "select * from all_food";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
        connection.end();
    }

    this.queryStep = function (call) {

        var sql = "select all_food.ch_id," +
            "all_food.ch_name," +
            "all_food.ch_long_intro," +
            "step.step1," +
            "step.step2," +
            "step.step3," +
            "step.step4," +
            "step.step5," +
            "step.imageKey from all_food,step where all_food.ch_id=step.url_id";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
        connection.end();
    }

    this.querynewFood = function (call) {

        var sql = "select all_food.ch_id," +
            "all_food.ch_name," +
            "all_food.ch_short_intro," +
            "step.imageKey from all_food,step where all_food.ch_id=step.url_id";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
        connection.end();
    }

    this.queryhomeDish = function (call) {
        // select a.* from a inner join b on a.id=b.aid where b.tagname='中国'
        var sql = "select all_food.*,step.* from all_food inner join step on all_food.ch_id=step.url_id where all_food.type='pigs_beef_mutton'";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
        connection.end();
    }

    this.querybreakFast = function (call) {
        // select a.* from a inner join b on a.id=b.aid where b.tagname='中国'
        var sql = "select all_food.*,step.* from all_food inner join step on all_food.ch_id=step.url_id where all_food.type='breakfast'";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
        connection.end();
    }



}



  module.exports = ImageUtil;