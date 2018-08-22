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
      var response={
          materials:materials
      }
        res.end(JSON.stringify(response));
    });
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

//歌单添加
app.post('/addSongList', function (req, res) {
    var name=req.body.name;
    var creator=req.body.creator;
    var img=req.body.img;
    var playVolume=req.body.playvolume;
    var result;

    //链接数据库
    songList = new Wechat();
    songList.init();
    //取出数据
    var sql = "insert into songlist(name,creator,imgUrl,Play_volume) values (?,?,?,?)";
    var params = [name,creator,img,playVolume];
   songList.insert(sql,params,function (data) {
        result=data.insertId;
        var response={
            result:result
        }
        res.end(JSON.stringify(response));
    })
});

//三餐查询
app.get('/meals', function (req, res) {
    //链接数据库
    meal = new Wechat();
    meal.init();
    //取出数据
    var sql = "select * from three_meals ";
    meal.queryAll(sql, function (meals) {
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

//甜品查询
app.get('/desserts', function (req, res) {
    //链接数据库
    dessert = new Wechat();
    dessert.init();
    //取出数据
    var sql = "select * from bread_dessert ";
    dessert.queryAll(sql, function (desserts) {
        var response={
            desserts:desserts
        }
        res.end(JSON.stringify(response));
    });
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

//收藏查询
app.get('/collect', function (req, res) {
    //链接数据库
    collects = new Wechat();
    collects.init();
    //取出数据
    var sql = "select collect.collect_id, users.user_name,all_food.ch_name from collect,users,all_food where collect.user_id=users.user_id and collect.ch_id=all_food.ch_id";
    collects.queryAll(sql, function (collects) {
        var response={
            collects:collects
        }

        res.end(JSON.stringify(response));
    });
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

//歌曲查询
app.get('/songs', function (req, res) {
    //链接数据库
    song = new Wechat();
    song.init();
    //取出数据
    var sql = "select songs.song_id,songs.songName,songs.singer,songs.album,songs.imgUrl,songs.time,songlist.name from songs,songlist where songs.songList_id=songlist.songList_id";
    song.queryAll(sql, function (songs) {
        var response={
            songs:songs
        }

        res.end(JSON.stringify(response));
    });
});

//歌单删除
app.post('/deSong', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    songList = new Wechat();
    songList.init();
    //取出数据
    var sql = "delete from songs where song_id="+id;
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

//歌单添加
app.post('/addSong', function (req, res) {

    var songName=req.body.songName;
    var singer=req.body.singer;
    var albume=req.body.albume;
    var songImg=req.body.songImg;
    var songlist=req.body.songlist;
    var time=req.body.time;
    var result;

    console.log(songlist);

    //链接数据库
    songList = new Wechat();
    songList.init();
    //取出数据
    var sql = "insert into songs(songName,singer,album,songList_id,imgUrl,time) values (?,?,?,?,?,?)";
    var params = [songName,singer,albume,songlist,songImg,time];
    songList.insert(sql,params,function (data) {
        result=data.insertId;
        var response={
            result:result
        }
        res.end(JSON.stringify(response));
    })
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

//用户添加
app.post('/addUser', function (req, res) {
// identity userName password
    var userName=req.body.userName;
    var password=req.body.password;
    var identity=req.body.identity;
    var result;
    //链接数据库
    songList = new Wechat();
    songList.init();
    //取出数据
    var sql = "insert into user(userName,userPwd,identity) values (?,?,?)";
    var params = [userName,password,identity];
    songList.insert(sql,params,function (data) {
        result=data.insertId;
        var response={
            result:result
        }
        res.end(JSON.stringify(response));
    })
});


//标签查询
app.get('/songListTag', function (req, res) {
    //链接数据库
    songListTag = new Wechat();
    songListTag.init();
    //取出数据
    var sql = "select songlist_tag.id,songlist.name,tags.tagName from songlist_tag,songlist,tags where songlist_tag.songList_id=songList.songList_id and songlist_tag.tag_id=tags.tag_id";
    songListTag.queryAll(sql, function (songListTags) {
        var response={
            songListTags:songListTags
        }

        res.end(JSON.stringify(response));
    });
});

//用户收藏删除
app.post('/deSongListTag', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    songList = new Wechat();
    songList.init();
    //取出数据
    var sql = "delete from songlist_tag where id="+id;
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

// 百度图片上传
app.post("/upload", multer({dest: __dirname + '/public/images/songList/'}).array('file'), function (req, res) {
    var responseJson = {
        code: '1'// 上传的文件信息
    };
    var src_path = req.files[0].path;
    var fileName = new Date().getTime() + ".jpg";
    var des_path = req.files[0].destination + new Date().getTime() + ".jpg";

    console.log(fileName);

    fs.rename(src_path, des_path, function (err) {
        if (err) {
            throw err;
        }
        fs.stat(des_path, function (err, stat) {
            if (err) {
                throw err;
            }
            responseJson['upload_file'] = fileName;

            res.json(responseJson);
        });
    });
});

//设置监听
app.listen(8000);