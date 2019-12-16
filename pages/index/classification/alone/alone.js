//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    bookList:[]

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
    var that = this;
    that.setData({ //this.setData的方法用于把传递过来的id转化成小程序模板语言
      id: options.id, //id是a页面传递过来的名称，a_id是保存在本页面的全局变量   {{b_id}}方法使用
      title: options.title,
    })
    // console.log("id:" + that.data.id + "title:" + that.data.title)
    wx.setNavigationBarTitle({
      title: that.data.title
    })

    app.api.selectBookByCategory({ id: that.data.id})
      .then(res => {
        let bookList = res.data.data
        that.setData({
          bookList: bookList
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