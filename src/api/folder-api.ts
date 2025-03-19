import { HttpClient } from "./http-client"
import {
  CreateFolderResponse,
  BooleanResponse,
  FolderListResponse,
} from "../interfaces/api-responses"
import {
  CreateFolderParams,
  RenameFolderParams,
  FolderListParams,
} from "../interfaces/api-params"
import { ErrorFactory } from "../errors/error-factory"

/**
 * 📁 Folder-related API functionality
 */
export class FolderApi {
  /**
   * 🌐 HTTP client for making requests
   */
  private client: HttpClient

  /**
   * Create a new Folder API instance
   *
   * @param client - HTTP client
   */
  constructor(client: HttpClient) {
    this.client = client
  }

  /**
   * 📁 Create a new folder
   *
   * @param params - Create folder parameters
   * @returns Promise with create folder response
   */
  async create(params: CreateFolderParams): Promise<CreateFolderResponse> {
    if (!params.name) {
      throw ErrorFactory.createValidationError("Folder name is required")
    }

    return this.client.get<CreateFolderResponse>("/folder/create", params)
  }

  /**
   * 📝 Rename a folder
   *
   * @param params - Rename folder parameters
   * @returns Promise with boolean response
   */
  async rename(params: RenameFolderParams): Promise<BooleanResponse> {
    if (!params.fld_id) {
      throw ErrorFactory.createValidationError("Folder ID is required")
    }

    if (!params.name) {
      throw ErrorFactory.createValidationError("New folder name is required")
    }

    return this.client.get<BooleanResponse>("/folder/rename", params)
  }

  /**
   * 📋 List folders and files
   *
   * @param params - Folder list parameters
   * @returns Promise with folder list response
   */
  async list(params: FolderListParams): Promise<FolderListResponse> {
    if (!params.fld_id) {
      throw ErrorFactory.createValidationError("Folder ID is required")
    }

    return this.client.get<FolderListResponse>("/folder/list", params)
  }

  /**
   * 📂 List only folders
   *
   * @param folderId - Folder ID to list sub-folders of
   * @returns Promise with folder list response
   */
  async listFoldersOnly(folderId: string): Promise<FolderListResponse> {
    if (!folderId) {
      throw ErrorFactory.createValidationError("Folder ID is required")
    }

    return this.client.get<FolderListResponse>("/folder/list", {
      fld_id: folderId,
      only_folders: 1,
    })
  }
}
