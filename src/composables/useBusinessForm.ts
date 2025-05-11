// useBusinessForm.ts
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const industries: string[] = ['Technology', 'Retail', 'Finance', 'Healthcare']

interface BusinessData {
  name: string
  logo: File | null
  industry: string
  size: string
  document: File | null
}

export const businessData = ref<BusinessData>({
  name: '',
  logo: null,
  industry: '',
  size: '',
  document: null,
})

export const handleLogoUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    businessData.value.logo = target.files[0]
  }
}

export const handleDocumentUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    businessData.value.document = target.files[0]
  }
}

// Remove router from here and pass it as parameter
export const nextStep = async (router: any): Promise<void> => {
  const { name, industry, size, logo, document } = businessData.value

  if (!name || !industry || !size || !logo || !document) {
    toast.warning('Please fill in all required fields.')
    return
  }

  const formData = new FormData()
  formData.append('name', name)
  formData.append('industry', industry)
  formData.append('size', size)
  formData.append('logo', logo)
  formData.append('document', document)

  try {
    const response = await fetch('http://localhost:3000/api/business-details', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      toast.success('Business details submitted successfully!')
      console.log('Business Data Submitted:', data)
      router.push('/verification-summary')
    } else {
      toast.error(`Submission failed: ${response.statusText}`)
    }
  } catch (error: any) {
    toast.error(`Error submitting form: ${error.message}`)
  }
}