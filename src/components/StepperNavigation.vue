<template>
  <div class="navigation">
    <!-- Automatic navigation, no buttons here -->
  </div>
</template>

<script setup lang="ts">
import { useOnboardingStore } from '@/store/onboarding'

const store = useOnboardingStore()
const maxSteps = 3

// Automatically go to next step after a delay
const autoNext = () => {
  if (store.currentStep < maxSteps - 1) {
    setTimeout(() => {
      store.currentStep++
      autoNext() // Recurse to continue auto navigation
    }, 3000) // 3-second interval between steps
  } else {
    // Do nothing when max step is reached
    console.log('Reached last step, no submission.')
  }
}

autoNext() // Start auto navigation when component is mounted
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
