//index.js
//获取应用实例
const app = getApp()

Page({

  move_to_explore: function() {
    wx.navigateTo({
      url: '../explore/explore'
    })
  },
  watchAll: function() {
    wx.navigateTo({
      url: '../show/show'
    })

  }
})