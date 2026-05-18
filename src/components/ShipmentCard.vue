<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
    <div class="p-6">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-bold text-gray-800">{{ shipment.id }}</h3>
          <p class="text-sm text-gray-500 mt-1">Shipment ID</p>
        </div>
        <span 
          :class="statusClass"
          class="px-3 py-1 rounded-full text-xs font-semibold"
        >
          {{ shipment.status === 'assigned' ? '✓ Assigned' : '⏳ Not Assigned' }}
        </span>
      </div>
      
      <div class="space-y-2 mb-4">
        <div class="flex items-center text-gray-600 text-sm">
          <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span class="truncate">{{ shipment.origin }} → {{ shipment.destination }}</span>
        </div>
        
        <div v-if="shipment.assignedTransporter" class="flex items-center text-green-600 text-sm">
          <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="truncate">{{ shipment.assignedTransporter }}</span>
        </div>
        
        <div v-else class="flex items text-yellow-600 text-sm">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No transporter assigned</span>
        </div>
      </div>
      
      <button
        @click="$router.push(`/shipment/${shipment.id}`)"
        class="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
      >
        View Details →
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  shipment: {
    type: Object,
    required: true
  }
})

const statusClass = computed(() => {
  return props.shipment.status === 'assigned'
    ? 'bg-green-100 text-green-800'
    : 'bg-yellow-100 text-yellow-800'
})
</script>