// pages/find/find_comment/find_comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deleteIcon: false,
    inputValue: '',
    username: '登录',
    findCommentList: [1, 2, 3]
  },
  bindKeyInput: function(e) {
    var value = e.detail.value
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
      deleteIcon: false,
      inputValue: ''
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
  /**
 * 跳转到用户页面
 */
  redirectToUser() {
    wx.switchTab({
      url: '/pages/user/user'
    })
  },
  redirectToUserDetails(){
    wx.navigateTo({
      url: '/pages/user_details/user_details'
    })
  }
})