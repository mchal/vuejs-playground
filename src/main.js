import Vue from 'vue'
import App from '@/App.vue'

Vue.config.productionTip = false;

const myapp = new Vue({
  render: h => h(App)
});
myapp.$mount('#app');
console.log(myapp);
