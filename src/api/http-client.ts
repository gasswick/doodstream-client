import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { Logger } from "winston"
import { CacheManager } from "../cache/cache-manager"
import { ClientOptions } from "../interfaces/client-options"
import { ErrorFactory } from "../errors/error-factory"

/**
 * 🌐 Base HTTP client for making API requests
 */
export class HttpClient {
  /**
   * 🔄 Axios instance
   */
  private client: AxiosInstance

  /**
   * 🔑 API key
   */
  private apiKey: string

  /**
   * 📝 Logger instance
   */
  private logger: Logger

  /**
   * 🧠 Cache manager
   */
  private cacheManager: CacheManager

  /**
   * Create a new HTTP client
   *
   * @param options - Client options
   * @param logger - Logger instance
   * @param cacheManager - Cache manager
   */
  constructor(
    options: ClientOptions,
    logger: Logger,
    cacheManager: CacheManager,
  ) {
    this.apiKey = options.apiKey
    this.logger = logger
    this.cacheManager = cacheManager

    // Create axios instance
    this.client = axios.create({
      baseURL: options.baseUrl || "https://doodapi.com/api",
      timeout: options.timeout || 30000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    // Add request interceptor for logging
    this.client.interceptors.request.use((config) => {
      this.logger.debug("🔄 Request", {
        method: config.method?.toUpperCase(),
        url: config.url,
        params: config.params,
      })
      return config
    })

    // Add response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        this.logger.debug("✅ Response", {
          status: response.status,
          url: response.config.url,
          data: response.data,
        })
        return response
      },
      (error) => {
        this.logger.error("❌ Request failed", {
          error: error.message,
          config: error.config,
          response: error.response?.data,
        })
        return Promise.reject(error)
      },
    )
  }

  /**
   * 🔍 Send a GET request
   *
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @param config - Axios request config
   * @param enableCache - Whether to use caching for this request
   * @returns Promise with response data
   */
  async get<T>(
    endpoint: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {},
    enableCache: boolean = true,
  ): Promise<T> {
    try {
      // Add API key to parameters
      const queryParams = { ...params, key: this.apiKey }

      // Check cache if enabled
      if (enableCache) {
        const cacheKey = this.cacheManager.createKey(endpoint, queryParams)
        const cachedData = this.cacheManager.get<T>(cacheKey)

        if (cachedData) {
          return cachedData
        }
      }

      // Make the request
      const response = await this.client.get<T>(endpoint, {
        ...config,
        params: queryParams,
      })

      // Handle unexpected response format
      if (!response.data) {
        throw ErrorFactory.createFromResponse(
          response,
          "Empty response received",
        )
      }

      // Cache the response if enabled
      if (enableCache) {
        const cacheKey = this.cacheManager.createKey(endpoint, queryParams)
        this.cacheManager.set(cacheKey, response.data)
      }

      return response.data
    } catch (error: any) {
      // Handle axios errors
      if (error.isAxiosError) {
        // Handle network errors
        if (error.code === "ECONNABORTED") {
          throw ErrorFactory.createTimeoutError(error)
        }

        if (!error.response) {
          throw ErrorFactory.createNetworkError(error)
        }

        // Handle API errors with responses
        throw ErrorFactory.createFromResponse(error.response)
      }

      // Rethrow any other errors
      throw error
    }
  }

  /**
   * 📤 Send a POST request
   *
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @param params - Query parameters
   * @param config - Axios request config
   * @returns Promise with response data
   */
  async post<T>(
    endpoint: string,
    data: any = {},
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      // Add API key to parameters
      const queryParams = { ...params, key: this.apiKey }

      // Make the request
      const response = await this.client.post<T>(endpoint, data, {
        ...config,
        params: queryParams,
      })

      // Handle unexpected response format
      if (!response.data) {
        throw ErrorFactory.createFromResponse(
          response,
          "Empty response received",
        )
      }

      return response.data
    } catch (error: any) {
      // Handle axios errors
      if (error.isAxiosError) {
        // Handle network errors
        if (error.code === "ECONNABORTED") {
          throw ErrorFactory.createTimeoutError(error)
        }

        if (!error.response) {
          throw ErrorFactory.createNetworkError(error)
        }

        // Handle API errors with responses
        throw ErrorFactory.createFromResponse(error.response)
      }

      // Rethrow any other errors
      throw error
    }
  }

  /**
   * 🧹 Clear the cache for a specific endpoint
   *
   * @param endpoint - API endpoint
   * @param params - Query parameters (excluding API key)
   */
  clearCache(endpoint: string, params: Record<string, any> = {}): void {
    const cacheKey = this.cacheManager.createKey(endpoint, params)
    this.cacheManager.delete(cacheKey)
  }

  /**
   * 🧹 Clear the entire cache
   */
  clearAllCache(): void {
    this.cacheManager.clear()
  }
}
