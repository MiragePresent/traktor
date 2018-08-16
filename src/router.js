import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import AuthView from './views/AuthView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/login',
      name: 'login',
      component: AuthView
    }, {
      path: '/register',
      name: 'register',
      component: AuthView
    }, {
      path: '/forgot/:user_email',
      name: 'forgot',
      component: AuthView
    }, {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
