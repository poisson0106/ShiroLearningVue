import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Header from '@/components/frame/Header'
import Navi from '@/components/frame/Navi'

Vue.use(Router)

export default new Router({
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
        header: Header,
        navi: Navi,
        content: HelloWorld
      }
    }
  ]
})
