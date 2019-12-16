// pages/user/exchange/order/order.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gift: {}, //商品信息
    receiveAddress: {}, //收货地址信息
    purchaseQuantity: '', //购买数量
    payamount: '', //小计总价
    zongJia: '', //共计总价
    tradeCode: '', //交易码

  },

  //更换收货地址
  redirectToReceiveAddress() {
    wx.navigateTo({
      url: '/pages/user/exchange/receive_address/receive_address'
    })
  },
  //提交订单
  submitOrder() {
    var that = this
    app.api.submitOrder({
        userId: app.user.id, //用户id
        skuId: that.data.skuId, //商品信息
        receiveAddressId: that.data.receiveAddress.id, //用户收货地址id
        purchaseQuantity: that.data.purchaseQuantity, //用户购买数量
        zongJia: that.data.zongJia, //总价
        tradeCode: that.data.tradeCode, //交易码
      })
      .then(res => {
        console.log(res.data)
        if (res.data.data.code == 500) {
          wx.showToast({
            title: res.data.data.msg,
            icon: 'none',
            duration: 2000
          })
          return false;
        }
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
            icon: 'none',
            duration: 2000
          })
          wx.redirectTo({
            url: '/pages/user/exchange/order/order_item/order_item'
          })
        }
      })
  },
  /**
   * 我的默认收货地址
   */
  getReceiveAddress(userid) {
    var that = this
    app.api.getReceiveAddress({
        userid: userid
      })
      .then(res => {
        that.setData({
          receiveAddress: res.data.data //收货地址信息
        })
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.getReceiveAddress(options.userid)
    app.api.selectCommodityById({
        skuid: options.skuid
      })
      .then(res => {
        that.setData({
          gift: res.data.data, //商品信息
          purchaseQuantity: options.purchaseQuantity, //购买数量
          payamount: options.payamount, //小计总价
          zongJia: options.payamount, //总价(实际付款)
          tradeCode: options.tradeCode, //交易码
          skuId: options.skuid
        })
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