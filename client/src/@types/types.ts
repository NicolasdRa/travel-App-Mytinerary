export interface User {
  _id: string
  avatar: string
  coverImg: string
  date: string
  details: string
  email: string
  favourites: Favourite[]
  firstName: string
  img: string
  itineraries: Itinerary[]
  activities: Activity[]
  lastName: string
  name: string
  password: string
  userName: string
}

export interface City {
  _id: string
  name: string
  img: string
  country: string
  itineraries: Itinerary[]
  favourites: Favourite[]
  guides?: User[]
  id?: string
  location?: {
    type: string
    coordinates: number[]
  }
  coord?: {
    lat: number
    lon: number
  }
  population?: number
  countryCode?: string
}

export interface Itinerary {
  _id: string
  title: string
  city: City
  category?: string
  duration?: string
  price?: string
  img: string
  details?: string
  activities: Activity[]
  favourites?: Favourite[]
  ratingAvg?: number
  likes?: number
  author: {
    _id: string
    userName: string
    img: string
  }
  comments: Comment[]
  cityName: string
}

export interface Activity {
  _id: string
  category: string
  city: City
  details?: string
  duration?: string
  img?: string
  likes: number
  price?: string
  title: string | undefined
  itinerary: Itinerary
  cityName: string
  author: {
    id: string
    userName: string
    img: string
  }
}

export interface Favourite {
  _id: string
  author: User
  city: City
  itinerary: Itinerary
  activity: Activity
  readOnly: boolean
  sourceType: string
  sourceId: string
  userId: string
}

export interface Comment {
  _id: string
  sourceType: string
  sourceId: string
  rating?: number
  summary?: string
  description?: string
  city?: City
  itinerary?: Itinerary
  activity?: Activity
  userName: string
  userImg: string
  author: {
    _id: string
    userName: string
    img: string
  }
  createdAt: Date
}

// ERRORS
export interface MyError {
  message: string
  resolution?: string
}

export const enum ErrorMessages {
  'default' = 'Something went wrong',
  'DBerror' = 'Database error',
}

// API Response Types
export interface ApiResponse<T> {
  status: string
  results?: number
  data: T
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number
  totalPages: number
  totalResults: number
}

// Authentication Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData extends LoginCredentials {
  userName: string
  passwordConfirm: string
  firstName?: string
  lastName?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

// Form Types
export interface FormState {
  [key: string]: string | number | boolean
}

// Component Props Types
export interface ChildrenProps {
  children: React.ReactNode
}

export interface ClassNameProps {
  className?: string
}
