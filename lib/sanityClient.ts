// lib/sanityClient.ts

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'npruutek', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name (e.g., "production")
  useCdn: true, // Use CDN for faster reads, set to `false` if you need real-time data
})

export default client
