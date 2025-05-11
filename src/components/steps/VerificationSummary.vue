<template>
  <div class="summary-container">
    <h2 class="title">Verification & Summary</h2>
    <p class="description">Please verify your details and submit them.</p>

    <ul class="summary-list">
      <li><strong>Name:</strong> {{ formData.personalInfo?.name }}</li>
      <li><strong>Email:</strong> {{ formData.personalInfo?.email }}</li>
      <li><strong>Phone:</strong> {{ formData.personalInfo?.phone }}</li>
      <li><strong>Business Name:</strong> {{ formData.businessDetails?.name }}</li>
      <li><strong>Industry:</strong> {{ formData.businessDetails?.industry }}</li>
    </ul>

    <!-- Email Verification Section -->
    <div v-if="isVerificationPending" class="verification-section">
      <label for="verificationCode">Enter the verification code sent to your email:</label>
      <input v-model="verificationCode" type="text" id="verificationCode" placeholder="Verification Code" />
      <button @click="verifyCode">Verify Code</button>
    </div>

    <button v-if="!isVerificationPending" @click="submitForm" class="submit-btn">Submit</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const formData = ref({
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

const verificationCode = ref('')
const sentVerificationCode = ref('123456')  // Mock code for simulation
const isVerificationPending = ref(false)

// Fetch the combined data from the server
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/get-details')
    const data = await response.json()
    formData.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Fetch data when the component is mounted
onMounted(fetchData)

const startVerification = () => {
  isVerificationPending.value = true
  // Simulate sending the verification code (e.g., sending an email)
  toast.info('Verification code has been sent to your email.')
}

const verifyCode = () => {
  if (verificationCode.value === sentVerificationCode.value) {
    toast.success('Verification successful!')
    isVerificationPending.value = false
  } else {
    toast.error('Invalid verification code. Please try again.')
  }
}

const submitForm = () => {
  alert('Form submitted!')
  // Submit the form to a mock API or real API
  toast.success('Form submitted successfully!')
}
</script>

<style scoped>
.summary-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  text-align: center;
  margin-bottom: 1.25rem;
}

.description {
  font-size: 1rem;
  color: #6b7280;
  text-align: center;
  margin-bottom: 2rem;
}

.summary-list {
  padding-left: 0;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.summary-list li {
  margin-bottom: 0.75rem;
  color: #374151;
}

.summary-list strong {
  color: #111827;
}

.submit-btn {
  padding: 1rem;
  background-color: #2563eb;
  color: white;
  font-weight: bold;
  font-size: 1.125rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #1d4ed8;
}

.submit-btn:focus {
  outline: none;
}

.verification-section {
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  .summary-container {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.75rem;
  }

  .description {
    font-size: 0.875rem;
  }

  .submit-btn {
    font-size: 1rem;
  }
}
</style>
