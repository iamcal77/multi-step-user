<template>
  <div class="app">
    <!-- Router View renders the current route component -->
    <router-view />
    
    <!-- Stepper Navigation for route-based navigation -->
    <StepperNavigation />
  </div>
</template>

<script setup lang="ts">
import StepperNavigation from './components/StepperNavigation.vue'
</script>

<style scoped>
.app {
  padding: 20px;
}
</style>
