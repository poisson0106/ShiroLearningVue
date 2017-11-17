import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Login from '@/components/Login'
import HeaderE from '@/components/frame/HeaderE'
import NaviE from '@/components/frame/NaviE'
import IndexE from '@/components/content/IndexE'
// import Navi from '@/components/frame/Navi'
// import Index from '@/components/content/Index'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      components: {
        header: '',
        navi: '',
        content: Login
      }
    },
    {
      path: '/index',
      name: 'Index',
      components: {
        header: HeaderE,
        navi: NaviE,
        content: IndexE
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  var authcAddr = ['product', 'index', 'druid', 'admin']
  var isNeedAuth = false

  authcAddr.forEach(function (element) {
    if (to.path.indexOf(element) > 0) isNeedAuth = true
  }, this)
  if (isNeedAuth) {
    if (sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== '') next()
    else next('/')
  } else next()
})

export default router
