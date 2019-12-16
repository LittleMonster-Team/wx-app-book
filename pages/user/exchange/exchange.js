//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [{
        title: "专辑故事",
        id: 1
      },
      {
        title: "礼品",
        id: 2
      }
    ],
    curNav: 0,
    curIndex: 0,
    commodityList: [],
    txt2: '#fed12d',
    txt3: '#f1f1f1'

  },
  redirectTodetails(e) {
    var id = e.currentTarget.dataset.id
    var commodityId = e.currentTarget.dataset.commodityid
    wx.navigateTo({
      url: 'exchange_details/exchange_details?id=' + id + "&cid=" + commodityId
    })
  },
  getAjaxList(message) {
    var that = this
    var that = this
    app.api.findCommodityBycommodityId({
      commodityId: 1
    })
      .then(res => {
        let commodityList = res.data.data
        that.setData({
          commodityList: commodityList,
          curIndex: 1
        })
      })
    // app.api.findCommodityAll({})
    //   .then(res => {
    //     let commodityList = res.data.data
    //     that.setData({
    //       commodityList: commodityList
    //     })
    //   })
  },
  //查询所有书籍礼品
  getGiftList(e) {
    var that = this
    app.api.findCommodityBycommodityId({
      commodityId: e.currentTarget.dataset.id
    })
      .then(res => {
        let commodityList = res.data.data
        that.setData({
          commodityList: commodityList,
          curIndex: e.currentTarget.dataset.id
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.getAjaxList('正在加载数据...')
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