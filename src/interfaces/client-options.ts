export interface ClientOptions {
  /**
   * 🔑 Your DoodStream API key
   */
  apiKey: string

  /**
   * 🌐 Base URL for the DoodStream API
   * @default 'https://doodapi.com/api'
   */
  baseUrl?: string

  /**
   * ⏱️ Request timeout in milliseconds
   * @default 30000 (30 seconds)
   */
  timeout?: number

  /**
   * 🧠 Cache configuration options
   */
  cache?: {
    /**
     * ✅ Enable caching
     * @default true
     */
    enabled?: boolean

    /**
     * ⏱️ Default TTL for cache entries in seconds
     * @default 300 (5 minutes)
     */
    ttl?: number
  }

  /**
   * 📝 Logging configuration options
   */
  logging?: {
    /**
     * ✅ Enable logging
     * @default true
     */
    enabled?: boolean

    /**
     * 📊 Log level
     * @default 'info'
     */
    level?: "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly"
  }
}
