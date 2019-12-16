//获取应用实例
const app = getApp()
const templateId = 'umZkEcWPdKEV6R4rwAX_PQ_LGRw9m0W-cNJfkOOLCD8'; // 订阅消息模版id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user: {},
    //用户登录状态
    userLogStyle: false,
    checkinstatus: '未签到',
    showModal: false,
    integral: 40,
    followNum: 0,
    fansNum: 0,
    qiandaoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var id = app.user.id
    // console.log(id)
    if (id == undefined) {
      return false;
    } else {
      var that = this;
      app.api.getUserInformation({
          userid: id
        })
        .then(res => {
          // console.log(res.data.data.entity1)
          if (res.data.data.status == 1) {
            that.setData({
              checkinstatus: '已签到',
              user: res.data.data.entity1,
              followNum: res.data.data.entity2.followNum,
              fansNum: res.data.data.entity2.fansNum,
              userLogStyle: app.userLogStyle
            })
          } else {
            that.setData({
              checkinstatus: '未签到',
              user: res.data.data.entity1,
              followNum: res.data.data.entity2.followNum,
              fansNum: res.data.data.entity2.fansNum,
              userLogStyle: app.userLogStyle
            })
          }

          app.user = res.data.data.entity1
          app.user_details = res.data.data.entity2
        })
      that.onLoad();
    }
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
   * 用户签到
   */
  // 外面的弹窗
  redirectToGender: function() {
    if (app.userLogStyle) {
      var that = this
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
          app.api.openSignIn({
              userid: app.user.id
            })
            .then(res => {
              var signIn = res.data.data.signIn
              var signInList = signIn.split(",");
              that.setData({
                showModal: true,
                qiandaoList: signInList
              })
            })
        }
      })
    } else {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 2000
      })
    }

  },

  // 禁止屏幕滚动
  preventTouchMove: function() {},

  // 弹出层里面的弹窗
  closePopup: function() {
    this.setData({
      showModal: false
    })
  },
  //用户签到,添加签到天数
  updateSignInNum(day) {
    var that = this
    app.api.updateSignInNum({
        userid: app.user.id,
        day: day,
        integral: that.data.integral
      })
      .catch(res => {
        wx.showToast({
          title: '签到成功',
          icon: 'success',
          duration: 2000
        })
      })
    that.sendSignInMsg()
  },
  sendSignInMsg() {
    app.api.sendSignInMsg({
        templateId: templateId,
        openid: app.user.openId
      })
      .then(res => {})
  },
  //修改签到状态
  modifyState(e) {
    var that = this
    app.api.updateSignInState({})
      .then(res => {
        var day = res.data.data;
        var item = e.currentTarget.dataset.item; //状态
        var id = e.currentTarget.dataset.id; //星期几
        // console.log("星期：" + day)
        // console.log("签到状态(0未签到，1已签到)：" + item)
        // console.log("签到id：" + id)
        var index = id - 1
        if (id != day) {
          wx.showToast({
            title: '只能当天签到哦',
            icon: 'none',
            duration: 2000
          })
        } else {
          let srcStyle = "qiandaoList[" + index + "]"
          if (item == 0) {
            that.updateSignInNum(day)
            that.setData({
              [srcStyle]: 1,
              showModal: false,
              checkinstatus: '已签到'
            })
          } else {
            wx.showToast({
              title: '已签到',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
  },
  /**
   * 用户修改详细地址
   */
  redirectToDetailedAddress() {
    wx.navigateTo({
      url: 'detailed_address/detailed_address'
    })
  },
  //用户登录
  redirectToLogin() {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  //用户信息
  redirectToUser() {
    wx.navigateTo({
      url: '../../../personal/personal'
    })
  },
  //用户信息
  redirectToIntegral() {
    wx.navigateTo({
      url: '../../../integral/integral'
    })
  },
  //关注/粉丝信息
  navigateTolatelyplay() {
    wx.navigateTo({
      url: '/pages/user_details/user_follow_fans/user_follow_fans'
    })
  },
  //最近播放
  redirectTolatelyplay() {
    if (app.userLogStyle) {
      wx.navigateTo({
        url: '../../../latelyplay/latelyplay'
      })
    } else {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //我的收藏
  redirectTocollection() {
    if (app.userLogStyle) {
      wx.navigateTo({
        url: '../../../my_collection/my_collection'
      })
    } else {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //我的购买
  redirectTopurchase() {
    if (app.userLogStyle) {
      wx.navigateTo({
        url: '../../../my_purchase/my_purchase'
      })
    } else {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //我的下载
  redirectTodownload() {
    if (app.userLogStyle) {
      wx.navigateTo({
        url: '../../../my_download/my_download'
      })
    } else {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 2000
      })
    }
  },


  //我的宝豆
  redirectToMycommodity() {
    if (app.userLogStyle) {
      wx.navigateTo({
        url: '../../../my_baobean/my_baobean'
      })
    } else {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //兑换中心
  redirectToExchange() {
    if (app.userLogStyle) {
      wx.navigateTo({
        url: '../../../exchange/exchange'
      })
    } else {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //我的兑换
  redirectToMyGift() {
    if (app.userLogStyle) {
      wx.navigateTo({
        url: '../../../my_gift/my_gift'
      })
    } else {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //我的订单
  redirectToOrder() {
    if (app.userLogStyle) {
      wx.navigateTo({
        url: '/pages/user/exchange/order/order_item/order_item'
      })
    } else {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //我的钱包
  redirectToWallet() {
    if (app.userLogStyle) {
      wx.navigateTo({
        url: '../../../wallet/wallet'
      })
    } else {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //关于我们
  redirectToAboutus() {
    wx.navigateTo({
      url: '../../../aboutus/aboutus'
    })
  },
  //设置
  redirectToSetup() {
    wx.navigateTo({
      url: '../../../setup/setup'
    })
  },

})