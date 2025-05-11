<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit" class="form">
      <h2 class="form-title">Personal Information</h2>

      <!-- Name Input -->
      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="form.name"
          id="name"
          placeholder="Your Name"
          class="input-field"
          required
        />
      </div>

      <!-- Email Input -->
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="form.email"
          id="email"
          placeholder="Your Email"
          class="input-field"
          required
        />
      </div>

      <!-- Phone Input -->
      <div class="form-group">
        <label for="phone" class="form-label">Phone</label>
        <input
          v-model="form.phone"
          id="phone"
          placeholder="Your Phone"
          class="input-field"
          required
        />
      </div>

      <!-- Profile Image Input -->
      <div class="form-group">
        <label for="profile-image" class="form-label">Profile Image</label>
        <input
          type="file"
          id="profile-image"
          @change="handleImage"
          class="input-file"
        />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-btn">
        Next
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { usePersonalForm } from '@/composables/usePersonalForm'
import { useRouter } from 'vue-router'

const { form, handleImage, submit } = usePersonalForm()
const router = useRouter()

const handleSubmit = async () => {
  await submit()
  router.push('/business-details') // Navigate to next page
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

.form-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.input-field, .input-file {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.input-field:focus, .input-file:focus {
  border-color: #2563eb;
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
</style>
