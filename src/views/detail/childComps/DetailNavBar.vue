<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="title-item"
             :class="{active:index===currentIndex}"
             v-for="(item,index) in titles"
             @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "detail-items",
    components: {
      NavBar,
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
        banners: [],
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
      },
      backClick(){
        //回到刚才的位置，两种写法
        // this.$router.go(-1)
        this.$router.back()
      }

    }
  }
</script>

<style scoped>
  .title {
    display: flex; /*让字体水平分布*/
    font-size: 13px
  }

  .title-item {
    flex: 1; /*让字体均匀分布*/
  }

  .active {
    color: var(--color-high-text);
  }

  .back {
    margin-top: 7px;
  }
</style>
