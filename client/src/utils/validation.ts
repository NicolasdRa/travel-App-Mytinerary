import { FORM_CONFIG } from '../config'

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation
export const isValidPassword = (password: string): boolean => {
  return password.length >= FORM_CONFIG.validation.minPasswordLength
}

// Username validation
export const isValidUsername = (username: string): boolean => {
  const { minUsernameLength, maxUsernameLength } = FORM_CONFIG.validation
  return username.length >= minUsernameLength && username.length <= maxUsernameLength
}

// Form validation helpers
export const validateLoginForm = (email: string, password: string): string[] => {
  const errors: string[] = []
  
  if (!email) {
    errors.push('Email is required')
  } else if (!isValidEmail(email)) {
    errors.push('Please enter a valid email')
  }
  
  if (!password) {
    errors.push('Password is required')
  }
  
  return errors
}

export const validateSignupForm = (
  email: string, 
  password: string, 
  passwordConfirm: string,
  userName: string
): string[] => {
  const errors: string[] = []
  
  if (!email) {
    errors.push('Email is required')
  } else if (!isValidEmail(email)) {
    errors.push('Please enter a valid email')
  }
  
  if (!password) {
    errors.push('Password is required')
  } else if (!isValidPassword(password)) {
    errors.push(`Password must be at least ${FORM_CONFIG.validation.minPasswordLength} characters`)
  }
  
  if (password !== passwordConfirm) {
    errors.push('Passwords do not match')
  }
  
  if (!userName) {
    errors.push('Username is required')
  } else if (!isValidUsername(userName)) {
    errors.push(`Username must be between ${FORM_CONFIG.validation.minUsernameLength} and ${FORM_CONFIG.validation.maxUsernameLength} characters`)
  }
  
  return errors
}

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}