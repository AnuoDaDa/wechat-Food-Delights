// pages/class/class.js
const util = require('../../utils/util.js');
Page({

  /* 页面的初始数据*/
  data: {
    likeImg:"../../imgs/unlike.png"
  },

  likeChange:function(event) {
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