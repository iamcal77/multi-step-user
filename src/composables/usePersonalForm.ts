import { reactive } from 'vue'
import { personalSchema } from '@/utils/validators'
import axios from 'axios'
import { useToast } from 'vue-toastification'  // Import useToast

export function usePersonalForm(emit: (event: string, payload?: any) => void) {
  const toast = useToast()  // Initialize toast

  const form = reactive({
    name: '',
    email: '',
    phone: '',
    profileImage: null as File | null,
  })

  function handleImage(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) form.profileImage = file
  }

  async function submit() {
    // Validate form using schema
    const result = personalSchema.safeParse(form)
    if (!result.success) {
      const errors = result.error.issues.map(i => i.message).join('\n')
      toast.error(`Validation failed: ${errors}`)  // Show error toast
      console.log('Validation failed:', errors)  // Debugging log
      return
    }

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('phone', form.phone)
    if (form.profileImage) {
      formData.append('profileImage', form.profileImage)
    }

    try {
      console.log('Sending API request...')  // Debugging log
      // Make API request to submit data
      const res = await axios.post('http://localhost:3000/api/personal-info', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      console.log('API response:', res)  // Debugging log

      if (res.status === 200) {  // Ensure a successful response
        console.log('API request successful')  // Debugging log
        toast.success('Personal information submitted successfully!')

        // Save to local storage
        localStorage.setItem('personalInfo', JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone
        }))

        // Emit events
        emit('update', form)
        emit('next')
      } else {
        // Handle unexpected responses from API (e.g., if status isn't 200)
        console.log('Unexpected response status:', res.status)  // Debugging log
        toast.error('Unexpected error occurred. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // Show error toast for network or server errors
    }
  }

  return {
    form,
    handleImage,
    submit,
  }
}
