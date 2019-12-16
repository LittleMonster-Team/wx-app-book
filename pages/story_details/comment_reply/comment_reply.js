//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendOutIcon: false, //评论按钮
    inputValue: '', //评论内容
    commentId: 0,
    commentReply: {},
    commentReplyList: [],
    tuid: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      commentId: options.id
    })
    that.selectCommentById()
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
  //输入评论信息
  bindKeyInput: function(e) {
    var value = e.detail.value
    // console.log(value)
    if (value.length > 0) {
      this.setData({
        sendOutIcon: true,
        inputValue: value
      })
    } else {
      this.setData({
        sendOutIcon: false,
        inputValue: value
      })
    }
  },
  //获取评论信息
  selectCommentById() {
    var that = this;
    app.api.selectCommentById({
        id: that.data.commentId
      })
      .then(res => {
        that.setData({
          commentReply: res.data.data,
          tuid: res.data.data.user.id
        })
      })

    that.selectCommentReplyByCommentId()
  },
  //获取评论列表
  selectCommentReplyByCommentId() {
    var that = this;
    app.api.selectCommentReplyByCommentId({
        id: that.data.commentId
      })
      .then(res => {
        that.setData({
          commentReplyList: res.data.data
        })
      })
  },
  //添加评论
  addCommentReply() {
    var that = this;
    app.api.addCommentReply({
        cid: that.data.commentId,
        fuid: app.user.id,
        tuid: that.data.tuid,
        content: that.data.inputValue
      })
      .then(res => {
        
        that.setData({
          inputValue: '',
          sendOutIcon: false,
        })
      })
    that.selectCommentReplyByCommentId()
  },
  //跳转到用户详情页面
  navigateToUserDetails(e) {
    wx.navigateTo({
      url: '/pages/user_details/user_details?id=' + e.currentTarget.dataset.id,
    })
  },
})