//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    //用户信息
    user: {},
    //用户登录状态
    userLogStyle: false,
    //搜索框内容
    inputValue: '',
    //搜索框删除图标
    deleteIcon: false,
    /**
     * 轮播图
     */
    //轮播图片
    //是否显示面板指示点
    indicatorDots: false,
    //是否自动切换
    autoplay: true,
    //自动切换时间间隔
    interval: 5000,
    //滑动动画时长
    duration: 2000,
    //当前图片索引
    currentIndex: 0,
    //每日推荐
    recommendBook: {},
    //最新上架
    newestList: [],
    //猜你喜欢
    likeList: [],
  },
  //轮播图更换首图
  bindchange(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  //获取搜索框中内容
  bindKeyInput: function(e) {
    var value = e.detail.value
    if (value.length > 0) {
      this.setData({
        deleteIcon: true,
        inputValue: value
      })
    } else {
      this.setData({
        deleteIcon: false,
        inputValue: value
      })
    }
  },
  //清除搜索框内容
  iconClick() {
    console.log(this.data.inputValue)
    this.setData({
      deleteIcon: false,
      inputValue: ''
    })
  },
  //获取书籍数据
  findBookAll() {
    var that = this
    app.api.findBookAll({})
      .then(res => {
        that.setData({
          newestList: res.data.data,
          likeList: res.data.data,
        })
      })
    that.selectNewestBook()
  },
  //查询每日推荐信息
  selectNewestBook() {
    var that = this
    app.api.selectNewestBook({})
      .then(res => {
        that.setData({
          recommendBook: res.data.data
        })
      })
  },
  //获取微信用户信息
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      console.log("点击了同意授权");
      //调用微信的用户信息接口
      wx.getUserInfo({
        success: function(res) {
          // console.log(res)
          // 获取到用户的信息了，打印到控制台上看下
          // console.log("用户的信息如下：", res.userInfo);
          wx.login({
            success: function(loginRes) {
              // console.log(loginRes)
              if (loginRes.code) {
                // 请求自己的服务器,解密用户信息，获取unionId
                app.api.wxEmpower({
                    code: loginRes.code,
                    avatarUrl: res.userInfo.avatarUrl,
                    city: res.userInfo.city,
                    country: res.userInfo.country,
                    gender: res.userInfo.gender,
                    language: res.userInfo.language,
                    nickName: res.userInfo.nickName,
                    province: res.userInfo.province
                  })
                  .then(res => {
                    that.setData({
                      isHide: false
                    });
                  })
                that.wxLogin()
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
  },
  //微信登录
  wxLogin() {
    wx.login({
      success: function(loginRes) {
        console.log(loginRes)
        if (loginRes.code) {
          // 请求自己的服务器,解密用户信息，获取unionId
          app.api.wxLogin({
            code: loginRes.code,
          }).then(res => {
            wx.showTabBar();
            app.user.id = res.data.data.user.id
            console.log(app.user.id)
            app.userLogStyle = true; //修改登录状态
            wx.switchTab({
              url: '/pages/user/user'
            })
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (app.userLogStyle) {
      that.setData({
        isHide: false
      });
    } else {
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
                // console.log("用户的code:" + res.code);
                // 可以传给后台，再经过解析获取用户的 openid
                // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                app.api.wxLogin({
                  code: res.code,
                }).then(res => {
                  // 获取到用户的 openid
                  // console.log("用户的登录状态:", res.data.data);
                  if (res.data.data.status == 1) {
                    app.user.id = res.data.data.user.id
                    // console.log(app.user.id)
                    app.userLogStyle = true; //修改登录状态
                    wx.showLoading({
                      title: '微信登录中',
                    })
                    setTimeout(function() {
                      wx.switchTab({
                        url: '/pages/user/user'
                      })
                    }, 2000)
                  } else {
                    that.setData({
                      isHide: true
                    });
                  }
                })
              }
            });
          } else {
            // 用户没有授权
            // 改变 isHide 的值，显示授权页面
            that.setData({
              isHide: true
            });
            wx.hideTabBar();
          }
        },
        fail: function(res) {
          console.log(res)
        }
      });
    }
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
    var that = this
    that.setData({
      userLogStyle: app.userLogStyle,
      user: app.user
    })
    that.findBookAll()
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

  },
  /**
   * 测试发送订单消息
   */
  sendSubscribeMsg() {
    const templateId = 'nMFYKjCfJ1dA3JO__R3IC1RV0TynNjJckRWO9RTiP4c'; // 订阅消息模版id
    wx.requestSubscribeMessage({
      tmplIds: [templateId],
      success(res) {
        if (res[templateId] == 'accept') {
          //用户同意了订阅，允许订阅消息
          wx.showToast({
            title: '订阅成功'
          })

        } else {
          //用户拒绝了订阅，禁用订阅消息
          wx.showToast({
            title: '订阅失败'
          })
        }
      },
      fail(res) {
        console.log(res)
      },
      complete(res) {
        console.log(res)
        app.api.sendSubscribeMsg({
            templateId: templateId,
            openid: app.user.openId
          })
          .then(res => {})
      }
    })

  },
  /**
   * 跳转到登录页面
   */
  redirectToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  //跳转到用户详情页面
  navigateToUserDetails() {
    wx.navigateTo({
      url: '/pages/user_details/user_details?id=' + app.user.id,
    })
  },
  /**
   * 跳转到故事详情页面
   */
  redirectToDetails(e) {
    app.redirectToDetails(e)
  },
  /**
   * 跳转到每日推荐页面
   */
  recommendurl() {
    wx.navigateTo({
      url: '/pages/index/recommend/recommend'
    })
  },
  /**
   * 跳转到最新上架页面
   */
  newarrivalurl() {
    wx.navigateTo({
      url: '/pages/index/newarrival/newarrival'
    })
  },
  /**
   * 跳转到猜你喜欢页面
   */
  youlikeurl() {
    wx.navigateTo({
      url: '/pages/index/youlike/youlike'
    })
  },
  /**
   * 跳转到必听页面
   */
  mustlistenurl() {
    wx.navigateTo({
      url: '/pages/index/mustlisten/mustlisten'
    })
  },
  /**
   * 跳转到榜单页面
   */
  rankingurl() {
    wx.navigateTo({
      url: '/pages/index/ranking/ranking'
    })
  },
  /**
   * 跳转到全部分类页面
   */
  classificationurl() {
    wx.navigateTo({
      url: '/pages/index/classification/classification'
    })
  },
})