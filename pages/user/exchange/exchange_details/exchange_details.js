//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    showModal: false,
    showModal2: false,
    total1: 0,
    price1: 0,
    total2: 0,
    price2: 0,
    purchaseQuantity: 1,
    //商品信息
    commodity: {},
    //商品图片
    skuImageList: [],
    //商品销售属性
    saleattr: [],
    //商品平台属性
    skuAttrValueList: [],
    //json数据
    jsonStr: '',
    //最新商品评论信息
    comment: {},
    //商品评论信息
    commentList: {},
    //商品id
    giftid: 0,
  },
  /**
   * 生成交易码
   */
  genTradeCode() {
    var that = this
    app.api.genTradeCode({
      userid: app.user.id
    }).then(res => {
      wx.redirectTo({
        url: '/pages/user/exchange/order/order?skuid=' + that.data.giftid + '&userid=' + app.user.id + '&purchaseQuantity=' + that.data.purchaseQuantity + '&payamount=' + that.data.total2 + '&tradeCode=' + res.data.data
      })
    })
  },
  // 选择颜色的弹窗
  colorClassification: function() {
    this.setData({
      showModal: true
    })
  },
  // 关闭选择颜色的弹窗
  closeColorClassification: function() {
    this.setData({
      showModal: false
    })
  },
  // 查看参数的弹窗
  parameter: function() {
    this.setData({
      showModal2: true
    })
  },

  // 关闭查看参数的弹窗
  closeParameter: function() {
    this.setData({
      showModal2: false
    })
  },

  // 禁止屏幕滚动
  preventTouchMove: function() {},

  // 选择尺码
  switchTap(event) {
    // console.log(event.currentTarget.id)
    for (var i = 0; i < this.data.sizeList.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.sizeList[i].bgcolor = '#fff3c7'
      } else {
        this.data.sizeList[i].bgcolor = '#fff'
      }
    }
    this.setData(this.data)
  },
  // 选择颜色
  switchTap2(event) {
    // console.log(event.currentTarget.id)
    for (var i = 0; i < this.data.colorList.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.colorList[i].bgcolor = '#fff3c7'
      } else {
        this.data.colorList[i].bgcolor = '#f1f1f1'
      }
    }
    this.setData(this.data)
  },
  //减少购买数量
  reduceNum() {
    if (this.data.purchaseQuantity <= 1) {
      return;
    } else {
      this.data.purchaseQuantity -= 1;
      this.data.total1 = Number(this.data.purchaseQuantity) * this.data.price1,
        this.data.total2 = Number(this.data.purchaseQuantity) * this.data.price2,
        // 将其赋值
        this.setData({
          purchaseQuantity: this.data.purchaseQuantity,
          total1: this.data.total1,
          total2: this.data.total2
        })
    }
  },
  //增加购买数量
  plusNum() {
    this.data.purchaseQuantity += 1;
    this.data.total1 = Number(this.data.purchaseQuantity) * this.data.price1,
      this.data.total2 = Number(this.data.purchaseQuantity) * this.data.price2,
      // 将其赋值
      this.setData({
        purchaseQuantity: this.data.purchaseQuantity,
        total1: this.data.total1,
        total2: this.data.total2
      })
  },
  /**
   * 根据id查询礼品信息
   */
  selectCommodityById(id) {
    var that = this
    app.api.selectCommodityById({
      skuid: id
    }).then(res => {
      that.setData({
        commodity: res.data.data.skuInfoEntity,
        skuImageList: res.data.data.skuInfoEntity.skuImageList,
        skuAttrValueList: res.data.data.skuInfoEntity.skuAttrValueList,
        price1: res.data.data.skuInfoEntity.price,
        price2: res.data.data.skuInfoEntity.integral,
        total1: res.data.data.skuInfoEntity.price,
        total2: res.data.data.skuInfoEntity.integral,
        saleattr: res.data.data.spuSaleAttrListCheckBySku,
        jsonStr: res.data.data.skuSaleAttrHashJsonStr,
        giftid: id
      })
    })
  },
  /**
   * 根据id查询评论信息
   */
  selectNewestComment(cid) {
    // console.log(cid)
    var that = this
    app.api.selectNewestComment({
      id: cid
    }).catch(res => {
      console.log(res)
      that.setData({
        comment: res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.selectCommodityById(options.id)
    that.selectNewestComment(options.cid)
  },
  closeModal() {
    this.setData({
      showModal: false
    })
  },
  closeModa2() {
    this.setData({
      showModal2: false
    })
  },
  choiceTap(event) {
    var that = this
    // 销售属性索引
    var itemidx = event.currentTarget.dataset.itemidx
    // 销售属性值索引
    var listidx = event.currentTarget.dataset.listidx
    // 销售属性id
    var itemid = event.currentTarget.dataset.itemid
    // 销售属性值id
    var listid = event.currentTarget.dataset.listid

    var k = ''
    for (var i = 0; i < that.data.saleattr[itemidx].spuSaleAttrValueList.length; i++) {

      k = k + value + "|"
      if (listidx == i) {
        that.data.saleattr[itemidx].spuSaleAttrValueList[i].isChecked = 1
      } else {
        that.data.saleattr[itemidx].spuSaleAttrValueList[i].isChecked = 0
      }
    }
    that.setData(that.data)
    that.setData(that.data)
    var k = ''
    var v = ''
    for (var i = 0; i < that.data.saleattr.length; i++) {
      for (var m = 0; m < that.data.saleattr[i].spuSaleAttrValueList.length; m++) {
        var key = that.data.saleattr[i].spuSaleAttrValueList[m].id
        var value = that.data.saleattr[i].spuSaleAttrValueList[m].saleAttrNames
        if (that.data.saleattr[i].spuSaleAttrValueList[m].isChecked == 1) {
          k = k + key + "|"
          v = v + value + "|"
        }
      }
    }
    var kuSaleAttrValueJson = JSON.parse(that.data.jsonStr);
    var v_skuId = kuSaleAttrValueJson[k];
    if (v_skuId) {
      console.log("v_skuId:" + v_skuId)
      wx.redirectTo({
        url: '/pages/user/exchange/exchange_details/exchange_details?id=' + v_skuId
      })
    } else {
      wx.showToast({
        title: '当前产品无此配置',
        icon: 'none',
        duration: 2000
      })
    }

    console.log(k)
    console.log(v)
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