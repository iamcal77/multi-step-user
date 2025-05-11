import { z } from 'zod'

export const personalSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  profileImage: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, 'Max 2MB')
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), 'Invalid file type'),
})

export const businessSchema = z.object({
  name: z.string().min(1),
  logo: z.instanceof(File).optional(),
  industry: z.string().min(1),
  size: z.string().min(1),
  document: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Max 5MB')
    .refine((file) => file.type === 'application/pdf', 'Must be PDF'),
})
