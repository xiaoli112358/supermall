<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scrollPosition="contentScroll"
            :pull-up-load="true"
            @pullUpLoad="loadMore"
    >
      <home-swiper :banners="banners"/>
      <recommend :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick">
      </tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop><!--不是原生的标签不能直接使用点击事件，加上一个native就可以了-->

  </div>
</template>

<script>
  import HomeSwiper from 'views/home/childComps/HomeSwiper'
  import Recommend from 'views/home/childComps/Recommend'
  import FeatureView from 'views/home/childComps/FeatureView'

  import NavBar from 'components/common/navBar/NavBar'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goodsList/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultiData, getHomeGoods} from "network/home"

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      Recommend,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mounted() {
      // 1.图片加载完成的事件监听
      this.$bus.$on('itemImgLoad', () => {/*监听到了子组件的itemImgLoad方法*/
        // console.log('------------');
        // this.$refs.scroll.scroll.refresh()/*判定图片加载完成了就调用一下滚动的刷新方法*/
        this.$refs.scroll.refresh()
      })
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultiData();

      // 2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        // console.log('哈哈哈');
        this.$refs.scroll.scrollTo(0, 0)
        /*通过ref属性来获取scroll这个子组件，此种方式可以避免class重名重名的问题*/
      },
      loadMore() {
        console.log('下拉加载更多');
        this.getHomeGoods(this.currentType)
      },
      contentScroll(position) {
        // console.log(position);
        this.isShowBackTop = (-position.y) > 1000
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          /*该方法能够将一个数组的数据直接添加到另一个数组去*/
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })

      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*让购物街这一行冻结*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /*滚动条向下滚动的时候该组件冻结*/
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  /*.content{*/
  /*overflow: hidden;*/

  /*position: absolute;*/
  /*top: 44px;*/
  /*bottom: 49px;*/
  /*left: 0;*/
  /*right: 0;*/
  /*}*/
  .content {
    height: calc(100% - 44px - 29px);
    overflow: hidden;
    margin-top: 44px;
  }
</style>
