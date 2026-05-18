<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 max-w-3xl">
      <!-- Back Button -->
      <button @click="$router.push('/')" 
              class="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Back to Shipments
      </button>

      <!-- Loading State -->
      <div v-if="store.loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-800">{{ store.error }}</p>
        <button @click="fetchData" class="mt-3 text-blue-600 hover:text-blue-800">
          Try Again
        </button>
      </div>

      <!-- Shipment Details -->
      <div v-else-if="store.currentShipment" class="bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <div class="flex justify-between items-start flex-wrap gap-3">
            <div>
              <h1 class="text-2xl font-bold text-white">{{ store.currentShipment.id }}</h1>
              <p class="text-blue-100 text-sm mt-1">Shipment Details</p>
            </div>
            <span :class="store.currentShipment.status === 'assigned' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'"
              class="px-4 py-2 rounded-full text-sm font-semibold">
              {{ store.currentShipment.status === 'assigned' ? '✓ Assigned' : '⏳ Pending' }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-6">
          <!-- Route Information -->
          <div class="border-b border-gray-200 pb-4">
            <h2 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              Route Information
            </h2>
            <div class="space-y-2 ml-7">
              <p><span class="font-medium text-gray-700">Origin:</span> {{ store.currentShipment.origin }}</p>
              <p><span class="font-medium text-gray-700">Destination:</span> {{ store.currentShipment.destination }}</p>
              <p><span class="font-medium text-gray-700">Route:</span> {{ store.currentShipment.route }}</p>
            </div>
          </div>

          <!-- Vehicle Information -->
          <div class="border-b border-gray-200 pb-4">
            <h2 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
              </svg>
              Vehicle Details
            </h2>
            <div class="ml-7">
              <p><span class="font-medium text-gray-700">Vehicle Type:</span> {{ store.currentShipment.vehicleType }}</p>
            </div>
          </div>

          <!-- Transporter Assignment -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Transporter Assignment
            </h2>
            
            <div class="ml-7 space-y-4">
              <!-- Current Assignment -->
              <div v-if="store.currentShipment.assignedTransporter" 
                   class="p-3 bg-green-50 rounded-lg border border-green-200">
                <p class="text-green-800">
                  ✓ Currently assigned to: <strong>{{ store.currentShipment.assignedTransporter }}</strong>
                </p>
              </div>

              <!-- Assignment Form -->
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Select Transporter</label>
                <select 
                  v-model="selectedTransporter"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :disabled="assigning"
                >
                  <option value="">-- Select a transporter --</option>
                  <option 
                    v-for="transporter in store.transporters" 
                    :key="transporter.id" 
                    :value="transporter.name"
                    :disabled="transporter.name === store.currentShipment.assignedTransporter"
                  >
                    {{ transporter.name }}
                    {{ transporter.name === store.currentShipment.assignedTransporter ? '(Current)' : '' }}
                  </option>
                </select>
                
                <button 
                  @click="handleAssign"
                  :disabled="!selectedTransporter || assigning"
                  class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                >
                  <span v-if="assigning" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Assigning...
                  </span>
                  <span v-else>✓ Assign Transporter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShipmentStore } from '../stores/shipmentStore'

const route = useRoute()
const store = useShipmentStore()
const selectedTransporter = ref('')
const assigning = ref(false)

const fetchData = async () => {
  const id = route.params.id
  await Promise.all([
    store.fetchShipmentById(id),
    store.fetchTransporters()
  ])
}

const handleAssign = async () => {
  if (!selectedTransporter.value) return
  
  assigning.value = true
  try {
    await store.assignTransporter(route.params.id, selectedTransporter.value)
    selectedTransporter.value = ''
  } finally {
    assigning.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>