//先引用城市数据文件
//获取应用实例
const app = getApp();
var qqmapsdk;
var citys = require('../../../../utils/city.js')
var QQMapWX = require('../../../../utils/map/qqmap-wx-jssdk.js');
var lineHeight = 0;
var endWords = "";
var isNum;



Page({
  data: {
    "hidden": true,
    cityName: "", //获取选中的城市名
    province: '',
    city: '',
    latitude: '',
    longitude: ''
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    qqmapsdk = new QQMapWX({
      key: 'GTDBZ-WFSRX-JOT4W-7WYBD-Z2CTO-7QBEM' //这里自己的key秘钥进行填充
    });
  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成
    var cityChild = citys.City[0];
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        lineHeight = (res.windowHeight - 100) / 22;
        // console.log(res.windowHeight - 100)
        that.setData({
          citys: cityChild,
          winHeight: res.windowHeight - 40,
          lineHeight: lineHeight
        })
      }
    })
  },
  onShow: function() {
    // 生命周期函数--监听页面显示
    let vm = this;
    vm.getUserLocation();
  },
  onHide: function() {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载

  },
  //触发全部开始选择
  chStart: function() {
    this.setData({
      trans: ".3",
      hidden: false
    })
  },
  //触发结束选择
  chEnd: function() {
    this.setData({
      trans: "0",
      hidden: true,
      scrollTopId: this.endWords
    })
  },
  //获取文字信息
  getWords: function(e) {
    var id = e.target.id;
    this.endWords = id;
    isNum = id;
    this.setData({
      showwords: this.endWords
    })
  },
  //设置文字信息
  setWords: function(e) {
    var id = e.target.id;
    this.setData({
      scrollTopId: id
    })
  },

  // 滑动选择城市
  chMove: function(e) {
    var y = e.touches[0].clientY;
    var offsettop = e.currentTarget.offsetTop;
    var height = 0;
    var that = this;;
    var cityarr = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
    // 获取y轴最大值
    wx.getSystemInfo({
      success: function(res) {
        height = res.windowHeight - 10;
      }
    });

    //判断选择区域,只有在选择区才会生效
    if (y > offsettop && y < height) {
      // console.log((y-offsettop)/lineHeight)
      var num = parseInt((y - offsettop) / lineHeight);
      endWords = cityarr[num];
      // 这里 把endWords 绑定到this 上，是为了手指离开事件获取值
      that.endWords = endWords;
    };

    //去除重复，为了防止每次移动都赋值 ,这里限制值有变化后才会有赋值操作，
    //DOTO 这里暂时还有问题，还是比较卡，待优化
    if (isNum != num) {
      // console.log(isNum);
      isNum = num;
      that.setData({
        showwords: that.endWords
      })
    }
  },
  //选择城市，并让选中的值显示在文本框里
  bindCity: function(e) {
    // console.log(e);
    var cityName = e.currentTarget.dataset.cityname;
    this.setData({
      cityName: cityName
    })

  },
  getUserLocation: function() {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        // console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function(res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function(latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        // console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        // console.log(city);

        vm.setData({
          province: province,
          city: city,
          cityName: city,
          latitude: latitude,
          longitude: longitude
        })
        app.user.regional = city
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        // console.log(res);
      }
    });
  },
  // 跳转到用户页面
  redirectToPersonal() {
    var that = this
    app.user.regional = that.data.cityName
    app.api.changeRegional({
        regional: that.data.cityName,
        userid: app.user.id
      })
      .then(res => {
        wx.navigateBack({
          delta: 1
        })
      })
  }

})