import __config from '../config/env'

const request = (url, method, data, showLoading, contentType) => {
  let _url = __config.basePath + url
  return new Promise((resolve, reject) => {
    if (showLoading) {
      wx.showNavigationBarLoading()
      wx.showLoading({
        title: '加载中',
      })
    }
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'content-type': contentType
      },
      success(res) {
        // console.log(res)
        if (res.statusCode == 200) {
          if (res.data.code == 10002) {
            wx.redirectTo({
              url: '/pages/login/login'
            })
            wx.showToast({
              title: '当前微信号/手机号已授权注册',
              icon: 'none',
              duration: 5000
            })
            reject()
          }
          if (res.data.code != 10002 && res.data.code != 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 5000
            })
            reject()
          }
          resolve(res)
        } else if (res.statusCode == 404) {
          wx.showToast({
            title: '接口请求出错，请检查手机网络',
            icon: 'none',
            duration: 5000
          })
          reject()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 5000
          })
          reject()
        }
      },
      fail(error) {
        wx.showToast({
          title: '接口请求出错',
          icon: 'none',
          duration: 2000
        })
        reject(error)
      },
      complete(res) {
        // 加载完成
        if (showLoading) {
          wx.hideNavigationBarLoading() //在当前页面隐藏导航条加载动画
          wx.hideLoading() //隐藏 loading 提示框
        }
      }
    })
  }).catch((e) => {});
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function(callback) {
  var Promise = this.constructor;
  return this.then(
    function(value) {
      Promise.resolve(callback()).then(
        function() {
          return value;
        }
      );
    },
    function(reason) {
      Promise.resolve(callback()).then(
        function() {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request,
  /**
   * 微信注册授权
   */
  wxEmpower: (data) => {
    return request('/renren-admin/boby_book/wxlogin/wxEmpower', 'GET', data, false, 'application/json')
  },
  /**
   * 微信登录
   */
  wxLogin: (data) => {
    return request('/renren-admin/boby_book/wxlogin/wxLogin', 'GET', data, false, 'application/json')
  },
  /**
   * 用户注册时发送短信验证码
   */
  sendSms: (data) => {
    return request('/renren-admin/boby_book/login/sendSms', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 用户手机号注册
   */
  regist: (data) => {
    return request('/renren-admin/boby_book/login/regist', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 验证码登录
   */
  vLogin: (data) => {
    return request('/renren-admin/boby_book/login/vLogin', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 密码登录
   */
  mLogin: (data) => {
    return request('/renren-admin/boby_book/login/mLogin', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 测试发送订单消息
   */
  sendSubscribeMsg: (data) => {
    return request('/renren-admin/boby_book/weChat/sendSubscribeMsg', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 获取所有图书信息
   */
  findBookAll: (data) => {
    return request('/renren-admin/boby_book/book/findAll', 'POST', data, true, 'application/x-www-form-urlencoded')
  },
  /**
   * 根据id查询图书信息
   */
  selectBookById: (data) => {
    return request('/renren-admin/boby_book/book/selectBookById', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询每日推荐信息
   */
  selectNewestBook: (data) => {
    return request('/renren-admin/boby_book/book/selectNewestBook', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询成语故事列表
   */
  selectChengyuBook: (data) => {
    return request('/renren-admin/boby_book/book/selectChengyuBook', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询睡前故事列表
   */
  selectShuiqianBook: (data) => {
    return request('/renren-admin/boby_book/book/selectShuiqianBook', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询安全教育列表
   */
  selectAnquanBook: (data) => {
    return request('/renren-admin/boby_book/book/selectAnquanBook', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询国学榜单
   */
  selectGuoxueBook: (data) => {
    return request('/renren-admin/boby_book/book/selectGuoxueBook', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询古诗词榜单
   */
  selectGushiciBook: (data) => {
    return request('/renren-admin/boby_book/book/selectGushiciBook', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询艺术榜单
   */
  selectYishuBook: (data) => {
    return request('/renren-admin/boby_book/book/selectYishuBook', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 根据分类id查询图书信息
   */
  selectBookByCategory: (data) => {
    return request('/renren-admin/boby_book/book/selectBookByCategory', 'POST', data, true, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询当前图书是否订阅
   */
  selectSubscribeStatus: (data) => {
    return request('/renren-admin/boby_book/book/selectSubscribeStatus', 'POST', data, true, 'application/x-www-form-urlencoded')
  },
  /**
   * 图书订阅
   */
  subscribeBook: (data) => {
    return request('/renren-admin/boby_book/book/subscribeBook', 'POST', data, true, 'application/x-www-form-urlencoded')
  },
  /**
   * 取消图书订阅
   */
  cancelSubscribeBook: (data) => {
    return request('/renren-admin/boby_book/book/cancelSubscribeBook', 'POST', data, true, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询所有书分类
   */
  findAllClassification: (data) => {
    return request('/renren-admin/boby_book/classification/findAllClassification', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 根据id查询图书评论信息
   */
  selectCommentByBookId: (data) => {
    return request('/renren-admin/boby_book/bookcomment/selectCommentByBookId', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 添加评论
   */
  addComment: (data) => {
    return request('/renren-admin/boby_book/bookcomment/addComment', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 添加评论回复
   */
  addCommentReply: (data) => {
    return request('/renren-admin/boby_book/bookcomment/addCommentReply', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 根据评论id查询评论信息
   */
  selectCommentById: (data) => {
    return request('/renren-admin/boby_book/bookcomment/selectCommentById', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 根据id查询图书评论回复信息
   */
  selectCommentReplyByCommentId: (data) => {
    return request('/renren-admin/boby_book/bookcomment/selectCommentReplyByCommentId', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 根据评论id判断点赞状态，根据状态进行不同的操作
   */
  judgeFabulousStatus: (data) => {
    return request('/renren-admin/boby_book/bookfabulous/judgeFabulousStatus', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 获取所有兑换商品信息
   */
  findCommodityAll: (data) => {
    return request('/renren-admin/boby_book/skuinfo/findAll', 'POST', data, true, 'application/x-www-form-urlencoded')
  },
  /**
   * 根据id查询所有礼品
   */
  findCommodityBycommodityId: (data) => {
    return request('/renren-admin/boby_book/skuinfo/findCommodityBycommodityId', 'POST', data, true, 'application/x-www-form-urlencoded')
  },
  /**
   * 根据id查询礼品信息
   */
  selectCommodityById: (data) => {
    return request('/renren-admin/boby_book/skuinfo/selectCommodityById', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 根据id查询评论信息
   */
  selectNewestComment: (data) => {
    return request('/renren-admin/boby_book/comment/selectNewestComment', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 生成交易码
   */
  genTradeCode: (data) => {
    return request('/renren-admin/boby_book/order/genTradeCode', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 提交订单
   */
  submitOrder: (data) => {
    return request('/renren-admin/boby_book/order/submitOrder', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 取消/删除订单
   */
  cancelOrder: (data) => {
    return request('/renren-admin/boby_book/order/cancelOrder', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 付款
   */
  payment: (data) => {
    return request('/renren-admin/boby_book/order/payment', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询登录用户所有订单
   */
  findAllOrder: (data) => {
    return request('/renren-admin/boby_book/order/findAllOrder', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 根据用户id查询已兑换商品
   */
  selectGiftByUserId: (data) => {
    return request('/renren-admin/boby_book/gift/selectGiftByUserId', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询用户所有收货地址信息
   */
  getReceiveAddressList: (data) => {
    return request('/renren-admin/boby_book/user_receive_address/getReceiveAddressList ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 我的默认收货地址
   */
  getReceiveAddress: (data) => {
    return request('/renren-admin/boby_book/user_receive_address/getReceiveAddress ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 新增收货地址
   */
  addNewAddress: (data) => {
    return request('/renren-admin/boby_book/user_receive_address/addNewAddress ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 根据id查询收货地址信息
   */
  selectReceiveAddress: (data) => {
    return request('/renren-admin/boby_book/user_receive_address/selectReceiveAddress ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 修改收货地址
   */
  updateAddress: (data) => {
    return request('/renren-admin/boby_book/user_receive_address/updateAddress ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 添加入播放列表
   */
  addToPlay: (data) => {
    return request('/renren-admin/boby_book/play/addToPlay', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询今日播放
   */
  selectTodayBook: (data) => {
    return request('/renren-admin/boby_book/play/selectTodayBook ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询昨日播放
   */
  selectYesterdayBook: (data) => {
    return request('/renren-admin/boby_book/play/selectYesterdayBook ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询更早播放
   */
  selecEarlierBook: (data) => {
    return request('/renren-admin/boby_book/play/selecEarlierBook ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询我的收藏
   */
  selectCollectionBook: (data) => {
    return request('/renren-admin/boby_book/collection/selectCollectionBook ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询我已下载的书籍
   */
  selectDownloadBook: (data) => {
    return request('/renren-admin/boby_book/download/selectDownloadBook ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询我已下载的书籍的章节
   */
  selectDownloadBookChapter: (data) => {
    return request('/renren-admin/boby_book/download/selectDownloadBookChapter ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询我已购买的书籍
   */
  selectPurchaseBook: (data) => {
    return request('/renren-admin/boby_book/purchase/selectPurchaseBook ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询我已购买的书籍的章节
   */
  selectPurchaseBookChapter: (data) => {
    return request('/renren-admin/boby_book/purchase/selectPurchaseBookChapter ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 获取用户信息
   */
  getUserInformation: (data) => {
    return request('/renren-admin/boby_book/user/getUserInformation ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 修改头像
   */
  changeHeadPortrait: (data) => {
    return request('/renren-admin/boby_book/user/changeHeadPortrait ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 用户修改昵称
   */
  changeUserName: (data) => {
    return request('/renren-admin/boby_book/user/changeUserName ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 用户修改语录
   */
  changeQuotations: (data) => {
    return request('/renren-admin/boby_book/user/changeQuotations ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 用户修改地区
   */
  changeRegional: (data) => {
    return request('/renren-admin/boby_book/user/changeRegional ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 用户修改详细地址
   */
  changedeTailedAddress: (data) => {
    return request('/renren-admin/boby_book/user/changedeTailedAddress ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 用户修改性别
   */
  changedeGender: (data) => {
    return request('/renren-admin/boby_book/user/changedeGender ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 用户修改密码
   */
  changedePwd: (data) => {
    return request('/renren-admin/boby_book/user/changedePwd ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询当前用户是否关注
   */
  selectFollowStyle: (data) => {
    return request('/renren-admin/boby_book/user/selectFollowStyle ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 关注用户
   */
  followUser: (data) => {
    return request('/renren-admin/boby_book/user/followUser ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 取消关注
   */
  cancelFollowUser: (data) => {
    return request('/renren-admin/boby_book/user/cancelFollowUser ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 用户打开签到页面
   */
  openSignIn: (data) => {
    return request('/renren-admin/boby_book/signin/openSignIn ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 获取今天星期几
   */
  updateSignInState: (data) => {
    return request('/renren-admin/boby_book/signin/updateSignInState ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 用户签到,添加签到天数
   */
  updateSignInNum: (data) => {
    return request('/renren-admin/boby_book/signin/updateSignInNum ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 发送签到消息
   */
  sendSignInMsg: (data) => {
    return request('/renren-admin/boby_book/weChat/sendSignInMsg ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询用户所有关注信息
   */
  selectFollow: (data) => {
    return request('/renren-admin/boby_book/follow/selectFollow ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
  /**
   * 查询用户所有粉丝信息
   */
  selectFans: (data) => {
    return request('/renren-admin/boby_book/fans/selectFans ', 'POST', data, false, 'application/x-www-form-urlencoded')
  },
}