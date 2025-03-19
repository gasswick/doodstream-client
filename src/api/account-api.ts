import { HttpClient } from "./http-client"
import {
  AccountInfoResponse,
  AccountStatsResponse,
  DmcaListResponse,
} from "../interfaces/api-responses"
import { AccountStatsParams, DmcaListParams } from "../interfaces/api-params"

/**
 * 👤 Account-related API functionality
 */
export class AccountApi {
  /**
   * 🌐 HTTP client for making requests
   */
  private client: HttpClient

  /**
   * Create a new Account API instance
   *
   * @param client - HTTP client
   */
  constructor(client: HttpClient) {
    this.client = client
  }

  /**
   * 📊 Get account information
   *
   * @returns Promise with account info response
   */
  async getInfo(): Promise<AccountInfoResponse> {
    return this.client.get<AccountInfoResponse>("/account/info")
  }

  /**
   * 📈 Get account statistics/reports
   *
   * @param params - Optional parameters (last days, date range)
   * @returns Promise with account statistics response
   */
  async getStats(
    params: AccountStatsParams = {},
  ): Promise<AccountStatsResponse> {
    return this.client.get<AccountStatsResponse>("/account/stats", params)
  }

  /**
   * 🚫 Get DMCA reported files list
   *
   * @param params - Optional parameters (pagination, results per page)
   * @returns Promise with DMCA list response
   */
  async getDmcaList(params: DmcaListParams = {}): Promise<DmcaListResponse> {
    return this.client.get<DmcaListResponse>("/dmca/list", params)
  }
}
