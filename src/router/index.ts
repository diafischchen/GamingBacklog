import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/systems'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/systems'
      },
      {
        path: 'systems',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'games',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'completed',
        component: () => import('@/views/Tab3.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
