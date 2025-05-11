import { defineStore } from 'pinia'

export const usePersonalFormStore = defineStore('personalForm', {
  state: () => ({
    name: '',
    email: '',
    phone: '',
    profileImage: null as File | null
  }),
  actions: {
    setProfileImage(file: File) {
      this.profileImage = file
    },
    reset() {
      this.name = ''
      this.email = ''
      this.phone = ''
      this.profileImage = null
    }
  },
  persist: true 
})
