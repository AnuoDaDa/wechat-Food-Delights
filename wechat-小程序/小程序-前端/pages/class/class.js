// pages/class/class.js
const util = require('../../utils/util.js');
Page({

  /* 页面的初始数据*/
  data: {
    // isLike:1
  },
  likeChange:function(event) {
   var that = this;
    // wx.getStorage({
    //   key: 'key',
    //   success: function (res) {
    //     // 异步接口在success回调才能拿到返回值
    //     var user_id = JSON.parse(res.data)
    //     console.log(user_id);
    //     console.log(event.currentTarget.id);
    //     wx.request({

    //       url: 'http://localhost:6032/addLikes',
    //       method: 'POST',
    //       data: {
    //         food_id: event.currentTarget.id,
    //         user_id: user_id
    //       },
    //       header: {
    //         "content-type": "application/x-www-form-urlencoded"
    //       },
    //       success: function (res) {
    //         wx.showToast({
    //           title: "收藏成功",
    //           duration: 1000,
    //           icon: "sucess",
    //           make: true
    //         })
    //       }
    //     })
    //   },
    //   fail: function () {
    //     console.log('读取key1发生错误')
    //   }
    // })
   


    console.log(event.currentTarget.dataset);
   

    var islike =  event.currentTarget.dataset.islike;
    if (event.currentTarget.dataset.islike==1){
      wx.getStorage({
        key: 'key',
        success: function (res) {
          // 异步接口在success回调才能拿到返回值
          var user_id = JSON.parse(res.data)
          console.log(user_id);
          wx.request({
            url: 'http://localhost:6032/UpdateLikes',
            method: 'POST',
            data: {
              id: event.currentTarget.dataset.id,
              // isLike: event.currentTarget.dataset.islike,
              user: user_id
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              wx.showToast({
                title: "取消成功",
                duration: 1000,
                icon: "sucess",
                make: true
              })
            }
          })
        },
        fail: function () {
          console.log('读取key1发生错误')
        }
      }),
        // console.log(that);
        this.setData({  
            islike:0
        })
    }else{
      wx.getStorage({
        key: 'key',
        success: function (res) {
          var user_id = JSON.parse(res.data)
          console.log(user_id);
          wx.request({
            url: 'http://localhost:6032/UpdateCancelLikes',
            method: 'POST',
            data: {
              id: event.currentTarget.dataset.id,
              // isLike: event.currentTarget.dataset.islike,
              user: user_id
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              wx.showToast({
                title: "添加成功",
                duration: 1000,
                icon: "sucess",
                make: true
              })
            }
          })
        },
        fail: function () {
          console.log('读取key1发生错误')
        }
      })



    }
    
   
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