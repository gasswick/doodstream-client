import { DoodStreamApiError } from "./api-error"
import { DoodStreamRateLimitError } from "./rate-limit-error"

/**
 * 🏭 Factory for creating DoodStream API errors
 */
export class ErrorFactory {
  /**
   * 🛠️ Create an appropriate error object based on the response
   *
   * @param response - The error response from the API
   * @param defaultMessage - Default error message if none can be extracted
   * @returns An appropriate error object
   */
  static createFromResponse(
    response: any,
    defaultMessage: string = "Unknown API error",
  ): Error {
    // Extract relevant information
    const status = response?.status || response?.data?.status || 500
    const message = response?.data?.msg || response?.message || defaultMessage

    // Handle rate limit errors
    if (status === 429 || message.includes("Too Many Requests")) {
      return new DoodStreamRateLimitError(message, response)
    }

    // For all other errors, use the base API error
    return new DoodStreamApiError(message, status, response)
  }

  /**
   * 🛠️ Create a network error
   *
   * @param error - The original error
   * @returns A network error object
   */
  static createNetworkError(error: any): DoodStreamApiError {
    const message = error?.message || "Network connection error"
    return new DoodStreamApiError(message, 0, undefined, {
      originalError: error,
    })
  }

  /**
   * 🛠️ Create a timeout error
   *
   * @param error - The original error
   * @returns A timeout error object
   */
  static createTimeoutError(error: any): DoodStreamApiError {
    return new DoodStreamApiError("Request timed out", 408, undefined, {
      originalError: error,
    })
  }

  /**
   * 🛠️ Create a validation error
   *
   * @param message - The validation error message
   * @param context - Additional context about the validation error
   * @returns A validation error object
   */
  static createValidationError(
    message: string,
    context?: Record<string, any>,
  ): DoodStreamApiError {
    return new DoodStreamApiError(message, 400, undefined, context)
  }
}
