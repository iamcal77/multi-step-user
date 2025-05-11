<template>
  <component :is="steps[store.step - 1]"
             @next="store.nextStep"
             @prev="store.prevStep"
             @update="handleUpdate" />
</template>

<script setup lang="ts">
import { useOnboardingStore } from '@/store/onboarding'
import PersonalDetails from '@/components/steps/PersonalDetails.vue'
import BusinessDetails from '@/components/steps/BusinessDetails.vue'
import VerificationSummary from '@/components/steps/VerificationSummary.vue'

const store = useOnboardingStore()
const steps = [PersonalDetails, BusinessDetails, VerificationSummary]

function handleUpdate(payload: any) {
  Object.assign(store[store.step === 1 ? 'personal' : 'business'], payload)
}
</script>
