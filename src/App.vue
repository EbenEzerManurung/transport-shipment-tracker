<template>
  <div>
    <router-view />
    <Notification />
  </div>
</template>

<script setup>
import Notification from './components/Notification.vue'
</script>