//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },
  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  wx.request({
                    // 自行补上自己的 APPID 和 SECRET
                    url: app.pathWXLoginUrl + 'wxLogin',
                    data: {
                      code: res.code
                    },
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success: res => {
                      // 获取到用户的 openid
                      console.log("用户的登录状态:", res.data.data);
                      if (res.data.data.status == 1) {
                        app.user.id = res.data.data.user.id
                        console.log(app.user.id)
                        app.userLogStyle = true; //修改登录状态
                        wx.switchTab({
                          url: '/pages/user/user'
                        })
                      } else {
                        that.setData({
                          isHide: true
                        });
                      }
                    }
                  });
                }
              });
            
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      },
      fail: function(res) {
        console.log(res)
      }
    });
  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      console.log("点击了同意授权");
      //调用微信的用户信息接口
      wx.getUserInfo({
        success: function(res) {
          console.log(res)
          // 获取到用户的信息了，打印到控制台上看下
          console.log("用户的信息如下：", res.userInfo);
          wx.login({
            success: function(loginRes) {
              console.log(loginRes)
              if (loginRes.code) {
                // 请求自己的服务器,解密用户信息，获取unionId
                wx.request({
                  url: app.pathWXLoginUrl + 'wxEmpower',
                  method: "get",
                  //请求的参数data
                  data: {
                    code: loginRes.code,
                    avatarUrl: res.userInfo.avatarUrl,
                    city: res.userInfo.city,
                    country: res.userInfo.country,
                    gender: res.userInfo.gender,
                    language: res.userInfo.language,
                    nickName: res.userInfo.nickName,
                    province: res.userInfo.province
                  },
                  herder: {
                    'content-type': 'application/json'
                  },
                  success: function(resData) {
                    console.log(resData)
                    if (resData.data.code == 10002) {
                      wx.showModal({
                        title: '提示',
                        content: "当前微信号已授权",
                        success(res) {
                          if (res.confirm) {
                            wx.redirectTo({
                              url: '/pages/login/login'
                            })
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                            wx.redirectTo({
                              url: '/pages/user/login'
                            })
                          }
                        }
                      })
                      return false;
                    } else {
                      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
                      that.setData({
                        isHide: false
                      });
                    }
                  },
                  fail: function() {
                    conlose.log('系统错误')
                  }
                })
              }
            }
          })

        },
        fail: function() {
          console.log("获取用户信息失败")
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})