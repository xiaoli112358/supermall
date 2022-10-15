import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//GoodListItem中的$bus不能直接使用，需在在此处初始化一下
Vue.prototype.$bus=new Vue()
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
