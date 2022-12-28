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
  lastName: string
  name: string
  password: string
  userName: string
}

export interface City {
  _id: string
  name: string
  img: string
  country?: string
  itineraries: Itinerary[]
  favourites: Favourite[]
  guides?: User[]
  id?: string
  location?: {
    type: string
    coordinates: number[]
  }
}

export interface Itinerary {
  _id: string
  title: string
  city: City
  category?: string
  duration?: number
  price?: number
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
}

export interface Activity {
  _id: string
  category: string
  city: City
  details?: string
  duration: number
  img?: string
  likes: number
  price: number
  title: string | undefined
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
export type MyError = {
  message: string
  resolution: string | undefined
}
export const enum ErrorMessages {
  'default' = 'Something went wrong',
  'DBerror' = 'Database error',
}
