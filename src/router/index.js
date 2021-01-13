import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login'
import Regis from '../components/Login/Regis'
import Home from '../components/Home/Home'
import PaperList from '../components/Login/PaperList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/regis',
      name: 'Regis',
      component: Regis
    },
    {
      path: '/index',
      name: 'Home',
      component: Home
    },
    {
      path: '/paperList',
      name: 'PaperList',
      component: PaperList
    }
  ]
})
