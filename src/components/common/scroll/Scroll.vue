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
      }
    },
    mounted() {
      //1.创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType:this.probeType
      })
      //2.监听滚动位置
      this.scroll.on('scroll',position => {
        // console.log(position);
        this.$emit('scrollPosition',position)
      })
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      }
    }
  }
</script>

<style scoped>

</style>
