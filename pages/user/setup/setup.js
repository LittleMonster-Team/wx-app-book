//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginState: false,
    netWorkType: '',
    switchChecked: false,
  },
  /**
   * 前往登录
   */
  signIn() {
    wx.navigateTo({
      url: '../../login/login'
    })
    var that = this
    that.setData({
      loginState: app.userLogStyle
    })
  },
  /**
   * 退出登录
   */
  signOut() {
    var that = this
    app.userLogStyle = false
    that.setData({
      loginState: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getNetworkType({
      success: function(res) {
        // console.log(res.networkType)
        // that.setData({
        //   netWorkType: res.networkType
        // })
        if (res.networkType == 'wifi') {
          that.setData({
            switchChecked: true
          })
        } else {
          that.setData({
            switchChecked: false
          })
        }
      }
    })
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
      loginState: app.userLogStyle
    })
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
  redirectToAccountSecurity() {
    if (app.userLogStyle) {

      wx.navigateTo({
        url: 'accountsecurity/accountsecurity'
      })
    } else {
      wx.showToast({
        title: '未登录',
        icon: 'none',
        duration: 1000
      })
    }
  },
  redirectToFeedback() {
    wx.navigateTo({
      url: 'feedback/feedback'
    })
  }
})