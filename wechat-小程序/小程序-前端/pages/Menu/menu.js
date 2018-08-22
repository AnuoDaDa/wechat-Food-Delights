// pages/Menu/menu.js

const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    materials: [1, 1, 1, 1, 1, 1, 1],
    kitchenUtensils: [2, 2, 2],
    steps: [3, 3, 3, 3],
    tags: [4, 4, 4, 4, 4, 4, 44, 4],
    comments: [5, 55, 5, 5, 5, 5, 5]
  },

  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    console.log(options.id);
    var that = this;
    util.ask('step', function(data1) {
      that.setData({
        thisFood: data1.food,
        foodId: options.id
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})