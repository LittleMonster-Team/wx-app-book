//app.js
import __config from './config/env'
import api from './utils/api'
App({
  api: api,
  globalData: {
    userInfo: null,
    global_bac_audio_manager: {
      manage: wx.getBackgroundAudioManager(),
      is_play: false,
      id: '',
      play_time: '',
      article_id: '',
    }
  },
  onLaunch: function() {
    //检测新版本
    this.updateManager()
    //云开发环境初始化
    wx.cloud.init({
      env: "yidoutushu-yidouxx"
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  updateManager() {
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
  },

  /**
   * 跳转到故事详情页面
   */
  redirectToDetails(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/story_details/story_details?id=' + id
    })
  },
  //用户信息
  user: {},
  //用户详细信息
  user_details: {},
  //用户登录状态
  // userLogStyle: true,
  userLogStyle: false,
  //当前播放id
  songid: 0
})