import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '@/pages/home.vue'

const routes = [
  {
    path: '/',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(), //createWebHistory()
  routes
})
export default router