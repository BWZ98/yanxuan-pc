<template>
  <!-- 里面包括左侧menu轮播图 -->
  <div class="home-category"
       @mouseleave="cateGoryId=null">
    <!-- menu列表 -->
    <ul class="menu">
      <li v-for="item in menuList"
          :key="item.id"
          @mouseenter="cateGoryId = item.id"
          :class="{active:cateGoryId===item.id}">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink v-for="sub in item.children"
                      :key="sub.id"
                      :to="`/category/sub/${sub.id}`">
            {{ sub.name }}
          </RouterLink>
        </template>
        <template v-else>
          <!-- 使用骨架屏组件 -->
          <all-skeleton width="60px"
                        height="18px"
                        style="margin-right:5px"
                        bg="rgba(255,255,255,0.2)"
                        :animated="true"></all-skeleton>
          <all-skeleton width="50px"
                        height="18px"
                        bg="rgba(255,255,255,0.2)"
                        :animated="true"></all-skeleton>
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <!-- 避免没数据时报错 -->
      <ul v-if="currentCategory && currentCategory.goods">
        <li v-for="item in currentCategory.goods"
            :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture"
                 alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <ul v-if="currentCategory && currentCategory.brands">
        <li class="brand"
            v-for="item in currentCategory.brands"
            :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture"
                 alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{item.name}}</p>
              <p class="name ellipsis">{{item.desc}}</p>
              <p class="desc ellipsis-2">{{item.nameEn}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, computed, ref } from 'vue'
import { findBrand } from '@/api/home'
export default {
  name: 'HomeCategory',
  // 1. 获取vuex的一级分类，并且只需要两个二级分类
  // 2. 需要在组件内部，定义一个品牌数据
  // 3. 根据vuex的分类数据和组件中定义品牌数据，得到左侧分类完整数据(9分类+1品牌)数组
  // 4. 进行渲染即可
  setup () {
    // 这里添加一个品牌推荐的数据
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-chilren', name: '品牌推荐' }],
      brands: null
    })
    const store = useStore()
    const menuList = computed(() => {
      const list = store.state.category.list.map((item) => {
        return {
          id: item.id,
          name: item.name,
          // 防止初始化没有children的时候调用slice函数报错
          // 渲染时只需要子类目的2个数据,因此对list中的数据进行一下处理
          children: item.children && item.children.slice(0, 2),
          // 这是一个数组,里面的子项用来渲染弹出层layer
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })
    // 下面一部分是弹出层layer的逻辑
    // 定义一个响应式数据,鼠标进入某个一级类目,该数据接收那个类目的id,再通过一个计算属性,返回menuList里id相等的类目
    // 由于menuList是一个计算属性,使用时必须要加value
    const cateGoryId = ref(null)
    const currentCategory = computed(() => {
      return menuList.value.find((item) => item.id === cateGoryId.value)
    })
    // 品牌推荐部分的逻辑,把网络请求来的数组给brands,这个brands和item.goods是平级的,用于渲染layer中品牌的
    findBrand().then((res) => {
      // console.log(res)
      brand.brands = res.data.result
    })

    return { menuList, cateGoryId, currentCategory }
  }
}
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        li.brand {
          height: 180px;
          a {
            align-items: flex-start;
            img {
              width: 120px;
              height: 160px;
            }
            .info {
              p {
                margin-top: 8px;
              }
              .place {
                color: #999;
              }
            }
          }
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
