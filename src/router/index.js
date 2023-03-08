import { createWebHistory, createRouter } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Check is auth required
router.beforeEach((to, from, next) => {
  const isUserLoggedIn = store.getters.isAuth

  const conditions = {
    isLoginRequired: to.matched.some((record) => record.meta.requiresAuth),
    isGuestRequired: to.matched.some((record) => record.meta.requiresGuest)
  }

  if (conditions.isLoginRequired && !isUserLoggedIn) {
    return next({
      name: 'Login',
      query: {
        action: 'auth-required'
      }
    })
  }

  if (conditions.isGuestRequired && isUserLoggedIn) {
    return next('/')
  }

  return next()
});

export default router