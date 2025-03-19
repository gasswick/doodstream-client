import { HttpClient } from "./http-client"
import {
  UploadServerResponse,
  UploadResponse,
  CloneFileResponse,
} from "../interfaces/api-responses"
import { CloneFileParams } from "../interfaces/api-params"
import { ErrorFactory } from "../errors/error-factory"

/**
 * 📤 Upload-related API functionality
 */
export class UploadApi {
  /**
   * 🌐 HTTP client for making requests
   */
  private client: HttpClient

  /**
   * Create a new Upload API instance
   *
   * @param client - HTTP client
   */
  constructor(client: HttpClient) {
    this.client = client
  }

  /**
   * 🖥️ Get upload server URL
   *
   * @returns Promise with upload server response
   */
  async getUploadServer(): Promise<UploadServerResponse> {
    return this.client.get<UploadServerResponse>("/upload/server")
  }

  /**
   * 📋 Get information about using the upload server
   *
   * @returns Object with information about uploading files
   */
  getUploadInstructions(): Record<string, any> {
    return {
      curl_example:
        "curl -X POST -F 'api_key={your_api_key}' -F 'file=@file.mp4' {upload_server_url}",
      html_example: `<form enctype="multipart/form-data" action="{upload_server_url}" method="post">
<input type="hidden" name="api_key" value="{your_api_key}">
<input name="file" type="file">
<input type="submit">
</form>`,
      note: "Replace {your_api_key} with your actual API key and {upload_server_url} with the URL from getUploadServer()",
    }
  }

  /**
   * 🔄 Clone/copy a file
   *
   * @param params - Clone file parameters
   * @returns Promise with clone file response
   */
  async cloneFile(params: CloneFileParams): Promise<CloneFileResponse> {
    if (!params.file_code) {
      throw ErrorFactory.createValidationError(
        "File code is required for cloning a file",
      )
    }

    return this.client.get<CloneFileResponse>("/file/clone", params)
  }
}
