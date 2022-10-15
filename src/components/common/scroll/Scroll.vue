<!--让移动端滚动更加顺滑的一个组件-->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    mounted() {
      //1.创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })
      //2.监听滚动位置
      this.scroll.on('scroll',position => {
        // console.log(position);
        this.$emit('scrollPosition',position)
      })
      //3.监听下拉加载更多
      this.scroll.on('pullingUp',()=>{
        // console.log('下拉加载更多');
        this.$emit('pullUpLoad')
      })
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      //加载更多的时候，加载完必须调用该方法，否则下拉加载更多只能调用一次
      finishPullUp(){
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
