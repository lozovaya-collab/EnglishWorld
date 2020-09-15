import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Books from '../views/Books'
import words from '../views/words'
import LogIn from '../views/LogIn'
import LogOut from '../views/LogOut'
import profile from '../views/profile'
import registered from '../views/registered'
import movies from '../views/movies'

Vue.use(VueRouter)

  const routes = [
  {
     path: '/',
      name: 'Home',
      component: Home
  },
  {
      path: '/Books',
      name: 'Books',
      component: Books
  },
  {
      path: '/movies',
      name: 'movies',
      component: movies
  },
  {
      path: '/words',
      name: 'words',
      component: words
  },
  {
      path: '/LogIn',
      name: 'LogIn',
      component: LogIn
  },
  {
      path: '/LogOut',
      name: 'LogOut',
      component: LogOut
  },
  {
      path: '/profile',
      name: 'profile',
      component: profile,
  },
  {
      path: '/registered',
      name: 'registered',
      component: registered
  },
]



export default new VueRouter({
  routes,
  mode: 'history'
})

