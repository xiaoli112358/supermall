<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"></detail-shop-info>
  </div>
</template>

<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar'
  import DetailSwiper from 'views/detail/childComps/DetailSwiper'
  import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
  import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'

  import {getDetail, Goods,Shop} from "network/detail"

  export default {
    name: "detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 1.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        console.log(data.itemInfo.topImages)
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
      })

    }
  }

</script>

<style scoped>

</style>
