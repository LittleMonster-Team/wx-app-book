// pages/find/find.js
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deleteIcon: false,
    inputValue: '',
    user: {},
    //用户登录状态
    userLogStyle: false,
    findList: [],
    danmuList: [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }
    ],
    video_id: '',
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

  findComment() {
    wx.navigateTo({
      url: 'find_comment/find_comment'
    })
  },
  videoPlay: function(e) {
    console.log(e);
    // 本视频id
    var id = e.currentTarget.id;
    // 上个一视频id
    var prev_id = this.data.video_id;
    // 停止上一个视频播放
    wx.createVideoContext(prev_id).stop();
    this.setData({
      video_id: id
    })
    // 延迟500ms，再播放本视频
    // setTimeout(function() {
    //   wx.createVideoContext(id).play();
    // }, 1500)
  },
  //获取书籍数据
  getAjaxList(message) {
    var that = this
    wx.showNavigationBarLoading() //在当前页面显示导航条加载动画
    wx.showLoading({ //显示 loading 提示框
      title: message,
    })
    wx.request({
      url: 'https://api.apiopen.top/getJoke?page=1&count=10&type=video', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideNavigationBarLoading() //在当前页面隐藏导航条加载动画
        wx.hideLoading() //隐藏 loading 提示框
        if (res.statusCode == 200) {
          that.setData({
            findList: res.data.result
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
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
    var that = this
    that.setData({
      userLogStyle: app.userLogStyle,
      user: app.user
    })
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
   * 跳转到登录页面
   */
  redirectToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  //跳转到用户详情页面
  navigateToUserDetails() {
    wx.navigateTo({
      url: '/pages/user_details/user_details?id=' + app.user.id,
    })
  },
})