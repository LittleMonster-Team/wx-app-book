// pages/user/exchange/receive_address/add_address/add_address.js
const app = getApp()
var myreg = /^1[3456789]\d{9}$/;
var pattern = /^[0-9]{6}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regions: ['全部', '全部', '全部'],
    customItem: '全部',
    name: '',
    phone: '',
    postCode: '',
    province: '',
    city: '',
    region: '',
    detailAddress: '',
    defaultStatus: false
  },
  //修改收货人名称信息
  bindKeyInput1: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //修改收货人手机号信息
  bindKeyInput2: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //修改收货人邮件编码
  bindKeyInput3: function(e) {
    this.setData({
      postCode: e.detail.value
    })
  },
  //修改收货人地址
  bindRegionChange: function(e) {
    var address = e.detail.value
    var province2 = address[0]
    var city2 = address[1]
    var region2 = address[2]
    this.setData({
      province: province2,
      city: city2,
      region: region2,
      regions: e.detail.value
    })
  },
  //修改收货人详细地址
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
    this.setData({
      detailAddress: e.detail.value
    })
  },
  //设为默认地址
  switchChange: function(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      defaultStatus: e.detail.value
    })
  },
  //新增收货地址
  addNewAddress() {
    var that = this;
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    if (that.data.name == "" || that.data.name == null) {
      wx.showToast({
        title: '收货人不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.phone == "" || that.data.phone == null) {
      wx.showToast({
        title: '收货人手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(that.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.postCode == "" || that.data.postCode == null) {
      wx.showToast({
        title: '邮政编码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!pattern.test(that.data.postCode)) {
      wx.showToast({
        title: '请输入正确的邮政编码',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.province == "" || that.data.province == null) {
      wx.showToast({
        title: '收货地址不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.detailAddress == "" || that.data.detailAddress == null) {
      wx.showToast({
        title: '收货详细地址不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      app.api.addNewAddress({
          userid: app.user.id,
          name: that.data.name,
          phone: that.data.phone,
          postCode: that.data.postCode,
          province: that.data.province,
          city: that.data.city,
          region: that.data.region,
          detailAddress: that.data.detailAddress,
          defaultStatus: that.data.defaultStatus,
        })
        .then(res => {
          wx.showToast({
            title: res.data.data,
            icon: 'none',
            duration: 1000
          })
          wx.navigateBack({
            delta: 1
          })
        })
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