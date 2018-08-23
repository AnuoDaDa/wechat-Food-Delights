// pages/class/class.js
const util = require('../../utils/util.js');
Page({

  /* 页面的初始数据*/
  data: {
    likeImg:"../../imgs/unlike.png"
  },

  likeChange:function(event) {

    wx.getStorage({
      key: 'key',
      success: function (res) {
        // 异步接口在success回调才能拿到返回值
        var user_id = JSON.parse(res.data)
        console.log(user_id);
        console.log(event.currentTarget.id);
        wx.request({

          url: 'http://localhost:6032/addLikes',
          method: 'POST',
          data: {
            food_id: event.currentTarget.id,
            user_id: user_id
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res.data);
          }
        })
      },
      fail: function () {
        console.log('读取key1发生错误')
      }
    })
   
    this.setData({
      // 页面初始化 options为页面跳转所带来的参数
      likeImg: "../../imgs/like.png"
    })
  },
  Menu_change: function (event) {
    console.log(event.currentTarget.dataset.foodid);
    wx.navigateTo({
      url: '../Menu/menu?id='+event.currentTarget.dataset.foodid
    })
  },

  onLoad: function (options) {
    console.log(options.type);
    var that = this;
    util.ask('all_food', function (data1) {
      that.setData({
        allFood: data1.food,
        foodType: options.type
       
      });
    });
  },

})