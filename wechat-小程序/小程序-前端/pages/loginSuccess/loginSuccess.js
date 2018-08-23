//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentData: 0,
    userInfo: {},
    hasUserInfo: false,
    tempFilePaths:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
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
  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo){
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
        success: function (res) {
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
  move_to_build:function(){
    wx.navigateTo({
      url: '../build/build'
    })
    
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    console.log(e);
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  }

})
