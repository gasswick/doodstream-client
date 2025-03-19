/**
 * 🚨 Custom error class for DoodStream API errors
 */
export class DoodStreamApiError extends Error {
  /**
   * 🔢 HTTP status code
   */
  statusCode: number

  /**
   * 📄 Original response data
   */
  response?: any

  /**
   * 🔍 Error context with additional information
   */
  context?: Record<string, any>

  /**
   * Create a new DoodStream API error
   *
   * @param message - Error message
   * @param statusCode - HTTP status code
   * @param response - Original response data
   * @param context - Additional context information
   */
  constructor(
    message: string,
    statusCode: number = 500,
    response?: any,
    context?: Record<string, any>,
  ) {
    super(message)
    this.name = "DoodStreamApiError"
    this.statusCode = statusCode
    this.response = response
    this.context = context

    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, DoodStreamApiError.prototype)
  }

  /**
   * 📝 Get a string representation of the error
   */
  toString(): string {
    return `${this.name} (${this.statusCode}): ${this.message}`
  }

  /**
   * 🧩 Convert the error to a plain object
   */
  toJSON(): Record<string, any> {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      response: this.response,
      context: this.context,
      stack: this.stack,
    }
  }
}
