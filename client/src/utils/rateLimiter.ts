interface RateLimiterOptions {
  maxRequests: number
  windowMs: number
  retryAfterMs?: number
  minTimeBetweenRequests?: number
}

interface RateLimiterState {
  requests: number[]
  lastResetTime: number
}

export class RateLimiter {
  private state: RateLimiterState
  private options: RateLimiterOptions
  private lastRequestTime: number = 0

  constructor(options: RateLimiterOptions) {
    this.options = {
      retryAfterMs: 60000, // Default retry after 1 minute
      minTimeBetweenRequests: 0, // Default no minimum time
      ...options
    }
    this.state = {
      requests: [],
      lastResetTime: Date.now()
    }
  }

  canMakeRequest(): boolean {
    const now = Date.now()
    
    // Check minimum time between requests
    if (this.options.minTimeBetweenRequests && this.lastRequestTime > 0) {
      const timeSinceLastRequest = now - this.lastRequestTime
      if (timeSinceLastRequest < this.options.minTimeBetweenRequests) {
        return false
      }
    }
    
    // Remove requests older than the window
    this.state.requests = this.state.requests.filter(
      timestamp => now - timestamp < this.options.windowMs
    )

    // Check if we've exceeded the limit
    return this.state.requests.length < this.options.maxRequests
  }

  recordRequest(): void {
    const now = Date.now()
    this.state.requests.push(now)
    this.lastRequestTime = now
  }

  getRetryAfter(): number {
    const now = Date.now()
    
    if (this.canMakeRequest()) {
      return 0
    }

    // Check if we're blocked by minimum time between requests
    if (this.options.minTimeBetweenRequests && this.lastRequestTime > 0) {
      const timeSinceLastRequest = now - this.lastRequestTime
      if (timeSinceLastRequest < this.options.minTimeBetweenRequests) {
        return this.options.minTimeBetweenRequests - timeSinceLastRequest
      }
    }

    // Find the oldest request in the window
    const oldestRequest = Math.min(...this.state.requests)
    const retryAfter = oldestRequest + this.options.windowMs - now
    
    return Math.max(retryAfter, this.options.retryAfterMs!)
  }

  reset(): void {
    this.state.requests = []
    this.state.lastResetTime = Date.now()
  }
}

// Create a singleton instance for GeoDB API
// GeoDB has a strict 1 request per second limit on the free tier
export const geoDbRateLimiter = new RateLimiter({
  maxRequests: 1, // 1 request
  windowMs: 1000, // per second (1000ms)
  retryAfterMs: 1000, // retry after 1 second if rate limited
  minTimeBetweenRequests: 1000 // Enforce minimum 1 second between requests
})

// Simple in-memory cache for recent searches
interface CacheEntry<T> {
  data: T
  timestamp: number
}

export class SimpleCache<T> {
  private cache: Map<string, CacheEntry<T>>
  private ttl: number

  constructor(ttlMs: number = 5 * 60 * 1000) { // Default 5 minutes
    this.cache = new Map()
    this.ttl = ttlMs
  }

  get(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const now = Date.now()
    if (now - entry.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  clear(): void {
    this.cache.clear()
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now()
    const entries = Array.from(this.cache.entries())
    for (const [key, entry] of entries) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key)
      }
    }
  }
}

// Create a cache instance for city searches
// Longer cache time reduces API calls and helps avoid rate limits
export const citySearchCache = new SimpleCache<any[]>(30 * 60 * 1000) // 30 minutes TTL