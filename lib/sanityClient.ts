import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Initialize the Sanity client
const client = createClient({
  projectId: 'npruutek', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name (e.g., "production")
  useCdn: true, // Use CDN for faster reads, set to `false` if you need real-time data
  apiVersion: '2023-05-02', // Ensure you use the correct API version
})

// Create an image URL builder instance using the Sanity client
const builder = imageUrlBuilder(client)

// Helper function to generate image URLs
export const urlForImage = (source: any) => {
  return source ? builder.image(source).auto('format').url() : "" // Generate image URL
}

export default client
