//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankingList: [],
    bgcolor1: '#FED12D',
    bgcolor2: '',
    bgcolor3: '',
  },
  selectGuoxueBook() {
    var that = this
    app.api.selectGuoxueBook({})
      .then(res => {
        let rankingList = res.data.data
        that.setData({
          rankingList: rankingList,
          bgcolor1: '#FED12D',
          bgcolor2: '',
          bgcolor3: ''
        })
      })
  },
  selectGushiciBook() {
    var that = this
    app.api.selectGushiciBook({})
      .then(res => {
        let rankingList = res.data.data
        that.setData({
          rankingList: rankingList,
          bgcolor1: '',
          bgcolor2: '#FED12D',
          bgcolor3: ''
        })
      })
  },
  selectYishuBook() {
    var that = this
    app.api.selectYishuBook({})
      .then(res => {
        let rankingList = res.data.data
        that.setData({
          rankingList: rankingList,
          bgcolor1: '',
          bgcolor2: '',
          bgcolor3: '#FED12D'
        })
      })
  },
  /**
   * 跳转到故事详情页面
   */
  redirectToDetails(e) {
    app.redirectToDetails(e)
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
    this.selectGuoxueBook()
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