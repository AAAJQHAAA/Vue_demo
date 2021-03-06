import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './vuei18n'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  i18n,
  render: h => h(App)
})
