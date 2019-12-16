// pages/user_details/iser_follow_fans/iser_follow_fans.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followFansList: [],
    bgcolor1: '#FED12D',
    bgcolor2: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.selectFollow()
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

  },
  //跳转到用户详情页面
  navigateToUserDetails(e) {
    wx.navigateTo({
      url: '/pages/user_details/user_details?id=' + e.currentTarget.dataset.id,
    })
  },
  //关注数据
  selectFollow() {
    var that = this
    app.api.selectFollow({
        userId: app.user.id
      })
      .then(res => {
        that.setData({
          followFansList: res.data.data,
          bgcolor1: '#FED12D',
          bgcolor2: '',
        })
      })
  },
  //粉丝数据
  selectFans() {
    var that = this
    app.api.selectFans({
        userId: app.user.id
      })
      .then(res => {
        that.setData({
          followFansList: res.data.data,
          bgcolor1: '',
          bgcolor2: '#FED12D',
        })
      })
  },
})