<template>
  <div class="order-tracking-wrapper">
    <div ref="trackingContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import OrderTracking from '@bestvoy/order-tracking';
// No need to import CSS separately - it's automatically injected!

const trackingContainer = ref(null);
let tracker = null;

onMounted(() => {
  if (trackingContainer.value) {
    tracker = new OrderTracking({
      apiUrl: '/api/common/order_tracking',
      container: trackingContainer.value,
      ga: {
        key: {}
      },
      // mobileBreakpoint: 768, // Optional: customize breakpoint (default: 700)
      texts: {
        title: 'Track Your Order',
        placeholder: 'Enter your order number',
        trackButton: 'Track'
      },
      onSuccess: (data) => {
        console.log('Tracking successful:', data);
        // Handle success
      },
      onError: (error) => {
        console.error('Tracking error:', error);
        // Handle error
      }
    });
  }
});

onUnmounted(() => {
  if (tracker) {
    tracker.destroy();
  }
});
</script>

<style scoped>
.order-tracking-wrapper {
  width: 100%;
}
</style>

