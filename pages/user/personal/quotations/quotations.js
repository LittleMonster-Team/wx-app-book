//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deleteIcon: false,
    inputValue: ''
  },
  bindKeyInput: function(e) {
    var value = e.detail.value
    console.log()
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
  iconClick() {
    console.log(this.data.inputValue)
    this.setData({
      inputValue: '',
      deleteIcon: false,
    })
  },
  changeQuotations() {
    var value = this.data.inputValue
    app.api.changeQuotations({
        quotations: value,
        userid: app.user.id
      })
      .then(res => {
        wx.navigateBack({
          delta: 1
        })
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
    that.setData({
      inputValue: app.user.quotations
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