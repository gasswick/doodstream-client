import NodeCache from "node-cache"
import { ClientOptions } from "../interfaces/client-options"
import { Logger } from "winston"

/**
 * 🧠 Cache manager for DoodStream API responses
 */
export class CacheManager {
  /**
   * 🗃️ Node-cache instance
   */
  private cache: NodeCache

  /**
   * 📝 Logger instance
   */
  private logger: Logger

  /**
   * ✅ Flag indicating if caching is enabled
   */
  private enabled: boolean

  /**
   * Create a new cache manager
   *
   * @param options - Client options
   * @param logger - Logger instance
   */
  constructor(options: ClientOptions, logger: Logger) {
    // Check if caching is enabled
    this.enabled = options?.cache?.enabled !== false

    // Set default TTL (5 minutes = 300 seconds)
    const defaultTtl = options?.cache?.ttl || 300

    // Store logger reference
    this.logger = logger

    // Create cache instance
    this.cache = new NodeCache({
      stdTTL: defaultTtl,
      checkperiod: Math.floor(defaultTtl / 10), // Check for expired keys every 1/10 of TTL
      useClones: false, // Don't clone values (for performance)
    })

    this.logger.debug("🧠 Cache initialized", {
      enabled: this.enabled,
      ttl: defaultTtl,
    })
  }

  /**
   * 🔍 Get a value from the cache
   *
   * @param key - Cache key
   * @returns The cached value or undefined if not found
   */
  get<T>(key: string): T | undefined {
    if (!this.enabled) {
      return undefined
    }

    const value = this.cache.get<T>(key)

    if (value !== undefined) {
      this.logger.debug(`🔍 Cache hit: ${key}`)
      return value
    }

    this.logger.debug(`🔍 Cache miss: ${key}`)
    return undefined
  }

  /**
   * 💾 Set a value in the cache
   *
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttl - Optional TTL in seconds for this specific entry
   * @returns true if successful, false otherwise
   */
  set<T>(key: string, value: T, ttl?: number): boolean {
    if (!this.enabled) {
      return false
    }

    const success = this.cache.set(key, value, ttl)
    this.logger.debug(`💾 Cache set: ${key}`, { success, ttl })
    return success
  }

  /**
   * 🗑️ Delete a value from the cache
   *
   * @param key - Cache key to delete
   * @returns true if successful, false otherwise
   */
  delete(key: string): boolean {
    if (!this.enabled) {
      return false
    }

    const deleted = this.cache.del(key)
    this.logger.debug(`🗑️ Cache delete: ${key}`, { success: deleted > 0 })
    return deleted > 0
  }

  /**
   * 🧹 Clear all values from the cache
   */
  clear(): void {
    if (!this.enabled) {
      return
    }

    this.cache.flushAll()
    this.logger.debug("🧹 Cache cleared")
  }

  /**
   * 🔑 Create a cache key from parameters
   *
   * @param endpoint - API endpoint
   * @param params - Request parameters
   * @returns A unique cache key
   */
  createKey(endpoint: string, params: Record<string, any> = {}): string {
    // Exclude API key from cache key for security
    const { key, ...restParams } = params

    // Sort parameters by key for consistent cache keys
    const sortedParams = Object.entries(restParams)
      .sort(([a], [b]) => a.localeCompare(b))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

    // Create a deterministic key
    return `${endpoint}:${JSON.stringify(sortedParams)}`
  }
}
