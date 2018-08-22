//index.js
//获取应用实例
const util = require('../../utils/util.js');
const app = getApp()

Page({

  move_to_explore: function() {
    wx.navigateTo({
      url: '../explore/explore'
    })
  },
  Menu_change: function(event) {
    console.log(event.currentTarget.dataset.foodid);
    wx.navigateTo({
      url: '../Menu/menu?id=' + event.currentTarget.dataset.foodid
    })
  },
  watchAll: function() {
    wx.navigateTo({
      url: '../show/show'
    })

  },
  onLoad: function(options) {
    var that = this;
    util.ask('new_food', function(data) {
        that.setData({
          allFood: data.food,
          random1: Math.floor(Math.random() * (data.food.length - 2) + 1)
        });
      }),
      util.ask('home_dish', function(data) {
        that.setData({
          homeDish: data.food,
          random2: Math.floor(Math.random() * (data.food.length - 1) )
        });
      }),
      util.ask('breakfast', function (data) {
        that.setData({
          breakFast: data.food,
          random3: Math.floor(Math.random() * (data.food.length - 1))
        });
      })
  },
})