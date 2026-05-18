import { createRouter, createWebHistory } from 'vue-router'
import ShipmentList from '../views/ShipmentList.vue'
import ShipmentDetail from '../views/ShipmentDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShipmentList
    },
    {
      path: '/shipment/:id',
      name: 'shipment-detail',
      component: ShipmentDetail
    }
  ]
})

export default router