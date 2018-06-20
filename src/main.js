import Vue from 'vue'
import VueApollo from 'vue-apollo'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { apolloProvider } from './bootstrap'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueApollo)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  provide: apolloProvider.provide(),
  render: h => h(App)
}).$mount('#app')
