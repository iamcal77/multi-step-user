<template>
  <div class="form-container">
    <button @click="goBack" class="back-btn">Back</button>
    <h2 class="form-title">Business Details</h2>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="business-name">Business Name</label>
        <input
          type="text"
          id="business-name"
          v-model="businessData.name"
          placeholder="Enter your business name"
          required
        />
      </div>

      <div class="form-group">
        <label for="business-logo">Business Logo (Upload PNG/JPG)</label>
        <input
          type="file"
          id="business-logo"
          accept="image/png, image/jpeg"
          @change="handleLogoUpload"
          class="input-file"
        />
      </div>

      <div class="form-group">
        <label for="industry">Industry</label>
        <select id="industry" v-model="businessData.industry" required class="select-input">
          <option v-for="industry in industries" :key="industry" :value="industry">
            {{ industry }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="company-size">Company Size</label>
        <select id="company-size" v-model="businessData.size" required class="select-input">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div class="form-group">
        <label for="business-doc">Business Document (PDF only)</label>
        <input
          type="file"
          id="business-doc"
          accept="application/pdf"
          @change="handleDocumentUpload"
          class="input-file"
        />
      </div>

      <button type="submit" class="submit-btn">Next</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  industries,
  businessData,
  handleLogoUpload,
  handleDocumentUpload,
  nextStep,
} from '@/composables/useBusinessForm'

const router = useRouter()

const submitForm = async () => {
  try {
    await nextStep(router)
  } catch (error) {
    console.error('Form submission error:', error)
  }
}

// Function to navigate to the previous page
const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #111827;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

input[type="text"],
.select-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

input[type="text"]:focus,
.select-input:focus {
  border-color: #2563eb;
}

.input-file {
  font-size: 0.95rem;
  padding: 0.25rem 0;
  color: #1f2937;
}

.submit-btn {
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #1d4ed8;
}

/* Back button styling */
.back-btn {
  padding: 0.6rem 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1rem;
}
</style>
