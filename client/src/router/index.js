import { createRouter, createWebHistory } from 'vue-router';
import { store } from '@/store';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register.vue'),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/email/verify',
    name: 'email.verification.notice',
    component: () => import(/* webpackChunkName: "emailVerificationNotice" */ '../views/emailVerificationNotice.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/email/verify/:id/:hash',
    name: 'email.verification.verify',
    component: () => import(/* webpackChunkName: "emailVerificationVerify" */ '../views/emailVerificationVerify.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "logout" */ '../views/logout.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:data(.*)',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/_.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (store.state.user) {
      next({
        name: 'index',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export {
  router,
};

export default router;
