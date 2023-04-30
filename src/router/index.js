import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'
import Settings from '@/views/Settings.vue'
import Finances from '@/views/Finances.vue'

const routes = [
  {
    path: '/',
    name: 'Finances',
    component: Finances,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Check is auth required
router.beforeEach((to, from, next) => {
  const isUserLoggedIn = store.getters.isAuth
  const isLoginRequired = to.matched.some((record) => record.meta.requiresAuth)

  if (isLoginRequired && !isUserLoggedIn) {
    return next({
      name: 'Login',
      query: {
        action: 'auth-required'
      }
    })
  } else if (!isLoginRequired && isUserLoggedIn) {
    return next('/')
  }

  return next()
});

export default router