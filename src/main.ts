import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex';

Vue.config.productionTip = false

Vue.use(Vuex);

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

console.log(vuetify)