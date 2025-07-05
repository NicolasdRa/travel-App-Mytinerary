// Core API response types
export interface ApiResponse<T = any> {
  status: 'success' | 'fail' | 'error'
  data: T
  message?: string
  pagination?: PaginationMeta
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiError {
  status: 'fail' | 'error'
  message: string
  statusCode?: number
  code?: string
  errors?: Record<string, string[]>
  stack?: string
}

// Authentication types
export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  userName: string
  email: string
  password: string
  passwordConfirm: string
}

export interface User {
  _id: string
  userName: string
  firstName?: string
  lastName?: string
  email: string
  coverImg?: string
  profileImg?: string
  role: 'user' | 'admin'
  details?: string
  itineraries?: string[]
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  status: 'success'
  token: string
  data: User
}

// Entity types
export interface City {
  _id: string
  name: string
  country: string
  description?: string
  img?: string
  population?: number
  currency?: string
  language?: string
  timezone?: string
  createdAt: string
  updatedAt: string
}

export interface Itinerary {
  _id: string
  title: string
  city: City | string
  cityName: string
  author: User | string
  img?: string
  category: string
  price: number
  duration: number
  details: string
  likes: number
  activities?: Activity[]
  comments?: Comment[]
  favourites?: Favourite[]
  createdAt: string
  updatedAt: string
}

export interface Activity {
  _id: string
  title: string
  itinerary: Itinerary | string
  city: City | string
  cityName: string
  author: User | string
  img?: string
  category: string
  price: number
  duration: number
  details: string
  likes: number
  comments?: Comment[]
  favourites?: Favourite[]
  createdAt: string
  updatedAt: string
}

export interface Comment {
  _id: string
  content: string
  author: User | string
  city?: City | string
  itinerary?: Itinerary | string
  activity?: Activity | string
  createdAt: string
  updatedAt: string
}

export interface Favourite {
  _id: string
  author: User | string
  city?: City | string
  itinerary?: Itinerary | string
  activity?: Activity | string
  createdAt: string
  updatedAt: string
}

// Request/Response type utilities
export type CreateUserData = Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'role'>
export type UpdateUserData = Partial<CreateUserData>

export type CreateCityData = Omit<City, '_id' | 'createdAt' | 'updatedAt'>
export type UpdateCityData = Partial<CreateCityData>

export type CreateItineraryData = Omit<Itinerary, '_id' | 'createdAt' | 'updatedAt' | 'likes' | 'activities' | 'comments' | 'favourites'>
export type UpdateItineraryData = Partial<CreateItineraryData>

export type CreateActivityData = Omit<Activity, '_id' | 'createdAt' | 'updatedAt' | 'likes' | 'comments' | 'favourites'>
export type UpdateActivityData = Partial<CreateActivityData>

export type CreateCommentData = Omit<Comment, '_id' | 'createdAt' | 'updatedAt'>
export type UpdateCommentData = Partial<Pick<Comment, 'content'>>

export type CreateFavouriteData = Omit<Favourite, '_id' | 'createdAt' | 'updatedAt'>

// API endpoint parameter types
export interface UserEndpointParams {
  userId?: string
}

export interface CityEndpointParams {
  cityId?: string
  cityName?: string
}

export interface ItineraryEndpointParams {
  itineraryId?: string
  itineraryTitle?: string
  cityId?: string
}

export interface ActivityEndpointParams {
  activityId?: string
  activityTitle?: string
  itineraryId?: string
}

export interface CommentEndpointParams {
  commentId?: string
  sourceType?: 'city' | 'itinerary' | 'activity'
  sourceId?: string
}

export interface FavouriteEndpointParams {
  favouriteId?: string
  userId?: string
}

// Query parameter types
export interface BaseQueryParams {
  page?: number
  limit?: number
  sort?: string
  fields?: string
  populate?: string
}

export interface SearchQueryParams extends BaseQueryParams {
  search?: string
  category?: string
  priceMin?: number
  priceMax?: number
  durationMin?: number
  durationMax?: number
}

export interface FilterQueryParams extends BaseQueryParams {
  filter?: Record<string, any>
  dateFrom?: string
  dateTo?: string
}

// File upload types
export interface FileUploadData {
  file: File
  folder?: string
  transformation?: string
}

export interface UploadResponse {
  url: string
  publicId: string
  format: string
  width: number
  height: number
  bytes: number
}

// Utility types for API functions
export type ApiFunction<TParams = void, TResponse = any> = 
  TParams extends void 
    ? () => Promise<TResponse>
    : (params: TParams) => Promise<TResponse>

export type ApiWithId<TResponse = any> = (id: string) => Promise<TResponse>

export type ApiWithData<TData = any, TResponse = any> = (data: TData) => Promise<TResponse>

export type ApiWithIdAndData<TData = any, TResponse = any> = (id: string, data: TData) => Promise<TResponse>

// Generic API operation types
export interface BaseApiOperations<T, CreateT = any, UpdateT = any> {
  getAll: ApiFunction<BaseQueryParams, T[]>
  getById: ApiWithId<T>
  create: ApiWithData<CreateT, T>
  update: ApiWithIdAndData<UpdateT, T>
  delete: ApiWithId<void>
}

// Specialized operation types
export interface SearchableApiOperations<T> {
  search: ApiFunction<SearchQueryParams, T[]>
  getByField: <K extends keyof T>(field: K, value: T[K]) => Promise<T[]>
}

export interface RelationalApiOperations<T> {
  getRelated: <R = any>(id: string, relation: string) => Promise<R[]>
  addRelation: (id: string, relation: string, relatedId: string) => Promise<void>
  removeRelation: (id: string, relation: string, relatedId: string) => Promise<void>
}

// Type guards
export const isApiErrorResponse = (response: any): response is ApiError => {
  return response && response.status && ['fail', 'error'].includes(response.status)
}

export const isApiResponse = <T>(response: any): response is ApiResponse<T> => {
  return response && response.status === 'success' && response.data !== undefined
}

// Type-safe endpoint builders
export type EndpointBuilder<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends (...args: any[]) => string 
    ? T[K] 
    : () => T[K]
}

// Advanced type utilities
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}

// API configuration types
export interface ApiConfig {
  baseUrl: string
  apiVersion: string
  timeout: number
  withCredentials: boolean
  retries?: number
  retryDelay?: number
}

export interface RequestOptions {
  timeout?: number
  retries?: number
  cache?: boolean
  skipAuth?: boolean
  skipInterceptors?: boolean
}