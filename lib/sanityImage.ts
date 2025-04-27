import imageUrlBuilder from "@sanity/image-url"   // 🛠 Notice: no "create" here
import client from "./sanityClient"         // ✅ client we made earlier

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source)
}
