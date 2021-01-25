import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: ({ path: string; component: Home; name: string })[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
]

// @ts-ignore
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes as RouteRecordRaw[]
})

export default router
