import { z } from 'zod'

export const authSchemas = {
  register: z.object({
    body: z.object({
      name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters'),
      email: z.string().email('Invalid email address format'),
      password: z.string().min(6, 'Password must be at least 6 characters').max(128, 'Password too long')
    })
  }),

  login: z.object({
    body: z.object({
      email: z.string().email('Invalid email address format'),
      password: z.string().min(1, 'Password is required')
    })
  })
}

export const aiSchemas = {
  getRoadmap: z.object({
    body: z.object({
      company: z.string().min(1, 'Company name is required'),
      role: z.string().min(1, 'Role is required'),
      currentSkills: z.string().optional(),
      language: z.string().default('English')
    })
  }),
  
  careerPredictor: z.object({
    body: z.object({
      currentRole: z.string().min(1, 'Current role is required'),
      skills: z.union([z.string(), z.array(z.string())]).optional(),
      interests: z.union([z.string(), z.array(z.string())]).optional(),
      education: z.string().optional()
    })
  })
}
