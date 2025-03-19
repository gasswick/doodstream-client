/**
 * 📊 Account statistics parameters
 */
export interface AccountStatsParams {
  /**
   * 📅 Last x days report
   */
  last?: number

  /**
   * 📅 From date - YYYY-MM-DD
   */
  from_date?: string

  /**
   * 📅 To date - YYYY-MM-DD
   */
  to_date?: string
}

/**
 * 🚫 DMCA list parameters
 */
export interface DmcaListParams {
  /**
   * 📝 Results per page (default 500)
   */
  per_page?: number

  /**
   * 📄 Pagination
   */
  page?: number
}

/**
 * 🔄 Clone file parameters
 */
export interface CloneFileParams {
  /**
   * 📁 File code
   */
  file_code: string

  /**
   * 📂 Folder ID (to copy inside the folder)
   */
  fld_id?: string
}

/**
 * 🔗 Remote upload parameters
 */
export interface RemoteUploadParams {
  /**
   * 🔗 URL to upload
   */
  url: string

  /**
   * 📂 To upload inside a folder
   */
  fld_id?: string

  /**
   * 📝 To set new title
   */
  new_title?: string
}

/**
 * 🔍 Remote upload status parameters
 */
export interface RemoteUploadStatusParams {
  /**
   * 📁 File code of the file
   */
  file_code: string
}

/**
 * 🛠️ Remote upload actions parameters
 */
export interface RemoteUploadActionsParams {
  /**
   * 🔄 Restart all errors
   */
  restart_errors?: boolean

  /**
   * 🧹 Clear all errors
   */
  clear_errors?: boolean

  /**
   * 🧹 Clear all
   */
  clear_all?: boolean

  /**
   * 🗑️ Delete a transfer, pass file_code
   */
  delete_code?: string
}

/**
 * 📁 Create folder parameters
 */
export interface CreateFolderParams {
  /**
   * 📝 Name of the folder
   */
  name: string

  /**
   * 📂 Parent folder ID
   */
  parent_id?: string
}

/**
 * 📝 Rename folder parameters
 */
export interface RenameFolderParams {
  /**
   * 📂 Folder ID
   */
  fld_id: string

  /**
   * 📝 New name of the folder
   */
  name: string
}

/**
 * 📂 Folder list parameters
 */
export interface FolderListParams {
  /**
   * 📂 Folder ID
   */
  fld_id: string

  /**
   * 📂 To list only folders (0 or 1)
   */
  only_folders?: 0 | 1
}

/**
 * 📋 File list parameters
 */
export interface FileListParams {
  /**
   * 📄 Pagination
   */
  page?: number

  /**
   * 📝 Max videos per page (Max 200)
   */
  per_page?: number

  /**
   * 📂 Videos inside a folder
   */
  fld_id?: string

  /**
   * 📅 Show files uploaded after timestamp (Ex: 2021-10-07 03:15:19)
   * Or specify number to show only files uploaded X minutes ago
   */
  created?: string | number
}

/**
 * 🔍 File status parameters
 */
export interface FileStatusParams {
  /**
   * 📁 File code
   */
  file_code: string
}

/**
 * ℹ️ File info parameters
 */
export interface FileInfoParams {
  /**
   * 📁 File code
   */
  file_code: string
}

/**
 * 🖼️ File image parameters
 */
export interface FileImageParams {
  /**
   * 📁 File code
   */
  file_code: string
}

/**
 * 📝 File rename parameters
 */
export interface FileRenameParams {
  /**
   * 📁 File code
   */
  file_code: string

  /**
   * 📝 New file name
   */
  title: string
}

/**
 * 📂 File move parameters
 */
export interface FileMoveParams {
  /**
   * 📁 File code
   */
  file_code: string

  /**
   * 📂 Folder ID to move the file (set 0 to / directory)
   */
  fld_id: string
}

/**
 * 🔍 File search parameters
 */
export interface FileSearchParams {
  /**
   * 🔍 Search term
   */
  search_term: string
}
