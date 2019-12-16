//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayBookList: [],
    yesterdayBookList: [],
    earlierBookList: [],

  },
  /**
   * 跳转到故事详情页面
   */
  redirectToDetails(e) {
    app.redirectToDetails(e)
  },
  //查询今日播放
  selectTodayBook() {
    var that = this

    app.api.selectTodayBook({
        id: app.user.id
      })
      .then(res => {
        that.setData({
          todayBookList: res.data.data
        })
      })
  },
  //查询昨日播放
  selectYesterdayBook() {
    var that = this
    app.api.selectYesterdayBook({
        id: app.user.id
      })
      .then(res => {
        that.setData({
          yesterdayBookList: res.data.data
        })
      })
  },
  //查询更早播放
  selecEarlierBook() {
    var that = this
    app.api.selecEarlierBook({
        id: app.user.id
      })
      .then(res => {
        that.setData({
          earlierBookList: res.data.data
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
    this.selectTodayBook()
    this.selectYesterdayBook()
    this.selecEarlierBook()
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