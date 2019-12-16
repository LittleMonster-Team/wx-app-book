//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentMethod: '微信',
    money: 0,
    baoBean: 0,
    payment: true,
    rechargeList: [{
      id: 1,
      money: 6,
      bgcolor: 'white'
    }, {
      id: 2,
      money: 30,
      bgcolor: 'white'
    }, {
      id: 3,
      money: 68,
      bgcolor: 'white'
    }, {
      id: 4,
      money: 128,
      bgcolor: 'white'
    }, {
      id: 5,
      money: 328,
      bgcolor: 'white'
    }, {
      id: 6,
      money: 648,
      bgcolor: 'white'
    }]
  },
  //选择支付方式
  radioChange: function(e) {
    var that = this
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    that.setData({
      paymentMethod: e.detail.value
    })
  },
  //跳转支付页面
  purchase() {
    if (this.data.payment) {
      this.setData({
        payment: false
      })
    }
  },
  //取消支付
  cancelPurchase() {
    if (!this.data.payment) {
      this.setData({
        payment: true
      })
    }
  },
  //确认支付
  payment() {
    var that = this
    var money = that.data.money
    if (money == 0) {
      wx.showToast({
        title: '请选择充值数量',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (that.data.paymentMethod == '支付宝') {
      wx.showToast({
        title: '小程序暂不支持支付宝操作',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    var baoBean = that.data.baoBean
    that.setData({
      baoBean: baoBean + money
    })
  },
  recharge(event) {
    for (var i = 0; i < this.data.rechargeList.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.rechargeList[i].bgcolor = '#FDF0BC'
      } else {
        this.data.rechargeList[i].bgcolor = 'white'
      }
    }
    this.setData(this.data)
    this.setData({
      money: event.currentTarget.dataset.money
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      baoBean: app.user_details.baoBean
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

  },
})