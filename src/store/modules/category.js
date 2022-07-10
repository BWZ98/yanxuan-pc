import { topCategory } from '@/api/constants.js'
import { findAllCategory } from '@/api/category.js'

export default {
  namespaced: true,
  state () {
    return {
      list: topCategory.map(function (item) {
        return { name: item }
      })
    }
  },
  mutations: {
    setList (state, payload) {
      state.list = payload
    },
    // 修改一级分类下的open为true
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 修改一级分类下的open为false
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  actions: {
    // context形参才能调用commit方法
    async getList (context) {
      const res = await findAllCategory()
      // console.log(res)
      // 给一级分类添加控制二级分类是否显示的数据open
      res.data.result.forEach((item) => {
        item.open = false
      })
      // res.data.result是一个数组,里面有一级类目的id,name。以及数组children,children的每一项是一个对象,内有二级类目的id和name。goods是首页的menu部分的弹出框layer需要用到的推荐列表
      context.commit('setList', res.data.result)
    }
  }
}
