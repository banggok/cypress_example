import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/loans',
      name: 'loans',
      component: () => import('../views/LoanListView.vue'),
    },
    {
      path: '/loan-application',
      name: 'loan-application',
      component: () => import('../views/LoanApplicationView.vue'),
    },
    {
      path: '/loan-application-v2',
      name: 'loan-application-v2',
      component: () => import('../views/LoanApplicationV2View.vue'),
    },
  ],
})

export default router
