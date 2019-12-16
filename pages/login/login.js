//获取应用实例
const app = getApp()
var timer1, timer2
//校验手机号
var myreg = /^1[3456789]\d{9}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountNumber: true, //登录与注册状态
    passwordLogin: true, //验证码登录与密码登录状态
    codename: '获取验证码', //注册
    pointerEvents: '', //按钮点击状态
    backgroundColor: '#fdd129', //按钮颜色
    codename2: '获取验证码', //登录
    pointerEvents2: '',
    backgroundColor2: '#fdd129',
    iscode: null, //用于存放验证码接口里获取到的code(注册)
    iscode2: null, //用于存放验证码接口里获取到的code(登录)
    //注册输入信息
    phone: '',
    password: '',
    vcode: '',
    //验证码登录输入信息
    phone2: '',
    vcode2: '',
    //密码登录输入信息
    phone3: '',
    password3: '',
  },
  /**
   * 注册操作
   */
  //注册输入手机号
  phoneInput(e) {
    var value = e.detail.value
    this.setData({
      phone: value,
    })
  },
  //注册输入验证码
  vcodeInput(e) {
    var value = e.detail.value
    this.setData({
      vcode: value,
    })
  },
  //注册输入密码
  passwordInput(e) {
    var value = e.detail.value
    this.setData({
      password: value,
    })
  },
  /**
   * 验证码登录操作
   */
  //登录输入手机号
  phoneInput2(e) {
    var value = e.detail.value
    this.setData({
      phone2: value,
    })
  },
  //注册输入验证码
  vcodeInput2(e) {
    var value = e.detail.value
    this.setData({
      vcode2: value,
    })
  },
  /**
   * 密码登录操作
   */
  //登录输入手机号
  phoneInput3(e) {
    var value = e.detail.value
    this.setData({
      phone3: value,
    })
  },
  //登录输入密码
  passwordInput3(e) {
    var value = e.detail.value
    this.setData({
      password3: value,
    })
  },
  /**
   * 切换登录操作
   */
  // 切换登录功能
  redirectToLogin() {
    this.setData({
      accountNumber: false
    })
  },
  // 使用密码登录
  redirectToPwd() {
    this.setData({
      passwordLogin: false
    })
  },
  // 使用验证码登录
  redirectToVerification() {
    this.setData({
      passwordLogin: true
    })
  },
  /**
   * 获取验证码功能
   */
  // 验证码注册获取验证码倒计时
  getCode1() {
    var _this = this;

    if (_this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(_this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      console.log(_this.data.phone)
      app.api.sendSms({
          phone: _this.data.phone
        })
        .then(res => {
          _this.setData({
            iscode: res.data.data.vcode
          })
          wx.showToast({
            title: res.data.data.message,
            icon: 'none',
            duration: 1000
          })
          var num = 61;
          timer1 = setInterval(function() {
            num--;
            if (num <= 0) {
              clearInterval(timer1);
              _this.setData({
                codename: '重新发送',
                pointerEvents: '',
                backgroundColor: '#fdd129',
              })

            } else {
              _this.setData({
                codename: num + "s",
                pointerEvents: 'none',
                backgroundColor: '#FDF0BC',
              })
            }
          }, 1000)
        })
    }
  },
  // 验证码登录获取验证码倒计时
  getCode2() {
    var _this = this;
    if (_this.data.phone2 == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(_this.data.phone2)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      console.log(_this.data.phone2)
      app.api.sendSms({
          phone: _this.data.phone2
        })
        .then(res => {
          _this.setData({
            iscode2: res.data.data.vcode
          })
          var num = 61;
          timer2 = setInterval(function() {
            num--;
            if (num <= 0) {
              clearInterval(timer2);
              _this.setData({
                codename2: '重新发送',
                pointerEvents2: '',
                backgroundColor2: '#fdd129',
              })

            } else {
              _this.setData({
                codename2: num + "s",
                pointerEvents2: 'none',
                backgroundColor2: '#FDF0BC',
              })
            }
          }, 1000)
        })
    }
  },
  /**
   * 获取验证码操作
   */
  //注册获取验证码
  getVerificationCode1() {
    this.getCode1();
    var _this = this
    _this.setData({
      pointerEvents: '',
      backgroundColor: '#fdd129',
    })
  },
  //验证码登录获取验证码
  getVerificationCode2() {
    this.getCode2();
    var _this = this
    _this.setData({
      pointerEvents2: '',
      backgroundColor2: '#fdd129',
    })
  },
  /**
   * 登录注册操作
   */
  //注册
  regist: function() {
    var that = this;

    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    if (that.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
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
    if (that.data.password == "") {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.vcode == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (that.data.vcode != that.data.iscode) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      console.log("手机号" + that.data.phone)
      console.log("验证码：" + that.data.vcode)
      console.log("密码：" + that.data.password)
      app.api.regist({
             phone: that.data.phone,
          vcode: that.data.vcode,
          password: that.data.password
      })
        .then(res => {
          console.log(res.data)
          if (res.data.data.code == 500) { //判断是否能正常登录
            wx.showToast({
              title: '手机号不存在或验证码错误',
              icon: 'none',
              duration: 2000
            })
            clearInterval(timer1);
            that.setData({
              phone: '',
              vcode: '',
              password: '',
              codename: '获取验证码',
              pointerEvents: '',
              backgroundColor: '#fdd129',
            })
            return false;
          } else {
            that.setData({
              accountNumber: false
            })
            wx.showToast({
              title: res.data.data,
              icon: 'none',
              duration: 2000
            })
          }
        })
    }
  },
  //验证码登录
  loginVerification() {
    var that = this;

    if (that.data.phone2 == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(that.data.phone2)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.vcode2 == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (that.data.vcode2 != that.data.iscode2) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      console.log("手机号" + that.data.phone2)
      console.log("验证码：" + that.data.vcode2)
      app.api.vLogin({
          phone: that.data.phone2,
          vcode: that.data.vcode2
        })
        .then(res => {
          console.log(res.data)
          if (res.data.code == 500) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: res.data.msg
            })
            clearInterval(timer2);
            that.setData({
              phone2: '',
              vcode2: '',
              codename2: '获取验证码',
              pointerEvents2: '',
              backgroundColor2: '#fdd129',
            })
            return false;
          } else {
            console.log("登陆成功")
            app.user.id = res.data.data.id; //设置登录用户的id，未登录为空
            app.user.phone = res.data.data.phone; //设置登录用户的手机号，未登录为空
            app.userLogStyle = true; //修改登录状态
            wx.switchTab({
              url: '/pages/user/user'
            })
            wx.showTabBar();
          }
        })

    }
  },
  // 密码登录
  loginPwd: function() {
    var that = this;
    if (that.data.phone3 == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(that.data.phone3)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.password3 == "") {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      console.log("手机号" + that.data.phone3)
      console.log("密码：" + that.data.password3)

      app.api.mLogin({
          phone: that.data.phone3,
          password: that.data.password3
        })
        .then(res => {
          app.user.id = res.data.data.id; //设置登录用户的id，未登录为空
          app.user.phone = res.data.data.phone; //设置登录用户的手机号，未登录为空
          app.userLogStyle = true; //修改登录状态
          wx.switchTab({
            url: '/pages/user/user'
          })
          wx.showTabBar();
        })
    }
  },
  //微信登录
  wxLogin() {
    wx.showLoading({
      title: '微信登录中',
    })
    setTimeout(function() {
      wx.hideLoading()
      wx.login({
        success: res => {
          // 获取到用户的 code 之后：res.code
          // console.log("用户的code:" + res.code);
          // 可以传给后台，再经过解析获取用户的 openid
          // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
          app.api.wxLogin({
            code: res.code
          }).then(res => {
            if (res.data.data.status == 1) {
              app.user.id = res.data.data.user.id
              // console.log(app.user.id)
              app.userLogStyle = true; //修改登录状态
              wx.switchTab({
                url: '/pages/user/user'
              })
              wx.showTabBar();
            } else {
              console.log("登录失败")
              wx.showModal({
                title: '提示',
                content: "当前微信号未授权",
                success(res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          })
        }
      });
    }, 2000)

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