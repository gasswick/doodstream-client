# 🚀 DoodStream Client

A feature-rich, TypeScript-based client for the DoodStream API with caching, logging, and comprehensive error handling.

[![NPM version](https://img.shields.io/npm/v/dood-stream-client.svg)](https://www.npmjs.com/package/dood-stream-client)
[![License](https://img.shields.io/npm/l/dood-stream-client.svg)](https://github.com/gasswick/dood-stream-client/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)](https://www.typescriptlang.org/)

## ✨ Features

- 🔄 **Complete API Coverage**: Support for all DoodStream API endpoints
- 🧠 **Built-in Caching**: Optimize performance with in-memory caching
- 📝 **Robust Logging**: Configurable logging with emojis for better readability
- 🚨 **Error Handling**: Detailed error information and proper error classes
- 📚 **TypeScript Support**: Full type definitions for all requests and responses
- 🧩 **Modular Design**: Follows SOLID principles with clean separation of concerns
- 🎭 **Rate Limit Handling**: Special handling for rate limit errors
- 🧪 **Testable**: Designed for easy unit testing

## 📦 Installation

```bash
npm install dood-stream-client
# or
yarn add dood-stream-client
# or
pnpm add dood-stream-client
```

## 🔧 Quick Start

```typescript
import DoodStreamClient from "dood-stream-client"

// Create a new client instance
const client = new DoodStreamClient({
  apiKey: "YOUR_API_KEY_HERE",
})

// Get account information
const accountInfo = await client.account.getInfo()
console.log(accountInfo.result)

// List files
const files = await client.file.list({ per_page: 10 })
console.log(`Found ${files.result.results_total} files`)
```

## ⚙️ Configuration

```typescript
// Full configuration with defaults
const client = new DoodStreamClient({
  // Required
  apiKey: "YOUR_API_KEY_HERE",

  // Optional
  baseUrl: "https://doodapi.com/api",
  timeout: 30000, // 30 seconds

  // Caching options
  cache: {
    enabled: true,
    ttl: 300, // 5 minutes (in seconds)
  },

  // Logging options
  logging: {
    enabled: true,
    level: "info", // 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'
  },
})
```

## 🗂️ API Overview

The client is organized into API modules that closely follow the DoodStream API structure:

### 👤 Account API

```typescript
// Get account information
const info = await client.account.getInfo()

// Get account statistics
const stats = await client.account.getStats({ last: 7 })

// Get DMCA list
const dmcaList = await client.account.getDmcaList({ per_page: 50 })
```

### 📄 File API

```typescript
// List files
const files = await client.file.list({ per_page: 20 })

// Get file information
const fileInfo = await client.file.getInfo({ file_code: "xxx" })

// Get file images
const fileImages = await client.file.getImages({ file_code: "xxx" })

// Check file status
const fileStatus = await client.file.checkStatus({ file_code: "xxx" })

// Rename a file
const rename = await client.file.rename({
  file_code: "xxx",
  title: "New Title",
})

// Move a file
const move = await client.file.move({
  file_code: "xxx",
  fld_id: "123",
})

// Search files
const search = await client.file.search({ search_term: "example" })
```

### 📁 Folder API

```typescript
// Create a folder
const newFolder = await client.folder.create({ name: "My Folder" })

// Rename a folder
const rename = await client.folder.rename({
  fld_id: "123",
  name: "New Folder Name",
})

// List folder contents
const folderContents = await client.folder.list({ fld_id: "123" })

// List only folders (not files)
const folders = await client.folder.listFoldersOnly("123")
```

### 🔗 Remote Upload API

```typescript
// Add a remote upload
const upload = await client.remoteUpload.addLink({
  url: "https://example.com/video.mp4",
})

// Get remote upload list
const uploadList = await client.remoteUpload.getList()

// Check status of a specific upload
const status = await client.remoteUpload.getStatus({
  file_code: "xxx",
})

// Get remote upload slots info
const slots = await client.remoteUpload.getSlots()

// Restart all error uploads
await client.remoteUpload.restartErrors()

// Clear all error uploads
await client.remoteUpload.clearErrors()

// Clear all uploads
await client.remoteUpload.clearAll()

// Delete a specific transfer
await client.remoteUpload.deleteTransfer("xxx")

// Perform custom actions
await client.remoteUpload.performActions({
  restart_errors: true,
  clear_errors: false,
})
```

### 📤 Upload API

```typescript
// Get upload server URL
const server = await client.upload.getUploadServer()

// Get upload instructions (for reference)
const instructions = client.upload.getUploadInstructions()

// Clone a file
const clone = await client.upload.cloneFile({ file_code: "xxx" })
```

## 🧹 Caching

The client includes built-in caching to improve performance and reduce API calls:

```typescript
// Clear all cache
client.clearCache()

// Cache is automatically used for GET requests
// You can disable it for specific requests:
const freshData = await client.httpClient.get("/some/endpoint", {}, {}, false)
```

## 🔍 Error Handling

The client provides detailed error handling with custom error classes:

```typescript
import {
  DoodStreamApiError,
  DoodStreamRateLimitError,
} from "dood-stream-client"

try {
  const result = await client.file.getInfo({ file_code: "invalid_code" })
} catch (error) {
  if (error instanceof DoodStreamRateLimitError) {
    console.error("Rate limit exceeded!")
    // Wait and retry...
  } else if (error instanceof DoodStreamApiError) {
    console.error(`API Error (${error.statusCode}): ${error.message}`)
    console.error("Response:", error.response)
  } else {
    console.error("Unexpected error:", error)
  }
}
```

## 📚 TypeScript Support

All API responses and parameters are fully typed for an excellent developer experience:

```typescript
import {
  FileInfoParams,
  FileInfoResponse,
  AccountInfoResponse,
} from "dood-stream-client"

// Types for parameters
const params: FileInfoParams = { file_code: "xxx" }

// Types for responses
const response: FileInfoResponse = await client.file.getInfo(params)
```

## 🧪 Running Examples

Check the `/examples` directory for usage examples:

```bash
# Install dependencies
npm install

# Run the basic example
npx ts-node examples/basic-usage.ts

# Run the advanced example
npx ts-node examples/advanced-usage.ts
```

## 🔨 Building from Source

```bash
# Clone the repository
git clone https://github.com/yourusername/dood-stream-client.git
cd dood-stream-client

# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Lint the code
npm run lint
```

## 📝 License

MIT
