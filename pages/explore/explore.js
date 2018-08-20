//index.js
//获取应用实例
const app = getApp()

Page({

  move_to_explore: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }
})