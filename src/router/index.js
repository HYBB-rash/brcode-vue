import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login'
import Regis from '../components/Login/Regis'
import Home from '../components/Home/Home'
import PaperList from '../components/PaperList'
import UserMessage from '../components/UserMessage'
import Paper from '../components/Paper'
import Comments from '../components/Comments'
import PaperPage from '../components/Home/PaperPage'
import UserHome from '../components/Home/UserHome'
import EditPage from '../components/Home/EditPage'
import UserList from '../components/UserList'
import Index from '../components/Home/Index'
import UserAdminHome from '../components/Home/UserAdminHome'
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
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/index',
          name: 'Home',
          component: Home
        },
        {
          path: '/page/:userId/:paperId',
          name: 'Page',
          component: PaperPage
        },
        {
          path: '/editPage',
          name: 'EditPage',
          component: EditPage
        },
        {
          path: '/userHome/:userId',
          name: 'UserHome',
          component: UserHome
        },
        {
          path: '/userAdminHome/:userId',
          name: UserAdminHome,
          component: UserAdminHome
        }
      ]
    },
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
      path: '/paperList',
      name: 'PaperList',
      component: PaperList
    },
    {
      path: '/userMessage',
      name: 'UserMessage',
      component: UserMessage
    },
    {
      path: '/paper',
      name: 'Paper',
      component: Paper
    },
    {
      path: '/comments',
      name: 'Comments',
      component: Comments
    },
    {
      path: '/userList',
      name: 'UserList',
      component: UserList
    }
  ]
})
