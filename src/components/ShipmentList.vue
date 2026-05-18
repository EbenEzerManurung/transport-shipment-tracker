<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">🚚 Transport Shipment Tracker</h1>
        <p class="text-gray-600">Manage and track all your shipments in real-time</p>
        <div class="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
          <span class="text-sm text-gray-600">Total Shipments:</span>
          <span class="font-bold text-blue-600">{{ store.shipments.length }}</span>
          <span class="text-sm text-gray-400">|</span>
          <span class="text-sm text-green-600">Assigned: {{ assignedCount }}</span>
          <span class="text-sm text-gray-400">|</span>
          <span class="text-sm text-yellow-600">Pending: {{ pendingCount }}</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="flex justify-center items-center py-20">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Loading shipments...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md mx-auto">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-800 mb-3">{{ store.error }}</p>
        <button @click="store.fetchShipments" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Try Again
        </button>
      </div>

      <!-- Shipments Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ShipmentCard 
          v-for="shipment in store.shipments" 
          :key="shipment.id"
          :shipment="shipment"
        />
      </div>

      <!-- Empty State -->
      <div v-if="!store.loading && store.shipments.length === 0" class="text-center py-20">
        <svg class="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <p class="text-gray-500 text-lg">No shipments found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useShipmentStore } from '../stores/shipmentStore'
import ShipmentCard from '../components/ShipmentCard.vue'

const store = useShipmentStore()

const assignedCount = computed(() => 
  store.shipments.filter(s => s.status === 'assigned').length
)

const pendingCount = computed(() => 
  store.shipments.filter(s => s.status === 'not_assigned').length
)

onMounted(() => {
  store.fetchShipments()
})
</script>