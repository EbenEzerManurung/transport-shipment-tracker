import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockApi } from '../services/mockApi'

export const useShipmentStore = defineStore('shipment', () => {
  // State
  const shipments = ref([])
  const currentShipment = ref(null)
  const transporters = ref([])
  const loading = ref(false)
  const error = ref(null)
  const notification = ref(null)

  // Getters
  const assignedCount = computed(() => 
    shipments.value.filter(s => s.status === 'assigned').length
  )
  
  const pendingCount = computed(() => 
    shipments.value.filter(s => s.status === 'not_assigned').length
  )

  // Actions
  const fetchShipments = async () => {
    loading.value = true
    error.value = null
    try {
      shipments.value = await mockApi.getShipments()
    } catch (err) {
      error.value = err.message
      showNotification('Failed to load shipments', 'error')
    } finally {
      loading.value = false
    }
  }

  const fetchShipmentById = async (id) => {
    loading.value = true
    error.value = null
    try {
      currentShipment.value = await mockApi.getShipmentById(id)
    } catch (err) {
      error.value = err.message
      showNotification('Failed to load shipment details', 'error')
    } finally {
      loading.value = false
    }
  }

  const fetchTransporters = async () => {
    try {
      transporters.value = await mockApi.getTransporters()
    } catch (err) {
      error.value = err.message
    }
  }

  const assignTransporter = async (shipmentId, transporterName) => {
    // Form validation - Bonus D
    if (!transporterName || transporterName.trim() === '') {
      showNotification('❌ Please select a transporter', 'error')
      throw new Error('Transporter required')
    }

    loading.value = true
    error.value = null
    try {
      const result = await mockApi.assignTransporter(shipmentId, transporterName)
      
      // Update current shipment if it's the one being modified
      if (currentShipment.value && currentShipment.value.id === shipmentId) {
        currentShipment.value = result.shipment
      }
      
      // Update in shipments list
      const index = shipments.value.findIndex(s => s.id === shipmentId)
      if (index !== -1) {
        shipments.value[index] = result.shipment
      }
      
      showNotification(result.message, 'success')
      return result
    } catch (err) {
      error.value = err.message
      showNotification(err.message, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  const showNotification = (message, type = 'info') => {
    notification.value = { message, type }
    setTimeout(() => {
      notification.value = null
    }, 3000)
  }

  const clearNotification = () => {
    notification.value = null
  }

  return {
    shipments,
    currentShipment,
    transporters,
    loading,
    error,
    notification,
    assignedCount,
    pendingCount,
    fetchShipments,
    fetchShipmentById,
    fetchTransporters,
    assignTransporter,
    clearNotification
  }
})