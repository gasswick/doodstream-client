import DoodStreamClient, {
  DoodStreamApiError,
  DoodStreamRateLimitError,
} from "../src"

/**
 * Advanced example usage of the DoodStream client with error handling
 */
async function main() {
  // Create a new client instance with your API key and advanced configuration
  const client = new DoodStreamClient({
    apiKey: "YOUR_API_KEY_HERE",
    baseUrl: "https://doodapi.com/api", // Default, can be customized
    timeout: 30000, // 30 seconds
    logging: {
      level: "debug", // More verbose logging
      enabled: true,
    },
    cache: {
      enabled: true,
      ttl: 600, // 10 minutes
    },
  })

  // Example 1: Create a folder and handle errors
  console.log("📁 Creating a new folder...")
  try {
    const newFolder = await client.folder.create({
      name: "My Test Folder",
    })
    console.log(`✅ Folder created with ID: ${newFolder.result.fld_id}`)

    // Store folder ID for later use
    const folderId = newFolder.result.fld_id

    // Example 2: Remote upload a file to the created folder
    console.log("\n🔗 Adding a remote upload link...")
    try {
      const remoteUpload = await client.remoteUpload.addLink({
        url: "https://example.com/sample-video.mp4",
        fld_id: folderId,
        new_title: "Sample Video",
      })
      console.log(
        `✅ Remote upload added with file code: ${remoteUpload.result.filecode}`,
      )

      // Store file code for later use
      const fileCode = remoteUpload.result.filecode

      // Example 3: Get status of the remote upload
      console.log("\n🔍 Checking remote upload status...")
      try {
        const uploadStatus = await client.remoteUpload.getStatus({
          file_code: fileCode,
        })

        const status = uploadStatus.result[0]?.status || "unknown"
        console.log(`📊 Upload status: ${status}`)

        // Example 4: Check if file is ready and get file info
        if (status === "completed") {
          console.log("\nℹ️ Getting file information...")
          try {
            const fileInfo = await client.file.getInfo({
              file_code: fileCode,
            })

            const file = fileInfo.result[0]
            console.log(`📄 File title: ${file.title}`)
            console.log(`📊 File size: ${file.size}`)
            console.log(`⏱️ File length: ${file.length}`)
            console.log(`🔗 Download URL: ${file.protected_dl}`)
            console.log(`🖥️ Embed URL: ${file.protected_embed}`)
          } catch (error) {
            handleError(error, "getting file info")
          }
        }
      } catch (error) {
        handleError(error, "checking upload status")
      }
    } catch (error) {
      handleError(error, "adding remote upload")
    }
  } catch (error) {
    handleError(error, "creating folder")
  }
}

/**
 * Helper function to handle errors
 */
function handleError(error: unknown, context: string) {
  console.error(`\n❌ Error ${context}:`)

  if (error instanceof DoodStreamRateLimitError) {
    console.error(`🛑 Rate limit exceeded! Please try again later.`)
    console.error(`Details: ${error.message}`)
  } else if (error instanceof DoodStreamApiError) {
    console.error(`🚨 API Error (${error.statusCode}): ${error.message}`)

    if (error.response) {
      console.error("Response data:", error.response)
    }

    if (error.context) {
      console.error("Error context:", error.context)
    }
  } else {
    console.error(`💥 Unexpected error: ${error}`)
  }
}

// Run the example
main().catch((error) => {
  console.error("💥 Fatal error:", error)
  process.exit(1)
})
