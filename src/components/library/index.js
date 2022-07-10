import AllSkeleton from './allSkeleton'
// 这里组件的名字就用自己的name属性
export default {
  install (app) {
    app.component(AllSkeleton.name, AllSkeleton)
  }
}
