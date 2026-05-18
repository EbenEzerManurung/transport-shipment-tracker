<template>
  <div 
    v-if="notification"
    :class="[
      'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md animate-slide-in',
      notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
    ]"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <svg v-if="notification.type === 'success'" class="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <svg v-else class="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="text-white font-medium">{{ notification.message }}</span>
      </div>
      <button @click="store.clearNotification" class="text-white hover:text-gray-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useShipmentStore } from '../stores/shipmentStore'

const store = useShipmentStore()
const notification = store.notification
</script>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>