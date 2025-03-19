import { HttpClient } from "./http-client"
import {
  FileListResponse,
  FileStatusResponse,
  FileInfoResponse,
  FileImageResponse,
  BooleanResponse,
} from "../interfaces/api-responses"
import {
  FileListParams,
  FileStatusParams,
  FileInfoParams,
  FileImageParams,
  FileRenameParams,
  FileMoveParams,
  FileSearchParams,
} from "../interfaces/api-params"
import { ErrorFactory } from "../errors/error-factory"

/**
 * 📄 File-related API functionality
 */
export class FileApi {
  /**
   * 🌐 HTTP client for making requests
   */
  private client: HttpClient

  /**
   * Create a new File API instance
   *
   * @param client - HTTP client
   */
  constructor(client: HttpClient) {
    this.client = client
  }

  /**
   * 📋 List files
   *
   * @param params - File list parameters (pagination, folder, etc.)
   * @returns Promise with file list response
   */
  async list(params: FileListParams = {}): Promise<FileListResponse> {
    return this.client.get<FileListResponse>("/file/list", params)
  }

  /**
   * ✅ Check file status
   *
   * @param params - File status parameters
   * @returns Promise with file status response
   */
  async checkStatus(params: FileStatusParams): Promise<FileStatusResponse> {
    if (!params.file_code) {
      throw ErrorFactory.createValidationError(
        "File code is required to check status",
      )
    }

    return this.client.get<FileStatusResponse>("/file/check", params)
  }

  /**
   * ℹ️ Get file information
   *
   * @param params - File info parameters
   * @returns Promise with file info response
   */
  async getInfo(params: FileInfoParams): Promise<FileInfoResponse> {
    if (!params.file_code) {
      throw ErrorFactory.createValidationError(
        "File code is required to get file info",
      )
    }

    return this.client.get<FileInfoResponse>("/file/info", params)
  }

  /**
   * 🖼️ Get file images (thumbnail, splash, etc.)
   *
   * @param params - File image parameters
   * @returns Promise with file image response
   */
  async getImages(params: FileImageParams): Promise<FileImageResponse> {
    if (!params.file_code) {
      throw ErrorFactory.createValidationError(
        "File code is required to get file images",
      )
    }

    return this.client.get<FileImageResponse>("/file/image", params)
  }

  /**
   * 📝 Rename a file
   *
   * @param params - File rename parameters
   * @returns Promise with boolean response
   */
  async rename(params: FileRenameParams): Promise<BooleanResponse> {
    if (!params.file_code) {
      throw ErrorFactory.createValidationError(
        "File code is required to rename a file",
      )
    }

    if (!params.title) {
      throw ErrorFactory.createValidationError(
        "New title is required to rename a file",
      )
    }

    return this.client.get<BooleanResponse>("/file/rename", params)
  }

  /**
   * 📂 Move a file to a different folder
   *
   * @param params - File move parameters
   * @returns Promise with boolean response
   */
  async move(params: FileMoveParams): Promise<BooleanResponse> {
    if (!params.file_code) {
      throw ErrorFactory.createValidationError(
        "File code is required to move a file",
      )
    }

    if (params.fld_id === undefined) {
      throw ErrorFactory.createValidationError(
        "Destination folder ID is required to move a file",
      )
    }

    return this.client.get<BooleanResponse>("/file/move", params)
  }

  /**
   * 🔍 Search for files
   *
   * @param params - File search parameters
   * @returns Promise with file list response
   */
  async search(params: FileSearchParams): Promise<FileListResponse> {
    if (!params.search_term) {
      throw ErrorFactory.createValidationError(
        "Search term is required to search files",
      )
    }

    return this.client.get<FileListResponse>("/search/videos", params)
  }
}
