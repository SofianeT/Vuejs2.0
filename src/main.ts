import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex';
import app from "@/App.vue";

Vue.config.productionTip = false

Vue.use(Vuex);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.use(store)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

console.log(vuetify)
