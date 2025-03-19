import { DoodStreamApiError } from "./api-error"

/**
 * 🛑 Custom error class for rate limit errors
 */
export class DoodStreamRateLimitError extends DoodStreamApiError {
  /**
   * Create a new rate limit error
   *
   * @param message - Error message
   * @param response - Original response data
   * @param context - Additional context information
   */
  constructor(
    message: string = "Rate limit exceeded",
    response?: any,
    context?: Record<string, any>,
  ) {
    super(message, 429, response, context)
    this.name = "DoodStreamRateLimitError"

    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, DoodStreamRateLimitError.prototype)
  }
}
