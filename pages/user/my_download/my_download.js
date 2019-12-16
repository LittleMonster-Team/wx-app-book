//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: []
  },
  //详情
  goTodetails(e) {
    console.log(e)
    var uid = app.user.id
    var uid = app.user.id
    var bid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'mydownload-details/mydownload-details?uid=' + uid + "&bid=" + bid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
          var list = that.data.list;
          var newlist = [];
          for (var i in list) {
            var item = list[i];
            if (item.id != dataId) {
              newlist.push(item);
            }
          }
          that.setData({
            list: newlist
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    var that = this
    app.api.selectDownloadBook({
        id: app.user.id
      })
      .then(res => {
        that.setData({
          bookList: res.data.data
        })
      })
    // wx.request({
    //   url: app.pathDownloadUrl + 'selectDownloadBook',
    //   method: "POST",
    //   dataType: "json",
    //   data: {
    //     // id: 1
    //     id: app.user.id
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function(res) {
    //     // console.log(res.data.data)
    //     that.setData({
    //       bookList: res.data.data
    //     })

    //   }
    // })
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