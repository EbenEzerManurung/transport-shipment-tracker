import { onMounted, onUnmounted } from 'vue'
import { useShipmentStore } from '../stores/shipmentStore'

export function useRealtimeUpdates() {
  const store = useShipmentStore()
  let intervalId = null

  const simulateUpdate = () => {
    const unassigned = store.shipments.filter(s => s.status === 'not_assigned')
    if (unassigned.length > 0 && store.transporters.length > 0) {
      const randomShipment = unassigned[Math.floor(Math.random() * unassigned.length)]
      const randomTransporter = store.transporters[Math.floor(Math.random() * store.transporters.length)]
      
      console.log(`[Real-time] Auto-assigning ${randomTransporter.name} to ${randomShipment.id}`)
      store.assignTransporter(randomShipment.id, randomTransporter.name)
    }
  }

  onMounted(() => {
    intervalId = setInterval(simulateUpdate, 20000) // Every 20 seconds
  })

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })
}