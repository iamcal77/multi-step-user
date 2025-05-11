import { usePersonalFormStore } from '@/store/personalFormStore'
import { personalSchema } from '@/utils/validators'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export function usePersonalForm(emit: (event: string, payload?: any) => void) {
  const toast = useToast()
  const form = usePersonalFormStore()

  function handleImage(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      form.setProfileImage(file)
    }
  }

  async function submit() {
    const result = personalSchema.safeParse(form)
    if (!result.success) {
      const errors = result.error.issues.map(i => i.message).join('\n')
      toast.error(`Validation failed: ${errors}`)
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
      const res = await axios.post('http://localhost:3000/api/personal-info', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (res.status === 200) {
        toast.success('Personal information submitted successfully!')

        emit('update', form)
        emit('next')
      } else {
        toast.error('Unexpected error occurred. Please try again.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Network error. Please try again later.')
    }
  }

  return {
    form,
    handleImage,
    submit,
  }
}
