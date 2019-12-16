// pages/user/exchange/order/order_item/order_item.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.findAllOrder()
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
  /**
   * 查询登录用户所有订单
   */
  findAllOrder() {
    var that = this
    app.api.findAllOrder({
        userId: app.user.id, //用户id
      })
      .then(res => {
        that.setData({
          orderList: res.data.data
        })
      })
  },
  /**
   * 取消订单
   */
  cancelOrder(e) {
    var that = this
    // console.log(e.currentTarget.dataset.orderid)
    wx.showModal({
      title: '提示',
      content: '你确定要取消订单吗？',
      success(res) {
        if (res.confirm) {
          app.api.cancelOrder({
              orderId: e.currentTarget.dataset.orderid, //订单id
            })
            .then(res => {
              wx.showToast({
                title: '取消订单成功',
                icon: 'none',
                duration: 2000
              })
            })
          that.onLoad()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 付款
   */
  payment(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认付款',
      success(res) {
        if (res.confirm) {
          app.api.payment({
              orderId: e.currentTarget.dataset.orderid, //订单id
              userId: app.user.id, //用户id
            })
            .then(res => {
              if (res.data.data.code == 606) {
                wx.showToast({
                  title: res.data.data.msg,
                  icon: 'none',
                  duration: 2000
                })
                return false;
              }
              if (res.data.data.code == 0) {
                wx.showToast({
                  title: res.data.data.msg,
                  icon: 'success',
                  duration: 2000
                })
                that.onLoad()
              } else {
                wx.showToast({
                  title: res.data.data.msg,
                  icon: 'loading',
                  duration: 2000
                })
              }
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})