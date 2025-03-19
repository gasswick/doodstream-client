import { HttpClient } from "./http-client"
import {
  RemoteUploadResponse,
  RemoteUploadListResponse,
  RemoteUploadSlotsResponse,
  BaseResponse,
} from "../interfaces/api-responses"
import {
  RemoteUploadParams,
  RemoteUploadStatusParams,
  RemoteUploadActionsParams,
} from "../interfaces/api-params"
import { ErrorFactory } from "../errors/error-factory"

/**
 * 🔗 Remote Upload-related API functionality
 */
export class RemoteUploadApi {
  /**
   * 🌐 HTTP client for making requests
   */
  private client: HttpClient

  /**
   * Create a new Remote Upload API instance
   *
   * @param client - HTTP client
   */
  constructor(client: HttpClient) {
    this.client = client
  }

  /**
   * 🔗 Add a remote upload link
   *
   * @param params - Remote upload parameters
   * @returns Promise with remote upload response
   */
  async addLink(params: RemoteUploadParams): Promise<RemoteUploadResponse> {
    if (!params.url) {
      throw ErrorFactory.createValidationError(
        "URL is required for remote upload",
      )
    }

    return this.client.get<RemoteUploadResponse>("/upload/url", params)
  }

  /**
   * 📋 Get remote upload list & status
   *
   * @returns Promise with remote upload list response
   */
  async getList(): Promise<RemoteUploadListResponse> {
    return this.client.get<RemoteUploadListResponse>("/urlupload/list")
  }

  /**
   * 🔍 Get status of a specific remote upload
   *
   * @param params - Remote upload status parameters
   * @returns Promise with remote upload list response
   */
  async getStatus(
    params: RemoteUploadStatusParams,
  ): Promise<RemoteUploadListResponse> {
    if (!params.file_code) {
      throw ErrorFactory.createValidationError(
        "File code is required to check remote upload status",
      )
    }

    return this.client.get<RemoteUploadListResponse>(
      "/urlupload/status",
      params,
    )
  }

  /**
   * 🔢 Get remote upload slots info
   *
   * @returns Promise with remote upload slots response
   */
  async getSlots(): Promise<RemoteUploadSlotsResponse> {
    return this.client.get<RemoteUploadSlotsResponse>("/urlupload/slots")
  }

  /**
   * 🔄 Restart all error uploads
   *
   * @returns Promise with base response
   */
  async restartErrors(): Promise<BaseResponse> {
    return this.client.get<BaseResponse>("/urlupload/actions", {
      restart_errors: true,
    })
  }

  /**
   * 🧹 Clear all error uploads
   *
   * @returns Promise with base response
   */
  async clearErrors(): Promise<BaseResponse> {
    return this.client.get<BaseResponse>("/urlupload/actions", {
      clear_errors: true,
    })
  }

  /**
   * 🧹 Clear all uploads
   *
   * @returns Promise with base response
   */
  async clearAll(): Promise<BaseResponse> {
    return this.client.get<BaseResponse>("/urlupload/actions", {
      clear_all: true,
    })
  }

  /**
   * 🗑️ Delete a specific transfer
   *
   * @param fileCode - File code to delete
   * @returns Promise with base response
   */
  async deleteTransfer(fileCode: string): Promise<BaseResponse> {
    if (!fileCode) {
      throw ErrorFactory.createValidationError(
        "File code is required to delete a transfer",
      )
    }

    return this.client.get<BaseResponse>("/urlupload/actions", {
      delete_code: fileCode,
    })
  }

  /**
   * 🛠️ Perform custom remote upload actions
   *
   * @param params - Remote upload actions parameters
   * @returns Promise with base response
   */
  async performActions(
    params: RemoteUploadActionsParams,
  ): Promise<BaseResponse> {
    if (
      !params.restart_errors &&
      !params.clear_errors &&
      !params.clear_all &&
      !params.delete_code
    ) {
      throw ErrorFactory.createValidationError(
        "At least one action parameter must be specified",
      )
    }

    return this.client.get<BaseResponse>("/urlupload/actions", params)
  }
}
