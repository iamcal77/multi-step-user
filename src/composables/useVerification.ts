import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const formData = ref({
  personalInfo: {
    name: '',
    email: '',
    phone: '',
  },
  businessDetails: {
    name: '',
    industry: '',
  }
})

export const verificationCode = ref('')
export const sentVerificationCode = ref('123456')  // Mock code for simulation
export const isVerificationPending = ref(false)

export const fetchData = async (): Promise<void> => {
  try {
    const response = await fetch('http://localhost:3000/api/get-details')
    const data = await response.json()
    formData.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(fetchData)

export const startVerification = (): void => {
  isVerificationPending.value = true
  toast.info('Verification code has been sent to your email.')
}

export const verifyCode = (): void => {
  if (verificationCode.value === sentVerificationCode.value) {
    toast.success('Verification successful!')
    isVerificationPending.value = false
  } else {
    toast.error('Invalid verification code. Please try again.')
  }
}

export const submitForm = (): void => {
  alert('Form submitted!')
  toast.success('Form submitted successfully!')
}
