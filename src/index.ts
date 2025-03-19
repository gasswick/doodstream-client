import { Logger } from "winston"
import {
  AccountApi,
  FileApi,
  FolderApi,
  HttpClient,
  RemoteUploadApi,
  UploadApi,
} from "./api"
import { CacheManager } from "./cache/cache-manager"
import { ClientOptions } from "./interfaces/client-options"
import { createLogger } from "./utils"

/**
 * 🚀 DoodStream API client
 *
 * Provides access to all DoodStream API functionality with robust error handling,
 * caching, and logging.
 */
export class DoodStreamClient {
  /**
   * 📝 Logger instance
   */
  private logger: Logger

  /**
   * 🧠 Cache manager
   */
  private cacheManager: CacheManager

  /**
   * 🌐 HTTP client
   */
  private httpClient: HttpClient

  /**
   * 👤 Account API
   */
  readonly account: AccountApi

  /**
   * 📄 File API
   */
  readonly file: FileApi

  /**
   * 📁 Folder API
   */
  readonly folder: FolderApi

  /**
   * 🔗 Remote upload API
   */
  readonly remoteUpload: RemoteUploadApi

  /**
   * 📤 Upload API
   */
  readonly upload: UploadApi

  /**
   * Create a new DoodStream client
   *
   * @param options - Client options
   */
  constructor(options: ClientOptions) {
    if (!options.apiKey) {
      throw new Error("🔑 API key is required")
    }

    // Initialize logger
    this.logger = createLogger(options)
    this.logger.info("🚀 Initializing DoodStream client")

    // Initialize cache manager
    this.cacheManager = new CacheManager(options, this.logger)

    // Initialize HTTP client
    this.httpClient = new HttpClient(options, this.logger, this.cacheManager)

    // Initialize API modules
    this.account = new AccountApi(this.httpClient)
    this.file = new FileApi(this.httpClient)
    this.folder = new FolderApi(this.httpClient)
    this.remoteUpload = new RemoteUploadApi(this.httpClient)
    this.upload = new UploadApi(this.httpClient)

    this.logger.info("✅ DoodStream client initialized successfully")
  }

  /**
   * 🧹 Clear all cached data
   */
  clearCache(): void {
    this.logger.info("🧹 Clearing all cache")
    this.httpClient.clearAllCache()
  }
}

// Export all types and interfaces
export * from "./interfaces/client-options"
export * from "./interfaces/api-params"
export * from "./interfaces/api-responses"
export * from "./errors"

// Default export
export default DoodStreamClient
