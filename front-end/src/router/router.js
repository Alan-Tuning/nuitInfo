import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/MainView.vue'),
    },
    {
      path: '/cookie',
      name: 'cookie',
      component: () => import('../views/CookieView.vue'),
    },
    {
      path: '/captcha',
      name: 'captcha',
      component: () => import('../views/CaptchaView.vue'),
    },
    {
      path: '/podcast',
      name: 'podcast',
      component: () => import('../views/PodcastView.vue'),
    }
  ],
})

export default router
