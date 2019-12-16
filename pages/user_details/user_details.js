// pages/user-details/user-details.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [{
      id: 1,
      img: 'https://img3.doubanio.com/view/photo/l/public/p2459208314.webp',
      title: '正版泰迪熊毛绒玩具抱抱熊布娃娃小熊公仔',
      playNum: 123,
      utime: '2019-10-14'
    }, {
      id: 2,
      img: 'https://img3.doubanio.com/view/photo/l/public/p2459208314.webp',
      title: '正版泰迪熊毛绒玩具抱抱熊布娃娃小熊公仔',
      playNum: 123,
      utime: '2019-10-14'
    }, {
      id: 3,
      img: 'https://img3.doubanio.com/view/photo/l/public/p2459208314.webp',
      title: '正版泰迪熊毛绒玩具抱抱熊布娃娃小熊公仔',
      playNum: 123,
      utime: '2019-10-14'
    }, {
      id: 4,
      img: 'https://img3.doubanio.com/view/photo/l/public/p2459208314.webp',
      title: '正版泰迪熊毛绒玩具抱抱熊布娃娃小熊公仔',
      playNum: 123,
      utime: '2019-10-14'
    }],
    user: {},
    userSpecificInformation: {},
    tuId: 0,
    followShow: true,
    followStyle: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      tuId: options.id
    })
    if (options.id == app.user.id) {
      that.setData({
        followShow: false
      })
    }
    app.api.getUserInformation({
        userid: options.id
      })
      .then(res => {
        that.setData({
          user: res.data.data.entity1,
          userSpecificInformation: res.data.data.entity2,
        })
      })
    that.selectFollowStyle();
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
  //查询当前用户是否关注
  selectFollowStyle() {
    var that = this;
    app.api.selectFollowStyle({
      fuId: app.user.id,
      tuId: that.data.tuId
    }).then(res => {
      if (res.data.data.code == 0) {
        that.setData({
          followStyle: false
        })
      } else {
        that.setData({
          followStyle: true
        })
      }

    })
  },
  //关注用户
  followUser() {
    var that = this;
    app.api.followUser({
        fuId: app.user.id,
        tuId: that.data.tuId
      })
      .then(res => {
        that.setData({
          followStyle: false
        })
      })
  },
  //取消关注
  cancelFollowUser() {
    var that = this;
    app.api.cancelFollowUser({
        fuId: app.user.id,
        tuId: that.data.tuId
      })
      .then(res => {
        that.setData({
          followStyle: true
        })
      })
  }
})