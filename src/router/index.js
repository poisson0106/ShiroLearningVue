import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Header from '@/components/frame/Header'
import Navi from '@/components/frame/Navi'
import Index from '@/components/content/Index'
import Login from '@/components/Login'
import Detail from '@/components/content/Detail'
import History from '@/components/frame/History'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      components: {
        content: Login
      }
    },
    {
      path: '/index',
      name: 'Index',
      components: {
        header: Header,
        navi: Navi,
        content: Index
      }
    },
    {
      path: '/product/:id',
      name: 'Product',
      components: {
        header: Header,
        content: Detail,
        history: History
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  var authcAddr = ['product', 'index', 'druid', 'admin']
  var isNeedAuth = false
  store.commit('updateTouchTime')

  authcAddr.forEach(function (element) {
    if (to.path.indexOf(element) > 0) isNeedAuth = true
  }, this)
  if (isNeedAuth) {
    var token = store.state.token
    if (token !== null && token !== undefined) next()
    else next('/')
  } else next()
})

export default router
