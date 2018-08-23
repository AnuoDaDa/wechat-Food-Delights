//index.js
var COS = require('../../lib/cos-wx-sdk-v5')

const util = require('../../utils/util.js');
var config = require('./config')

var cos = new COS({
  getAuthorization: function(params, callback) { //获取签名 必填参数

    // 方法一（推荐）服务器提供计算签名的接口

    // wx.request({
    //     url: 'SIGN_SERVER_URL',
    //     data: {
    //         Method: params.Method,
    //         Key: params.Key
    //     },
    //     dataType: 'text',
    //     success: function (result) {
    //         callback(result.data);
    //     }
    // });

    // 方法二（适用于前端调试）
    var authorization = COS.getAuthorization({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      Method: params.Method,
      Key: params.Key
    });
    callback(authorization);
  }
});

// var requestCallback = function(err, data) {
//   // console.log(err || data);
//   if (err && err.error) {
//     wx.showModal({
//       title: '返回错误',
//       content: '请求失败：' + err.error.Message + '；状态码：' + err.statusCode,
//       showCancel: false
//     });
//   } else if (err) {
//     wx.showModal({
//       title: '请求出错',
//       content: '请求出错：' + err + '；状态码：' + err.statusCode,
//       showCancel: false
//     });
//   } else {
//     wx.showToast({
//       title: '请求成功',
//       icon: 'success',
//       duration: 3000
//     });
//   }
// };

var option = {
  data: {
    list: [],
  },

  pickerConfirm: function(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },
  pickerCancel: function(e) {
    this.setData({
      pickerHidden: true
    })
  },
  pickerShow: function(e) {
    this.setData({
      pickerHidden: false
    })
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
        url: 'http://localhost:6032/insertFood',
        method: 'POST',
        data: {
          food_name: e.detail.value.food_name,
          food_short_intro: e.detail.value.food_short_intro,
          food_long_intro: e.detail.value.food_long_intro,
          food_type: e.detail.value.food_type,
          imageKey: e.detail.value.imageKey
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          console.log(res.data);
        }
      }),
      wx.request({
        url: 'http://localhost:6032/insertFoodStep',
        method: 'POST',
        data: {
          step1: e.detail.value.step1,
          step2: e.detail.value.step2,
          step3: e.detail.value.step3,
          step4: e.detail.value.step4,
          step5: e.detail.value.step5,
          imageKey: e.detail.value.imageKey
        },
        header: {
          "content-type": "applfanication/x-www-form-urlencoded"
        },
        success: function(res) {
          console.log(res.data);
        }
      })
  },
  formReset: function(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  onLoad: function(options) {
    var that = this;
    util.ask('food_type', function(data) {
      // console.log(data.food);
      that.setData({
        foodType: data.food
      });
    })
  },
};

option.simpleUpload = function() {
  // 选择文件
  var that = this;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {
      var filePath = res.tempFilePaths[0]

      var Key = "WX" + new Date().getTime() + ".png";
      // filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
      //  this.setData({
      //    key:Key
      //  })
      cos.postObject({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        FilePath: filePath,
        onProgress: function(info) {
          // console.log(JSON.stringify(info));
        }
      }, function(err, data) {

        console.log(err || data);
        if (err && err.error) {
          wx.showModal({
            title: '返回错误',
            content: '请求失败：' + err.error.Message + '；状态码：' + err.statusCode,
            showCancel: false
          });
        } else if (err) {
          wx.showModal({
            title: '请求出错',
            content: '请求出错：' + err + '；状态码：' + err.statusCode,
            showCancel: false
          });
        } else {
          wx.showToast({
            title: '请求成功',
            icon: 'success',
            duration: 3000
          });

          if (data.statusCode == 200) {
            var url = cos.getObjectUrl({
              Bucket: "food-delights-1257212764", // Bucket 格式：test-1250000000
              Region: "ap-chengdu",
              Key: Key,
              Expires: 600000,
              Sign: true,
            }, function(err, data) {});
            var body = {
              key: Key,
              url: url
            }
            // res.json(body);
            // var that = this;
            console.log(body);
            that.setData({
              body: body
            })

          }

        }


      });
    }
  })
  // console.log(Key);
};

//获取应用实例
Page(option);