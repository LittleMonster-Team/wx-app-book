//获取应用实例
const app = getApp()
var mdata = require('../../utils/music.js');
var innerAudioContext = wx.createInnerAudioContext()
var playing = false
var areaWidth //播放进度滑块移动区域宽度
var viewWidth //播放进度滑块宽度
var lastTime //滑块移动间隔计算
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailsIntroduceList: [{ //选择信息按钮
      id: 1,
      text: '简介',
      bgcolor: '#fed12d'
    }, {
      id: 2,
      text: '音频',
      bgcolor: 'white'
    }, {
      id: 3,
      text: '评论',
      bgcolor: 'white'
    }],
    introduce: "简介", //选择信息按钮内容
    animationData: {}, //图片样式,用户播放时旋转
    degrees: 0, //图片旋转角度
    user: {}, //用户信息
    book: {}, //书籍信息
    bookId: 0, //书籍id
    score1: '', //后端给的分数,显示相应的星星
    score2: '', //灰色评分数
    subscribeStatus: true, //订阅状态
    sendOutIcon: false, //评论按钮
    inputValue: '', //评论内容
    findCommentList: [], //评论列表
    showModal: true, //播放章节列表显示状态
    chapterList: [], //播放章节列表
    indexs: 0, //播放章节索引
    voice: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.id)
    var that = this
    that.setData({
      bookId: options.id
    })
    var item = that.data.detailsIntroduceList[2].text
    var text = 'detailsIntroduceList[' + 2 + '].text';
    app.api.selectBookById({
        id: options.id
      })
      .then(res => {
        that.setData({
          user: app.user,
          book: res.data.data,
          score1: res.data.data.score * 1,
          score2: 5 - res.data.data.score,
          [text]: item + res.data.data.bookCommentNum,
          chapterList: res.data.data.chapterList,
        })
      })
    that.addToPlay()
    that.selectCommentByBookId()
    that.selectSubscribeStatus()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    that.reload(that.data.indexs);

    innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = that.data.voice.play_url
    //播放
    console.log("播放-->", that.data.voice.play_url)
    innerAudioContext.obeyMuteSwitch = true //是否遵循系统静音开关
    innerAudioContext.autoplay = false //是否自动开始播放
    innerAudioContext.onPlay(() => {
      console.log('播放')
      playing = true
      that.data.voice.tip = "Playing"
      that.data.voice.playing = true
      that.data.voice.canPlay = true //加载完成后可以
      that.setData({
        voice: that.data.voice
      })
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })
      this.animation = animation
      this.setData({
        animationData: animation.export()
      })
      //连续动画需要添加定时器,所传参数每次+1就行
      this.timeInterval = setInterval(function() {
        var n = this.data.degrees
        n = n + 1;
        this.animation.rotate(10 * (n)).step()
        this.setData({
          animationData: this.animation.export(),
          degrees: n
        })
      }.bind(this), 100)
    })
    innerAudioContext.onStop(() => {
      console.log('停止')
      playing = false
      that.data.voice.tip = "Stop"
      that.data.voice.playing = false
      that.setData({
        voice: that.data.voice
      })
      if (that.timeInterval > 0) {
        clearInterval(that.timeInterval)
        that.timeInterval = 0
      }
    })
    innerAudioContext.onPause(() => {
      console.log('暂停')
      playing = false
      that.data.voice.tip = "Pause"
      that.data.voice.playing = false
      that.setData({
        voice: that.data.voice
      })
      if (that.timeInterval > 0) {
        clearInterval(that.timeInterval)
        that.timeInterval = 0
      }
    })
    //播放进度
    innerAudioContext.onTimeUpdate(() => {
      that.data.voice.progress = Math.round(100 * innerAudioContext.currentTime / innerAudioContext.duration)
      that.data.voice.time = dateformat(Math.round(innerAudioContext.currentTime))
      that.data.voice.margin = Math.round((areaWidth - viewWidth) * (innerAudioContext.currentTime / innerAudioContext.duration))
      //计算当前滑块margin-left
      // console.log('进度', innerAudioContext.currentTime + "  " + innerAudioContext.duration)
      that.setData({
        voice: that.data.voice
      })
    })
    //播放结束
    innerAudioContext.onEnded(() => {
      console.log("onEnded")
      playing = false
      that.data.voice.progress = 100
      that.data.voice.tip = "End Playing"
      that.data.voice.playing = false
      that.data.voice.time = dateformat(Math.round(innerAudioContext.duration))
      that.data.voice.margin = Math.round(areaWidth - viewWidth)
      that.setData({
        voice: that.data.voice
      })

    })
    //播放错误
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
      playing = false
      that.data.voice.tip = "Error Playing"
      that.data.voice.playing = false
      that.setData({
        voice: that.data.voice
      })
      wx.showToast({
        title: '错误:' + res.errMsg,
        icon: "none"
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.selectCommentByBookId()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

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
  //跳转到用户详情页面
  navigateToUserDetails(e) {
    wx.navigateTo({
      url: '/pages/user_details/user_details?id=' + e.currentTarget.dataset.id,
    })
  },
  //查询当前图书是否订阅
  selectSubscribeStatus() {
    var that = this;
    app.api.selectSubscribeStatus({
        bookId: that.data.bookId,
        userId: app.user.id
      })
      .then(res => {
        if (res.data.data.code == 0) {
          that.setData({
            subscribeStatus: false
          })
        } else {
          that.setData({
            subscribeStatus: true
          })
        }

      })
  },
  //订阅图书
  subscribeBook() {
    var that = this;
    app.api.subscribeBook({
        bookId: that.data.bookId,
        userId: app.user.id
      })
      .then(res => {
        that.setData({
          subscribeStatus: false
        })
      })
  },
  //取消图书订阅
  cancelSubscribeBook() {
    var that = this;
    app.api.cancelSubscribeBook({
        bookId: that.data.bookId,
        userId: app.user.id
      })
      .then(res => {
        that.setData({
          subscribeStatus: true
        })
      })
  },
  //添加评论
  addComment() {
    var that = this;
    app.api.addComment({
        bookId: that.data.bookId,
        fuid: app.user.id,
        content: that.data.inputValue
      })
      .then(res => {
        that.setData({
          inputValue: '',
          sendOutIcon: false,
        })
      })
    that.selectCommentByBookId()
  },
  //获取评论列表
  selectCommentByBookId() {
    var that = this;
    app.api.selectCommentByBookId({
        bookId: that.data.bookId
      })
      .then(res => {
        that.setData({
          findCommentList: res.data.data
        })
      })
  },
  //添加进最近播放列表
  addToPlay() {
    var that = this;
    app.api.addToPlay({
        userId: app.user.id,
        bookId: that.data.bookId
      })
      .then(res => {})
  },
  //回复评论
  commentReply(e) {
    wx.navigateTo({
      url: '/pages/story_details/comment_reply/comment_reply?id=' + e.currentTarget.dataset.id,
    })
  },
  //评论点赞
  commentFabulous(e) {
    var that = this;
    app.api.judgeFabulousStatus({
        userId: app.user.id,
        commentId: e.currentTarget.dataset.id
      })
      .then(res => {
        wx.showToast({
          title: res.data.data,
          icon: 'none',
          duration: 2000
        })
      })
    that.selectCommentByBookId()

  },

  //改变展示页面
  recharge(event) {
    var introduceText;
    for (var i = 0; i < this.data.detailsIntroduceList.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.detailsIntroduceList[i].bgcolor = '#fed12d'
        introduceText = this.data.detailsIntroduceList[i].text
      } else {
        this.data.detailsIntroduceList[i].bgcolor = 'white'
      }
    }
    this.setData(this.data)
    this.setData({
      introduce: introduceText
    })
    //第一次进来应该获取节点信息，用来计算滑块长度
    if (areaWidth == undefined || areaWidth == null || viewWidth == undefined || viewWidth == null) {
      var query = wx.createSelectorQuery()
      setTimeout(function() { //代码多的情况下需要延时执行，否则可能获取不到节点信息
        //获取movable的宽度，计算改变进度使用
        query.select('#movable-area').boundingClientRect(function(rect) {
          areaWidth = rect.width
          console.log("areaWidth------->", areaWidth)
        }).exec()
        query.select('#movable-view').boundingClientRect(function(rect) {
          viewWidth = rect.width // 节点的宽度
          console.log("viewWidth------->", viewWidth)
        }).exec()
      }, 1000)
    }

  },
  //修改播放列表样式
  modifyColor(event) {
    for (var i = 0; i < this.data.chapterList.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.chapterList[i].textcolor = '#CC1601'
        this.data.chapterList[i].yinpin = true
      } else {
        this.data.chapterList[i].textcolor = '656565'
        this.data.chapterList[i].yinpin = false
      }
    }
    this.setData(this.data)
  },

  // 打开播放列表/外面的弹窗
  openList: function() {
    this.setData({
      showModal: false
    })
  },

  // 禁止屏幕滚动
  preventTouchMove: function() {},

  // 关闭播放列表/外面的弹窗
  closeWindow: function() {
    this.setData({
      showModal: true
    })
  },
  //播放
  playItem(e) {
    console.log(e.currentTarget.dataset.id)
    wx.switchTab({
      url: '/pages/story_details/play/play'
    })
    app.songid = e.currentTarget.dataset.id
  },
  //下载
  delItem() {
    console.log("下载")
  },
  //初始化数据
  reload: function(index) {
    var hash = mdata.localData[index];
    this.setData({
      chapterName: hash.song_name,
      durationText: hash.seconds,
      voice: hash
    });
  },
  //上一首
  prevEvent: function(e) {
    innerAudioContext.stop()
    var music = this.data.indexs
    if (Number(music) == 0) {
      wx.showToast({
        title: '当前已为第一章',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    var index = Number(music) - 1
    this.setData({
      indexs: index
    })
    this.reload(index);
    this.onReady();
  },
  //下一首
  nextEvent: function(e) {
    innerAudioContext.stop()
    var music = this.data.indexs
    var index = Number(music) + 1
    this.setData({
      indexs: index
    })
    this.reload(index);
    this.onReady();
  },
  //播放/暂停
  actionEvent: function() {
    var playing2 = this.data.voice.playing
    if (playing2) {
      innerAudioContext.pause()
    } else {
      innerAudioContext.play()
    }
  },

  //移动音频滑块，此处不能设置moveable-view 的x值，会有冲突延迟
  voiceSeekMove: function(e) {
    var that = this
    if (e.detail.source == "touch") {
      innerAudioContext.stop()
      // console.log(e)
      if (that.data.voice.canPlay) {
        var progress = Math.round(e.detail.x / (areaWidth - viewWidth) * 100)
        that.data.voice.progress = progress
        that.data.voice.margin = e.detail.x
        that.data.voice.time = dateformat(Math.round(innerAudioContext.duration * (that.data.voice.progress / 100)))
      }
    }
  },
  //移动结束再setData，否则真机上会产生 “延迟重放” 
  seekTouchEnd: function(e) {
    var that = this
    setTimeout(function() {
      that.setData({
        voice: that.data.voice
      })
      innerAudioContext.seek(innerAudioContext.duration * (that.data.voice.progress / 100))
      // innerAudioContext.play()
    }, 300)
  },


})

function dateformat(second) {
  //天
  var day = Math.floor(second / (3600 * 24))
  // 小时位
  var hour = Math.floor((second - day * 3600 * 24) / 3600);
  // 分钟位
  var min = Math.floor((second - day * 3600 * 24 - hour * 3600) / 60);
  // 秒位
  var sec = (second - day * 3600 * 24 - hour * 3600 - min * 60); // equal to => var sec = second % 60;

  return {
    'day': day,
    'hour': p(hour),
    'min': p(min),
    'sec': p(sec)
  }
}
//创建补0函数
function p(s) {
  return s < 10 ? '0' + s : s;
}