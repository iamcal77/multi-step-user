import { defineStore } from 'pinia'

export const useOnboardingStore = defineStore('onboarding', {
  state: () => ({
    currentStep: 0,
    personalDetails: {
      name: '',
      email: '',
      phone: '',
      profileImage: null as File | null
    },
    businessDetails: {
      businessName: '',
      industry: '',
      companySize: '',
      businessLogo: null as File | null,
      businessDocument: null as File | null
    },
    verificationCode: '',
    isVerified: false,
    loading: false,
    error: ''
  }),
  actions: {
    submitData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        alert('Submission successful!')
      }, 2000)
    }
  }
})
