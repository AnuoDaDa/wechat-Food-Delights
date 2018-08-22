function Wechat() {
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

    this.insert = function (sql,params,call) {
        //2,进行插入操作
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return false;
            }
            call(result);
        });
        //5,连接结束
        connection.end();
    }

    this.delete = function (sql) {
        //2,进行删除操作
        connection.query(sql,function (err, result) {
            if (err) {
                console.log('[DELETE ERROR] - ', err.message);
                return false;
            }
        });
        //5,连接结束
        connection.end();
    }

    //数据查询
    this.queryAll = function (SOL,call) {
        var sql = SOL;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
        //5,连接结束
        connection.end();
    }

    //数据修改
    this.updata=function(sql,params){
        connection.query(sql, params, function (error, result) {
            if(error)
            {
                console.log(error.message);
                return false;
            }
        });
        connection.end();
    }
}

module.exports = Wechat;