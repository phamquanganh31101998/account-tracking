import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        const role = localStorage.getItem('token');
        if (role) {
          next();
        }
        else {
          next('/login');
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
      props: (router) => ({
        token:router.query.token
      }),
      beforeEnter: (to, from, next) => {
        const role = localStorage.getItem('token');
        if (role) {
          next('/');
        }
        else {
          next();
        }
      }
    },
  ]
})
