<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar'
  import DetailSwiper from 'views/detail/childComps/DetailSwiper'
  import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
  import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop} from "network/detail"

  export default {
    name: "detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll
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
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;

    height: 100vh;
  }

  .content {
    /*使用better-scroll必须给改组件设置一个高度*/
    /*设置高度的时候必须给整体设置一个高度，也就是上面的100vh*/
    height: calc(100% - 44px);

  }

  /*为了不让标题栏跟着滚动，设置一个相对位置的设置*/
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
