import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ShipmentList.vue')
    },
    {
      path: '/shipment/:id',
      name: 'shipment-detail',
      component: () => import('../views/ShipmentDetail.vue')
    }
  ]
})

export default router