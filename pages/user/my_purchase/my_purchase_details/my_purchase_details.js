//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var uid = options.uid
    var bid = options.bid
    var that = this
    app.api.selectPurchaseBookChapter({
        userid: uid,
        bookid: bid
      })
      .then(res => {
        that.setData({
          detailsList: res.data.data
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

  },
  //删除item
  delItem: function(e) {
    console.log(e.currentTarget.dataset.id)
    var that = this;
    wx.showModal({
      title: '提示',
      content: '你确定要删除吗？',
      success(res) {
        if (res.confirm) {
          var dataId = e.currentTarget.dataset.id;
          var list = that.data.detailsList;
          var newlist = [];
          for (var i in list) {
            var item = list[i];
            if (item.id != dataId) {
              newlist.push(item);
            }
          }
          that.setData({
            detailsList: newlist
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
})