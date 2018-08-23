// pages/classify/classify.js

const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  // data: {
  //   materials: [1,1,1,1,11,1,1,1,1],
  // },
  //事件处理函数
  bindViewTap: function (event) {
    // console.log(event.currentTarget.dataset.type);
    wx.navigateTo({
      url: '../class/class?type=' + event.currentTarget.dataset.type
    })
  },
  onLoad: function (options) {
    var that = this;
    util.ask('food_material', function (data) {
      // console.log(data.food);
        that.setData({
          foodType: data.food
        });
      }),
      util.ask('three_meals', function (data) {
        // console.log(data.food);
        that.setData({
          threeMeals: data.food
        });
      }),
      util.ask('bread_dessert', function (data) {
        // console.log(data.food);
        that.setData({
          breadDessert: data.food
        });
      });
  },
})