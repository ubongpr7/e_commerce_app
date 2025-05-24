"use client";

import { useEffect, useState } from "react";
import { urlForImage } from "@/lib/sanityImage";
import SanityClient from "@/lib/sanityClient";

interface HoverImage1Data {
  image: any;
  link: string;
  alt?: string;
}

const HoverImage1 = () => {
  const [data, setData] = useState<HoverImage1Data | null>(null);

  useEffect(() => {
    SanityClient.fetch(`*[_type == "hoverImage1"][0]{image, link, alt}`)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="w-56 h-72 ml-14 mt-4 bg-gray-300 animate-pulse rounded-lg" />
    );
  }

  const imageUrl = urlForImage(data.image).url();

  return (
    <a
      href={data.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative mt-4 w-56 ml-14 overflow-hidden rounded-lg bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute top-0 left-0 flex justify-center space-x-4">
          <div className="w-16 h-16 bg-main-red rounded-full animate-heartbeat-3d hidden" />
        </div>
      </div>
    </a>
  );
};

export default HoverImage1;
