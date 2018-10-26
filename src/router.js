import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Me from './views/Me.vue'
import Activities from './views/Activities.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/activities',
      name: 'activities',
      component: Activities
    }, {
      path: '/me',
      name: 'me',
      component: Me
    }, {
      path: '*',
      redirect: '/home'
    }
  ]
})
