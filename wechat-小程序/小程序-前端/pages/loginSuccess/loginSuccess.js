
const app = getApp()
const util = require('../../utils/util.js');
Page({
  data: {
    currentData: 0,
    userInfo: {},
    hasUserInfo: false,
    tempFilePaths: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    likeImg:"../../imgs/like.png"
  },
  likeChange:function(e){
    // console.log(e.currentTarget.id);
    wx.request({
      url: 'http://localhost:6032/DeleteLikes',
      method: 'POST',
      data: {
        id: e.currentTarget.id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
      }
    });
    this.setData({
      likeImg: "../../imgs/unlike.png"
    })

  },
  onLoad: function() {
    // console.log(options.type);
    var that = this;
    // util.ask('likes', function(data1) {
    //   that.setData({
    //     likes: data1.food,
    //   });
    // });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })




    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    wx.setStorage({
      key: "key",
      data: JSON.stringify(e.detail.userInfo.nickName),
      success: function() {
        console.log('写入用户信息成功')
      },
      fail: function() {
        console.log('写入用户信息错误')
      }
    })
    // console.log(e)
    if (e.detail.userInfo) {
      var that = this;
      wx.request({
        url: 'http://localhost:6032/insertUser',
        method: 'POST',
        data: {
          nickName: e.detail.userInfo.nickName,
          gender: e.detail.userInfo.gender,
          avatarUrl: e.detail.userInfo.avatarUrl
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          console.log(res.data);
        }
      });
    };

    // console.log(app.globalData.openid)
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
 //跳转到创建菜单的页面
  move_to_build: function() {
    wx.navigateTo({
      url: '../build/build'
    })

  },
  //获取当前滑块的index
  bindchange: function(e) {
    const that = this;
    // console.log(e);
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function(e) {
    var that = this;
    // console.log(e.target.dataset.nickname);
    wx.getStorage({
      key: 'key',
      success: function(res) {
        // 异步接口在success回调才能拿到返回值
        var user_id = JSON.parse(res.data)
        console.log(user_id);
        // console.log(event.currentTarget.id);

        util.ask('likes', function(data1) {
          that.setData({
            likes: data1.food,
            nickName: user_id
          });
        });
      },
      fail: function() {
        console.log('读取key1发生错误')
      }
    })

    // const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  Menu_change: function(event) {
    // console.log(event.currentTarget.dataset.foodid);
    wx.navigateTo({
      url: '../Menu/menu?id=' + event.currentTarget.dataset.foodid
    })
  }

})