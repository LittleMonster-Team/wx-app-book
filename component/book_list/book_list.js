// component/book_list/book_list.js
//获取应用实例
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookList: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal) {
        this.setData({
          bookList: newVal

        })

      }
    }, //集合数据
    id: {
      type: Number,
      value: 0,
    },
    bookCover: {
      type: String,
      value: '',
    },
    bookName: {
      type: String,
      value: '',
    },
    bookSynopsis: {
      type: String,
      value: '',
    },
    bookPlayNum: {
      type: Number,
      value: 0,
    },
    bookChapterNum: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 跳转到故事详情页面
     */
    redirectToDetails(e) {
      app.redirectToDetails(e)
    },
  }
})