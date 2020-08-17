// component/search_box/search_box.js
//获取应用实例
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    user: {
      type: Object,
      value: {},
    },
    userLogStyle: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    //搜索框内容
    inputValue: '',
    //搜索框删除图标
    deleteIcon: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //获取搜索框中内容
    bindKeyInput: function(e) {
      var value = e.detail.value
      var count = e.detail.cursor
      if (value.length > 0) {
        this.setData({
          deleteIcon: true,
          inputValue: value
        })
      } else {
        this.setData({
          deleteIcon: false,
          inputValue: value
        })
      }
    },
    //清除搜索框内容
    iconClick() {
      console.log(this.data.inputValue)
      this.setData({
        deleteIcon: false,
        inputValue: ''
      })
    },
    /**
     * 跳转到登录页面
     */
    redirectToLogin() {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    },
    //跳转到用户详情页面
    navigateToUserDetails() {
      wx.navigateTo({
        url: '/pages/user_details/user_details?id=' + app.user.id,
      })
    },
    //搜索方法
    search() {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    }
  }
})