import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Blog from './views/BlogView.vue'
import AuthView from './views/AuthView.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/blog',
      name: 'blog',
      component: Blog
    }, {
      path: '/blog/create',
      name: 'add_post',
      component: Blog
    }, {
      path: '/login',
      name: 'login',
      component: AuthView,
      meta: {
        middleware: ['guest']
      }
    }, {
      path: '/register',
      name: 'register',
      component: AuthView,
      meta: {
        middleware: ['guest']
      }
    }, {
      path: '/forgot/:user_email',
      name: 'forgot',
      component: AuthView,
      meta: {
        middleware: ['guest']
      }
    }
  ]
})

export default router
