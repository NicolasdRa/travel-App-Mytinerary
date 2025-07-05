import { httpGet, httpPost, httpPut, httpPatch, httpDelete, uploadFile } from './http.utils'

// Generic entity interface
export interface BaseEntity {
  _id?: string
  id?: string
  createdAt?: string
  updatedAt?: string
}

// CRUD operation types
export interface CrudOperations<T extends BaseEntity, CreateT = Omit<T, '_id' | 'id' | 'createdAt' | 'updatedAt'>, UpdateT = Partial<CreateT>> {
  getAll: (params?: Record<string, any>) => Promise<T[]>
  getById: (id: string) => Promise<T>
  create: (data: CreateT) => Promise<T>
  update: (id: string, data: UpdateT) => Promise<T>
  delete: (id: string) => Promise<void>
}

// Extended CRUD operations for entities with file uploads
export interface CrudWithFileOperations<T extends BaseEntity, CreateT = Omit<T, '_id' | 'id' | 'createdAt' | 'updatedAt'>, UpdateT = Partial<CreateT>> extends CrudOperations<T, CreateT, UpdateT> {
  createWithFile: (formData: FormData) => Promise<T>
  updateWithFile: (id: string, formData: FormData) => Promise<T>
}

// Query parameters for filtering, sorting, and pagination
export interface QueryParams {
  // Pagination
  page?: number
  limit?: number
  skip?: number
  
  // Sorting
  sort?: string
  sortBy?: string
  order?: 'asc' | 'desc'
  
  // Filtering
  filter?: Record<string, any>
  search?: string
  
  // Field selection
  fields?: string
  select?: string
  populate?: string
  
  // Custom parameters
  [key: string]: any
}

// Create basic CRUD operations for an entity
export const createCrudOperations = <T extends BaseEntity, CreateT = Omit<T, '_id' | 'id' | 'createdAt' | 'updatedAt'>, UpdateT = Partial<CreateT>>(
  baseEndpoint: string
): CrudOperations<T, CreateT, UpdateT> => {
  const buildUrl = (path = '') => `${baseEndpoint}${path}`
  
  const buildQueryString = (params?: QueryParams): string => {
    if (!params || Object.keys(params).length === 0) return ''
    
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          searchParams.append(key, JSON.stringify(value))
        } else {
          searchParams.append(key, String(value))
        }
      }
    })
    
    return `?${searchParams.toString()}`
  }

  return {
    getAll: async (params?: QueryParams): Promise<T[]> => {
      const queryString = buildQueryString(params)
      return httpGet<T[]>(buildUrl(queryString))
    },

    getById: async (id: string): Promise<T> => {
      return httpGet<T>(buildUrl(`/${id}`))
    },

    create: async (data: CreateT): Promise<T> => {
      return httpPost<T>(buildUrl(), data)
    },

    update: async (id: string, data: UpdateT): Promise<T> => {
      return httpPut<T>(buildUrl(`/${id}`), data)
    },

    delete: async (id: string): Promise<void> => {
      return httpDelete<void>(buildUrl(`/${id}`))
    }
  }
}

// Create CRUD operations with file upload support
export const createCrudWithFileOperations = <T extends BaseEntity, CreateT = Omit<T, '_id' | 'id' | 'createdAt' | 'updatedAt'>, UpdateT = Partial<CreateT>>(
  baseEndpoint: string
): CrudWithFileOperations<T, CreateT, UpdateT> => {
  const baseCrud = createCrudOperations<T, CreateT, UpdateT>(baseEndpoint)
  const buildUrl = (path = '') => `${baseEndpoint}${path}`

  return {
    ...baseCrud,
    
    createWithFile: async (formData: FormData): Promise<T> => {
      return uploadFile<T>(buildUrl(), formData)
    },

    updateWithFile: async (id: string, formData: FormData): Promise<T> => {
      return uploadFile<T>(buildUrl(`/${id}`), formData)
    }
  }
}

// Specialized operations factory for common patterns
export const createSpecializedOperations = <T extends BaseEntity>(baseEndpoint: string) => {
  const buildUrl = (path = '') => `${baseEndpoint}${path}`

  return {
    // Get by field value
    getByField: <K extends keyof T>(field: K, value: T[K]): Promise<T[]> => {
      return httpGet<T[]>(buildUrl(`?${String(field)}=${value}`))
    },

    // Get first by field value
    getFirstByField: <K extends keyof T>(field: K, value: T[K]): Promise<T> => {
      return httpGet<T>(buildUrl(`/${String(field)}/${value}`))
    },

    // Search operations
    search: (query: string, params?: QueryParams): Promise<T[]> => {
      const searchParams = { search: query, ...params }
      const queryString = new URLSearchParams(Object.entries(searchParams).map(([k, v]) => [k, String(v)])).toString()
      return httpGet<T[]>(buildUrl(`?${queryString}`))
    },

    // Batch operations
    createMany: (items: Omit<T, '_id' | 'id' | 'createdAt' | 'updatedAt'>[]): Promise<T[]> => {
      return httpPost<T[]>(buildUrl('/batch'), { items })
    },

    updateMany: (updates: { id: string; data: Partial<T> }[]): Promise<T[]> => {
      return httpPut<T[]>(buildUrl('/batch'), { updates })
    },

    deleteMany: (ids: string[]): Promise<void> => {
      return httpDelete<void>(buildUrl('/batch'), { data: { ids } })
    },

    // Relationship operations
    getRelated: <R = any>(id: string, relation: string): Promise<R[]> => {
      return httpGet<R[]>(buildUrl(`/${id}/${relation}`))
    },

    addRelation: <R = any>(id: string, relation: string, relatedId: string): Promise<R> => {
      return httpPost<R>(buildUrl(`/${id}/${relation}/${relatedId}`))
    },

    removeRelation: (id: string, relation: string, relatedId: string): Promise<void> => {
      return httpDelete<void>(buildUrl(`/${id}/${relation}/${relatedId}`))
    }
  }
}

// Utility function to create complete API operations for an entity
export const createEntityOperations = <T extends BaseEntity, CreateT = Omit<T, '_id' | 'id' | 'createdAt' | 'updatedAt'>, UpdateT = Partial<CreateT>>(
  baseEndpoint: string,
  options: { withFileUploads?: boolean; withSpecializedOps?: boolean } = {}
) => {
  const { withFileUploads = false, withSpecializedOps = false } = options

  const crud = withFileUploads 
    ? createCrudWithFileOperations<T, CreateT, UpdateT>(baseEndpoint)
    : createCrudOperations<T, CreateT, UpdateT>(baseEndpoint)

  const specialized = withSpecializedOps 
    ? createSpecializedOperations<T>(baseEndpoint)
    : {}

  return {
    ...crud,
    ...specialized
  }
}

// Type-safe endpoint builder
export const buildEndpoint = (base: string) => ({
  base: () => base,
  byId: (id: string) => `${base}/${id}`,
  byField: (field: string, value: string) => `${base}/${field}/${value}`,
  relation: (id: string, relation: string) => `${base}/${id}/${relation}`,
  custom: (path: string) => `${base}/${path}`
})