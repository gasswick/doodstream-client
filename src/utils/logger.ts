import winston from "winston"
import { ClientOptions } from "../interfaces/client-options"

/**
 * 📝 Create a logger instance for the DoodStream client
 *
 * @param options - Client options that include logging configuration
 * @returns A configured winston logger instance
 */
export function createLogger(options?: ClientOptions) {
  // Check if logging is enabled
  const isEnabled = options?.logging?.enabled !== false

  // Set log level (default to 'info')
  const level = options?.logging?.level || "info"

  // Create a custom format
  const customFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      // Add emojis based on log level
      const emojis: Record<string, string> = {
        error: "❌",
        warn: "⚠️",
        info: "ℹ️",
        http: "🌐",
        verbose: "📝",
        debug: "🔍",
        silly: "🤪",
      }

      const emoji = emojis[level] || ""
      const metaStr = Object.keys(meta).length
        ? `\n${JSON.stringify(meta, null, 2)}`
        : ""

      return `${timestamp} ${emoji} [${level.toUpperCase()}]: ${message}${metaStr}`
    }),
  )

  // Create the logger
  const logger = winston.createLogger({
    level,
    format: customFormat,
    transports: [
      // Console transport
      new winston.transports.Console({
        silent: !isEnabled,
      }),
    ],
  })

  return logger
}
