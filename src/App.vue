<template>
  <div class="app">
    <!-- Navbar at the top -->
    <Navbar />

    <!-- Router View renders the current route component -->
    <router-view />

    <!-- Stepper Navigation for route-based navigation -->
    <StepperNavigation />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import StepperNavigation from './components/StepperNavigation.vue'
</script>

<style scoped>
.app {
  padding: 20px;
}
</style>
