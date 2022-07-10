<template>
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/HomeCategory'
export default {
  name: 'PageHome',
  components: {
    HomeCategory
  }
}
</script>
<style scoped lang="less"></style>
