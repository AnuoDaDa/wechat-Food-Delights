// pages/class/class.js
Page({

  /* 页面的初始数据*/
  data: {
    title: "",
    tags:[0,0,0,0,0,0,0,0,0,0,0,0],
    likeImg:"../../imgs/unlike.png"
  },

  likeChange:function(event) {
    this.setData({
      // 页面初始化 options为页面跳转所带来的参数
      likeImg: "../../imgs/like.png"
    })
  },
  Menu_change: function (event) {
    wx.navigateTo({
      url: '../Menu/menu?title=微信小程序'
    })
  },

  onLoad: function (options) {
    this.setData({
      // 页面初始化 options为页面跳转所带来的参数
      title: options.title
    })
  },

})