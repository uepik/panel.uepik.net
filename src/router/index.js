import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'
import Settings from '@/views/Settings.vue'
import Finances from '@/views/Finances.vue'
import Employment from '@/views/Employment.vue'
import Reports from '@/views/Reports.vue'

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
    path: '/rejestracja',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/logowanie',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/wyloguj',
    name: 'Logout',
    component: Logout,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ustawienia',
    name: 'Settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/zatrudnienie',
    name: 'Employment',
    component: Employment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/raporty',
    name: 'Reports',
    component: Reports,
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