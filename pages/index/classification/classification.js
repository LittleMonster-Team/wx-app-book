//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgcolor1: '#FED12D',
    //分类数据
    classificationList: [],
  },
  categoryClick(event) {
    var that = this 
    var id, text;
    // 书籍分类索引
    var itemidx = event.currentTarget.dataset.itemidx
    // 书籍类别索引
    var listidx = event.currentTarget.dataset.listidx
    // 书籍分类id
    var itemid = event.currentTarget.dataset.itemid
    // 书籍类别id
    var listid = event.currentTarget.dataset.listid
    // 书籍类别数据：
    var categoryName = event.currentTarget.dataset.value
    console.log("书籍分类索引："+itemidx)
    console.log("书籍类别索引：" +listidx)
    console.log("书籍分类id：" +itemid)
    console.log("书籍类别id：" +listid)
    console.log("书籍类别数据：" + categoryName)
    wx.navigateTo({
      url: '/pages/index/classification/alone/alone?id=' + listid + "&title=" + categoryName
    });
  },
  ageClick(event) {
    // console.log(event.currentTarget.id)
    var id, text;
    for (var i = 0; i < this.data.ageList.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.ageList[i].bgcolor = '#FDF0BC'
        id = this.data.ageList[i].id
        text = this.data.ageList[i].text
      } else {
        this.data.ageList[i].bgcolor = '#f1f1f1'
      }
    }
    this.setData(this.data)
    // console.log("id:" + id + "text:" + text)
    wx.navigateTo({
      url: '/pages/index/classification/alone/alone?id=' + id + "&title=" + text
    });
  },
  popularClick(event) {
    // console.log(event.currentTarget.id)
    var id, text;
    for (var i = 0; i < this.data.popularList.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.popularList[i].bgcolor = '#FDF0BC'
        id = this.data.popularList[i].id
        text = this.data.popularList[i].text
      } else {
        this.data.popularList[i].bgcolor = '#f1f1f1'
      }
    }
    this.setData(this.data)
    wx.navigateTo({
      url: '/pages/index/classification/alone/alone?id=' + id + "&title=" + text
    });
  },
  knowledgeClick(event) {
    // console.log(event.currentTarget.id)
    var id, text;
    for (var i = 0; i < this.data.knowledgeList.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.knowledgeList[i].bgcolor = '#FDF0BC'
        id = this.data.knowledgeList[i].id
        text = this.data.knowledgeList[i].text
      } else {
        this.data.knowledgeList[i].bgcolor = '#f1f1f1'
      }
    }
    this.setData(this.data)
    wx.navigateTo({
      url: '/pages/index/classification/alone/alone?id=' + id + "&title=" + text
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    app.api.findAllClassification({})
      .then(res => {
        let classificationList = res.data.data
        that.setData({
          classificationList: classificationList
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