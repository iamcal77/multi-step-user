<template>
  <div class="form-container">
    <button @click="goBack" class="back-btn">Back</button>
    <h1 class="form-title">Summary</h1>
    <ul class="summary-list">
      <li><strong>Personal Name:</strong> {{ formData.personalInfo?.name || 'N/A' }}</li>
      <li><strong>Personal Email:</strong> {{ formData.personalInfo?.email || 'N/A' }}</li>
      <li><strong>Personal Phone:</strong> {{ formData.personalInfo?.phone || 'N/A' }}</li>
      <li><strong>Business Name:</strong> {{ formData.businessDetails?.name || 'N/A' }}</li>
      <li><strong>Business Industry:</strong> {{ formData.businessDetails?.industry || 'N/A' }}</li>
      <li><strong>Business Size:</strong> {{ formData.businessDetails?.size || 'N/A' }}</li>
    </ul>

    <button @click="startVerification" class="submit-btn" v-if="!isVerificationPending && !isVerified">
      Send Verification Code
    </button>

    <div v-if="isVerificationPending && !isVerified" class="verification-section">
      <input v-model="verificationCode" type="text" placeholder="Enter verification code" />
      <button @click="verifyCode">Verify Code</button>
    </div>

    <button 
      @click="submitForm" 
      class="submit-btn" 
      v-if="isVerified" 
      :disabled="loading"
    >
      <span v-if="loading" class="loader"></span>
      <span v-if="!loading">Submit Form</span>
    </button>
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
    size: ''
  }
})

const verificationCode = ref('')
const isVerificationPending = ref(false)
const isVerified = ref(false)
const loading = ref(false)

const fetchData = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/get-details')
    const data = await res.json()
    formData.value = data
  } catch (err) {
    toast.error('Error fetching data.')
    console.error(err)
  }
}

const startVerification = async () => {
  const email = formData.value.personalInfo?.email
  if (!email) {
    toast.warning('No email found to send verification.')
    return
  }

  try {
    const res = await fetch('http://localhost:3000/api/send-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    const result = await res.json()

    if (res.ok) {
      toast.info('Verification code sent to email.')
      isVerificationPending.value = true
    } else {
      toast.error(result.message || 'Failed to send code.')
    }
  } catch (err) {
    toast.error('Server error while sending code.')
    console.error(err)
  }
}

const verifyCode = async () => {
  const email = formData.value.personalInfo?.email
  try {
    const res = await fetch('http://localhost:3000/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code: verificationCode.value })
    })

    const result = await res.json()
    if (res.ok) {
      toast.success('Email verified successfully!')
      isVerified.value = true
      isVerificationPending.value = false
    } else {
      toast.error(result.message || 'Invalid verification code.')
    }
  } catch (err) {
    toast.error('Verification failed.')
    console.error(err)
  }
}

const submitForm = async () => {
  if (!isVerified.value) {
    toast.warning('Please verify your email first.')
    return
  }

  loading.value = true

  try {
    // Simulate a form submission
    setTimeout(() => {
      toast.success('Form submitted successfully.')
      loading.value = false
    }, 2000)
  } catch (err) {
    loading.value = false
    toast.error('Form submission failed.')
    console.error(err)
  }
}

const goBack = () => {
  window.history.back()
}

onMounted(fetchData)
</script>

<style scoped>
.form-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.form-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.back-btn {
  padding: 0.6rem 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background-color: #3e8e41;
}

.summary-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.summary-list li {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #555;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.summary-list li:last-child {
  border-bottom: none;
}

.summary-list li strong {
  color: #333;
  display: inline-block;
  min-width: 150px;
}

.submit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  padding: 0.8rem 1.2rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background-color: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-btn:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.verification-section {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.verification-section input {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 60%;
  text-align: center;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.verification-section input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.verification-section button {
  padding: 0.8rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.verification-section button:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

/* Enhanced loader styling */
.loader {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .verification-section input {
    width: 80%;
  }
}
</style>