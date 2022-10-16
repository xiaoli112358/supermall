<template>
  <div class="nav-bar ignore">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center; /*文字居中*/
    box-shadow: 0 1px 1px rgba(100,100,100,.1);/*给背景添加一点阴影*/

  }

  .left,.right {
    width: 60px;
    /*background-color: green;*/
  }



  .center {
    flex: 1;
    /*background-color: orangered;*/
  }
</style>
