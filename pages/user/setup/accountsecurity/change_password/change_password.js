//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwordIcon: false,
    password: '',
    newPasswordIcon: false,
    newPassword: '',
    confirmPasswordIcon: false,
    confirmPassword: '',
  },
  bindpasswordInput: function(e) {
    var value = e.detail.value
    if (value.length > 0) {
      this.setData({
        passwordIcon: true,
        password: value
      })
    } else {
      this.setData({
        passwordIcon: false,
        password: value
      })
    }

  },
  passwordClick() {
    console.log(this.data.password)
    this.setData({
      passwordIcon: false,
      password: ''
    })
  },
  bindnewPasswordInput: function(e) {
    var value = e.detail.value
    if (value.length > 0) {
      this.setData({
        newPasswordIcon: true,
        newPassword: value
      })
    } else {
      this.setData({
        newPasswordIcon: false,
        newPassword: value
      })
    }

  },
  newPasswordClick() {
    console.log(this.data.newPassword)
    this.setData({
      newPasswordIcon: false,
      newPassword: ''
    })
  },
  bindconfirmPasswordInput: function(e) {
    var value = e.detail.value
    if (value.length > 0) {
      this.setData({
        confirmPasswordIcon: true,
        confirmPassword: value
      })
    } else {
      this.setData({
        confirmPasswordIcon: false,
        confirmPassword: value
      })
    }

  },
  confirmPasswordClick() {
    console.log(this.data.confirmPassword)
    this.setData({
      confirmPasswordIcon: false,
      confirmPassword: ''
    })
  },
  confirmBtn() {
    var that = this;
    if (that.data.password == "") {
      wx.showToast({
        title: '原密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.newPassword == "") {
      wx.showToast({
        title: '新密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.confirmPassword == "") {
      wx.showToast({
        title: '确认密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.newPassword != that.data.confirmPassword) {
      wx.showToast({
        title: '两次密码不相同',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      console.log("原密码：" + that.data.password)
      console.log("新密码：" + that.data.newPassword)
      console.log("确认密码：" + that.data.confirmPassword)
      app.api.changedePwd({
          password: that.data.password,
          userId: app.user.id,
          newPassword: that.data.newPassword
        })
        .then(res => {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 1000
          })
          wx.redirectTo({
            url: '/pages/login/login',
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

  },
})