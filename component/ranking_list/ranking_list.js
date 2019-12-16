// component/ranking_list/ranking_list.js
//获取应用实例
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rankingList: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        this.setData({
          rankingList: newVal
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
  data: {
    bimgs: {
      bimg_0: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABu0lEQVRoQ+2ZPUvDYBSFn7SDs4J7QVwcaxsRHOri6KCOuomoIKigP0KhFQSV4qajdXB0sYMgprWjiwjdBZ0d2kgSW0qtNuntB5EbeMmQ95x7PrJdg5A/Rsj1UzdgwQKwFRJDxyZcO1pdAwXYs+EgJOJdmQbsJ+HQNWDBHZAKkwEgb8KsGhhga9rAAMN3R2sD2oAwAf2FhAGK4dqAOEIhgTYgDFAM1wbEEQoJtAFhgGK4NiCOUEigDQgDFMO1AXGEQgJtQBigGK4NiCMUEmgDwgDFcG1AHKGQ4B818AinBqwLE+kr3IazKdhwFxwlmKjAhQ3xvqrocJgBpSisxOG5vuR7gaEP2AF2gdEOuXsNewPSw5AZh09n2I81axHGqp6JzV6rCch/EoF0Al4bcb/uiR8gFfUamQ84qNvXbyqQmYZ8K+K2i24LloFtYLLbytrwPQFHJlz+da+tgRrYgjW802sjjvCsCVk/gfk20AcjgYTX9AQ20GRkFUj6SeqPOwXg3G/izTwdG6gRFWGuCkvAIjDi08w7kIvAVQJufWJaXhMbaGQteCZmgJgNMef9/b1sQBnv3CchJxHdiP0CHX2hMTHQbukAAAAASUVORK5CYII=')",
      bimg_1: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAByUlEQVRoQ+2ZsS9DURjFfx8Di3gkdonNSGwGFqMBI5sIEolqnz/Ca1UiQcTGiMFoYbBJjTZJdwltLAx80kabpqpe+1F5cl/S7Z5zz++cbleI+CcRz08Z4CnO1KuwEgWgdmW7K8VpIWsRIJfABzaiEL4i47qXJCgBXABjEQO49JKMO4A/XM0t8IflF692C7gFjA24v5CxQLPcLWCu0GjgFjAWaJa7BcwVGg3cAsYCzXK3gLlCo4FbwFigWe4WMFdoNHALGAs0y90C5gqNBm4BY4FmuVvAXKHR4D8t4LOLsmhspLVyYc8LWCo+cDzFGXwVDoGh1qZo+rabdmWuK8Vt+ZFPV+jIdxJDWQP6mrb+XeE9wmb3M2nZ5qVw1adn1pzPwAfE8u9madh9pxDeC7irVH75TvyYYKxNiakw2fBVPygQ5exNSPckuaxl++1Ddz7BrMIqMPyDucJYZQS2upMc1Tv8LUBJnIuzgLDQApAMyr6XYj8MZWiAFoA0FLyUp2GAKpB5YCRMU3XOXKMchG282qdpgDKIzwTKDDAN9IaEeQBOEI69gPOQmprHzACVrjmfaVFGVehH6Yfir/BlEbKiZFW48gJOLKErte94sd0xliRuzwAAAABJRU5ErkJggg==')",
      bimg_2: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB1UlEQVRoQ+2ZvyuEcRzHX5/nSFZlVzYjmYh7KIPBgJFNQikUfwSFUkg2RgwGg+I5YhKjTd2urBL3fHSX4/LjPHcfTo++t9xw3/f7+36/3rd9hZh/JOb5eS2gJ/RryGQcConHinSyl82aK5BJMSvKfBzC5zOqMJdIspArEAYEQDJOBYCU5+O7An+4mlvgD+HnrnYLuAWMBNxfyAjQLHcLmBEaDdwCRoBmuVvAjNBo4BYwAjTL3QJmhEYDt4ARoFnuFjAjNBq4BYwAzXK3gBmh0cAtYARolrsFzAiNBv9ogUzAmsCYkUhF5QrrCZ/x3AOHntJEyJYqzRVNUeZlIlzhMSwdXL898h1QQy3TCjNAfZnevy27FVjkniXp5SF72YdnVj2nMXxgRoSJ305Tir8qq14Ni9LGTaHuy3fix4BkQphG6Svloh8/K+xnlKVqn9Rn3t8+dGvAkMIU0PLj4YobXgosi892sWPfFsiL9ZhRFUYrUORSlA3pYiMKsMgFKlCkpOD5PCUXeFdkBGiNQqrImQtRNqMSf+9TdoHXIkf0IAyqxwBKXaQywp2E7KLsSDeHkTRfHDIXKPR9OmYgIbQDDQoN2e+X39MCaSCdUc6quti1hC7UPgPg9OUxfhwMCwAAAABJRU5ErkJggg==')",
      bimg_3: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB1ElEQVRoQ+1Zvy8EURD+Zhu9RC+5m1coiU5Bo1SgpBNBIkHCH0GCRIKIjhKFUkOhE0rFm7tEL9FrduRdrAjH3t3cnay8l2y17/vm+7FbDaHghwquHx8GqtXqZJqmy0UwlCTJXqlUughaawa89+tEtFkE8ZlGVd1wzm3VDIjINYDRIhkAcMPMY9HAH7YWG/jD8GujYwOxAWMC8RMyBmiGxwbMERoJYgPGAM3w2IA5QiNBbMAYoBkeGzBHaCSIDRgDNMNjA+YIjQSxAWOAZnhswByhkSA2YAzQDI8NmCM0EvyjBrz3B0S0YEykq3BVPXTOLWYLjgEAJwAGu6qi9WEPAGaZ+fFjySciPQBWAawB6Gudu6PIZwDbAHaY+TVM+rZmFZHSu4mljkppnnw/iGfm6mfoj3tiEQlLv9DIRPOz2oq4fE/8ph5r7qJbRGYArAAYaqusfLJ7ALvMfPrb1VwDGbhSqcyr6nwXjNwT0VG5XD7K91jnH8gDddBIU8IznQ038NVYMJKm6RwRDeeZ/u29qt4lSXLcaOJfuVo2kBGJyDiAaQBTAHobNPMC4BzAGTNfNYipe81s4DOr936KiEaIqF9V+wGEJ5wnInpS1fDcOueC+LacNx/KEkDLJpTfAAAAAElFTkSuQmCC')",
    },
   
  },

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
