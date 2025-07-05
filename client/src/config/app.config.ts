// Application Configuration
export const APP_CONFIG = {
  name: 'Mytinerary',
  version: '1.1.0',
  environment: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
}

// UI Configuration
export const UI_CONFIG = {
  itemsPerPage: 12,
  debounceDelay: 500,
  toastDuration: 4000,
  imageUpload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    acceptedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    uploadPreset: 'travel-app'
  },
  animation: {
    duration: 300,
    easing: 'ease-in-out'
  }
}

// Form Configuration
export const FORM_CONFIG = {
  validation: {
    minPasswordLength: 6,
    maxTitleLength: 100,
    maxDescriptionLength: 500,
    minUsernameLength: 3,
    maxUsernameLength: 20
  },
  categories: [
    'Adventure',
    'Culture',
    'Food',
    'History',
    'Nature',
    'Nightlife',
    'Shopping',
    'Sightseeing',
    'Sports',
    'Other'
  ],
  priceOptions: ['€', '€€', '€€€', '€€€€'],
  durationOptions: ['0.5', '1', '2', '3', '4', '5', '6', '7', '8']
}

// Route Configuration
export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  listing: '/listing',
  city: (name: string) => `/citypage/${name}`,
  itinerary: (title: string) => `/itinerarypage/${title}`,
  activity: (title: string) => `/activitypage/${title}`,
  profile: (id: string) => `/profile/${id}`,
  passwordReset: '/reset-password'
}

// Storage Keys
export const STORAGE_KEYS = {
  authToken: 'jwt',
  lastPath: 'lastPath',
  theme: 'theme',
  language: 'language'
}