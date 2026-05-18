<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          🚚 Transport Shipment Tracker
        </h1>
        <p class="text-gray-600">Monitor and manage your shipments</p>
        
        <!-- Statistics -->
        <div class="mt-4 flex flex-wrap justify-center gap-3">
          <div class="bg-white px-4 py-2 rounded-lg shadow-sm">
            <span class="font-semibold">📦 Total: {{ store.shipments.length }}</span>
          </div>
          <div class="bg-green-100 px-4 py-2 rounded-lg">
            <span class="text-green-800">✓ Assigned: {{ store.assignedCount }}</span>
          </div>
          <div class="bg-yellow-100 px-4 py-2 rounded-lg">
            <span class="text-yellow-800">⏳ Pending: {{ store.pendingCount }}</span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-center max-w-md mx-auto">
        <p class="text-red-800">{{ store.error }}</p>
        <button @click="store.fetchShipments" class="mt-2 text-blue-600 hover:text-blue-800">
          Try Again
        </button>
      </div>

      <!-- Shipments Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="shipment in store.shipments" :key="shipment.id"
             class="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
          <!-- Header -->
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-bold text-gray-800">{{ shipment.id }}</h3>
              <p class="text-xs text-gray-500 mt-1">Shipment ID</p>
            </div>
            <span :class="shipment.status === 'assigned' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'"
              class="px-3 py-1 rounded-full text-xs font-semibold">
              {{ shipment.status === 'assigned' ? '✓ Assigned' : '⏳ Pending' }}
            </span>
          </div>
          
          <!-- Route -->
          <div class="mb-3">
            <p class="text-gray-600 text-sm flex items-center">
              <span class="font-medium">From:</span> {{ shipment.origin }}
            </p>
            <p class="text-gray-600 text-sm flex items-center mt-1">
              <span class="font-medium">To:</span> {{ shipment.destination }}
            </p>
          </div>
          
          <!-- Transporter -->
          <div v-if="shipment.assignedTransporter" class="mb-4 p-2 bg-green-50 rounded">
            <p class="text-green-700 text-sm">
              🚛 {{ shipment.assignedTransporter }}
            </p>
          </div>
          <div v-else class="mb-4 p-2 bg-yellow-50 rounded">
            <p class="text-yellow-700 text-sm">
              ⏳ No transporter assigned
            </p>
          </div>
          
          <!-- Button -->
          <button @click="$router.push(`/shipment/${shipment.id}`)"
                  class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            View Details →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useShipmentStore } from '../stores/shipmentStore'

const store = useShipmentStore()

onMounted(() => {
  store.fetchShipments()
})
</script>