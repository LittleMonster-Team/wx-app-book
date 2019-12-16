//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    giftList: []
  },

  reconvert(e) {
    console.log(e.currentTarget.dataset.skuid)
    console.log(e.currentTarget.dataset.commodityid)
    var skuid = e.currentTarget.dataset.skuid
    var commodityId = e.currentTarget.dataset.commodityid
    wx.navigateTo({
      url: '/pages/user/exchange/exchange_details/exchange_details?id=' + skuid + "&cid=" + commodityId
    })
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
    var that = this
    app.api.selectGiftByUserId({
        userid: app.user.id
      })
      .then(res => {
        that.setData({
          giftList: res.data.data
        })
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

  }
})