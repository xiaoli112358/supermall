<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar'
  import DetailSwiper from 'views/detail/childComps/DetailSwiper'

  import {getDetail} from "network/detail"

  export default {
    name: "detail",
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        console.log(data.itemInfo.topImages)
        this.topImages = data.itemInfo.topImages
      })
    }
  }

</script>

<style scoped>

</style>
