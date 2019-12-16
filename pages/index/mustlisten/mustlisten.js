//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chengyuList: [],
    shuiqianList: [],
    anquanList: [],
  },
  /**
   * 跳转到故事详情页面
   */
  redirectToDetails(e) {
    app.redirectToDetails(e)
  },
  //成语故事列表
  selectChengyuBook() {
    var that = this
    app.api.selectChengyuBook({})
      .then(res => {
        let chengyuList = res.data.data
        that.setData({
          chengyuList: chengyuList
        })
      })
  },
  //睡前故事列表
  selectShuiqianBook() {
    var that = this
    app.api.selectShuiqianBook({})
      .then(res => {
        let shuiqianList = res.data.data
        that.setData({
          shuiqianList: shuiqianList
        })
      })
  },
  //安全教育列表
  selectAnquanBook() {
    var that = this
    app.api.selectAnquanBook({})
      .then(res => {
        let anquanList = res.data.data
        that.setData({
          anquanList: anquanList
        })
      })
  },
  //跳转到成语故事列表
  chengyuUrl() {
    wx.navigateTo({
      url: '/pages/index/classification/alone/alone?id=' + 8 + '&title=' + '成语故事'
    });
  },
  //跳转到睡前故事列表
  shuiqianUrl() {
    wx.navigateTo({
      url: '/pages/index/classification/alone/alone?id=' + 4 + '&title=' + '睡前故事'
    });
  },
  //跳转到安全教育列表
  anquanUrl() {
    wx.navigateTo({
      url: '/pages/index/classification/alone/alone?id=' + 17 + '&title=' + '安全教育'
    });
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
    this.selectChengyuBook()
    this.selectShuiqianBook()
    this.selectAnquanBook()
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