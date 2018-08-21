import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'
import { createProvider } from './vue-apollo'
import { HttpLink } from 'apollo-link-http'

Vue.use(Vuetify)

Vue.config.productionTip = false

const link = new HttpLink({
  uri: 'http://gql.test/graphql'
})

new Vue({
  router,
  store,
  provide: createProvider({link}).provide(),
  render: h => h(App)
}).$mount('#app')
