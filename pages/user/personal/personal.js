//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    yldrainage: {},
    customItem: '全部',
    gender: true,
    user: {}
  },
  choiceGender() {
    var sex = 'user.gender'
    if (this.data.gender) {
      this.setData({
        gender: false,
        [sex]: '女'
      })
      app.user.gender = '女'
      app.api.changedeGender({
          gender: '女',
          userid: app.user.id
        })
        .then(res => {})
    } else {
      this.setData({
        gender: true,
        [sex]: '男'
      })
      app.user.gender = '男'
      app.api.changedeGender({
          gender: '男',
          userid: app.user.id
        })
        .then(res => {})
    }

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
    var that = this;
    that.setData({
      user: app.user,
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
   * 用户选择头像
   */
  //选照片
  redirectToHeadPortrait: function() {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function(type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        console.log(res);
        var headPortrait = 'user.headPortrait'
        _this.setData({
          [headPortrait]: res.tempFilePaths[0],
        })
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.pathUserUrl + 'changeHeadPortrait', //请求数据接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test',
            userid: app.user.id
          },
          success: function(res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  },
  /**
   * 用户修改昵称
   */
  redirectToUname() {
    wx.navigateTo({
      url: 'uname/uname'
    })
  },
  /**
   * 用户修改性别
   */
  // 外面的弹窗
  redirectToGender: function() {
    this.setData({
      showModal: true
    })
  },

  // 禁止屏幕滚动
  preventTouchMove: function() {},

  // 弹出层里面的弹窗
  ok: function() {
    this.setData({
      showModal: false
    })
  },
  redirectToCity() {
    wx.navigateTo({
      url: 'city/city'
    })
  },
  /**
   * 用户修改心情语录
   */
  redirectToQuotations() {
    wx.navigateTo({
      url: 'quotations/quotations'
    })
  },
  /**
   * 用户修改详细地址
   */
  redirectToDetailedAddress() {
    wx.navigateTo({
      url: 'detailed_address/detailed_address'
    })
  },
  //查看收货地址
  redirectToReceiveAddress() {
    wx.navigateTo({
      url: '/pages/user/exchange/receive_address/receive_address'
    })
  },
})