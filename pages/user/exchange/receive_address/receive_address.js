// pages/user/exchange/receive_address/receive_address.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiveAddressList: []
  },
  //新增收货地址
  redirectToAddAddress() {
    wx.navigateTo({
      url: '/pages/user/exchange/receive_address/add_address/add_address'
    })
  },
  //修改收货地址
  redirectToUpdateAddress(e) {
    console.log(e.currentTarget.dataset.id)
    var adderssId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/user/exchange/receive_address/update_address/update_address?id=' + adderssId
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
    this.getReceiveAddressList()
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
  //获取用户所有收货信息
  getReceiveAddressList() {
    var that = this
    app.api.getReceiveAddressList({
        userid: app.user.id
      })
      .then(res => {
        that.setData({
          receiveAddressList: res.data.data
        })
      })
  }
})