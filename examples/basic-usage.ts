import DoodStreamClient from "../src"

/**
 * Basic example usage of the DoodStream client
 */
async function main() {
  try {
    // Create a new client instance with your API key
    const client = new DoodStreamClient({
      apiKey: "YOUR_API_KEY_HERE",
      // Optional configuration
      logging: {
        level: "info",
        enabled: true,
      },
      cache: {
        enabled: true,
        ttl: 300, // 5 minutes
      },
    })

    // Get account information
    console.log("📊 Getting account information...")
    const accountInfo = await client.account.getInfo()
    console.log(accountInfo.result)

    // List files (first page of results)
    console.log("\n📋 Listing files...")
    const files = await client.file.list({ per_page: 5 })
    console.log(`Found ${files.result.results_total} files in total`)
    console.log(`Showing ${files.result.files.length} files on this page`)

    // List all folders
    console.log("\n📁 Listing folders...")
    try {
      const rootFolder = "0" // Root folder ID
      const folders = await client.folder.list({ fld_id: rootFolder })
      console.log(`Found ${folders.result.folders.length} folders`)
      console.log(`Found ${folders.result.files.length} files in root folder`)
    } catch (error) {
      console.error("Error listing folders:", error)
    }

    // Get upload server URL
    console.log("\n📤 Getting upload server URL...")
    const uploadServer = await client.upload.getUploadServer()
    console.log(`Upload server URL: ${uploadServer.result}`)

    // Get remote upload slots
    console.log("\n🔗 Getting remote upload slots...")
    const slots = await client.remoteUpload.getSlots()
    console.log(`Total slots: ${slots.total_slots}`)
    console.log(`Used slots: ${slots.used_slots}`)

    // For demonstration, clear the cache
    console.log("\n🧹 Clearing cache...")
    client.clearCache()
    console.log("Cache cleared")
  } catch (error) {
    console.error("❌ Error:", error)
  }
}

// Run the example
main().catch(console.error)
