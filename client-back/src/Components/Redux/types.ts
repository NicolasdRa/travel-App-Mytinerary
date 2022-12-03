export interface User {
  _id: string
  name: string
  email: string
  password: string
  avatar: string
  date: string
  itineraries: Itinerary[]
}

export interface City {
  _id: string
  name: string
  img: string
  country?: string
  itineraries: Itinerary[]
  favourites: Favourite[]
}

export interface Itinerary {
  _id: string
  title: string
  city: City
  category?: string
  duration?: number
  price?: number
  img?: string
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
  city: City
  category: string
  likes: number
  duration: number
  price: number
  img?: string
  details?: string
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
