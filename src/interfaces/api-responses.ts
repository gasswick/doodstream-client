/**
 * 📊 Base response structure for all DoodStream API responses
 */
export interface BaseResponse {
  msg: string
  server_time: string
  status: number
}

/**
 * ℹ️ Account information response
 */
export interface AccountInfoResponse extends BaseResponse {
  result: {
    email: string
    balance: string
    storage_used: string
    storage_left: number
    premim_expire: string
  }
}

/**
 * 📈 Account statistics response
 */
export interface AccountStatsResponse extends BaseResponse {
  result: Array<{
    profit_views: string
    downloads: string
    views: string
    day: string
    profit_total: string
  }>
}

/**
 * 🚫 DMCA list response
 */
export interface DmcaListResponse extends BaseResponse {
  result: Array<{
    reported_on: string
    protected_download: string
    protected_embed: string
    file_code: string
    fld_id: string
    disabled_on: string
  }>
}

/**
 * 🖥️ Upload server response
 */
export interface UploadServerResponse extends BaseResponse {
  result: string
}

/**
 * 📤 Upload response
 */
export interface UploadResponse extends BaseResponse {
  result: Array<{
    download_url: string
    single_img: string
    status: number
    filecode: string
    splash_img: string
    canplay: number
    size: string
    length: string
    uploaded: string
    protected_embed: string
    protected_dl: string
    title: string
  }>
}

/**
 * 🔄 Clone file response
 */
export interface CloneFileResponse extends BaseResponse {
  result: {
    embed_url: string
    download_url: string
    protected_download: string
    protected_embed: string
    filecode: string
  }
}

/**
 * 🔗 Remote upload response
 */
export interface RemoteUploadResponse extends BaseResponse {
  new_title: string
  total_slots: string
  result: {
    filecode: string
  }
  used_slots: string
}

/**
 * 📋 Remote upload list response
 */
export interface RemoteUploadListResponse extends BaseResponse {
  result: Array<{
    bytes_total: string
    created: string
    remote_url: string
    status: string
    file_code: string
    bytes_downloaded: string
    folder_id: string
  }>
}

/**
 * 🔢 Remote upload slots response
 */
export interface RemoteUploadSlotsResponse extends BaseResponse {
  total_slots: string
  used_slots: string
}

/**
 * 📁 Create folder response
 */
export interface CreateFolderResponse extends BaseResponse {
  result: {
    fld_id: string
  }
}

/**
 * 📂 Folder list response
 */
export interface FolderListResponse extends BaseResponse {
  result: {
    folders: Array<{
      name: string
      code: string
      fld_id: string
    }>
    files: Array<{
      download_url: string
      single_img: string
      file_code: string
      canplay: number
      length: string
      views: string
      uploaded: string
      public: string
      fld_id: string
      title: string
    }>
  }
}

/**
 * 📋 File list response
 */
export interface FileListResponse extends BaseResponse {
  result: {
    total_pages: number
    files: Array<{
      download_url: string
      single_img: string
      file_code: string
      canplay: number
      length: string
      views: string
      uploaded: string
      public: string
      fld_id: string
      title: string
    }>
    results_total: string
    results: number
  }
}

/**
 * ✅ File status response
 */
export interface FileStatusResponse extends BaseResponse {
  result: Array<{
    status: string
    filecode: string
  }>
}

/**
 * ℹ️ File info response
 */
export interface FileInfoResponse extends BaseResponse {
  result: Array<{
    single_img: string
    status: number
    filecode: string
    splash_img: string
    canplay: number
    size: string
    views: string
    length: string
    uploaded: string
    last_view: string
    protected_embed: string
    protected_dl: string
    title: string
  }>
}

/**
 * 🖼️ File image response
 */
export interface FileImageResponse extends BaseResponse {
  result: Array<{
    status: number
    filecode: string
    title: string
    single_img: string
    thumb_img: string
    splash_img: string
  }>
}

/**
 * 👍 Simple success response (boolean)
 */
export interface BooleanResponse extends BaseResponse {
  result: string | boolean
}
