<!--轮播图组件-->
<template>
  <Swiper>
    <SwiperItem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isLoad:false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      imgLoad(){
        // console.log('------------');
        if (!this.isLoad){//这么判断只会给父组件emit一次，而不是四次
          this.$emit('homeSwiperImgLoad')
          this.isLoad=true
        }
      }
    }
  }
</script>

<style scoped>

</style>
