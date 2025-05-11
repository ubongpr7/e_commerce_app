'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SanityClient from '@/lib/sanityClient';
import { urlForImage } from '@/lib/sanityImage';

type SanityImageItem = {
  _id: string;
  title: string;
  image: any;
  link?: string;
};

const ThreeImages = () => {
  const [images, setImages] = useState<SanityImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SanityClient.fetch(`*[_type == "threeImages"][0...3]{_id, title, image, link}`)
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Sanity fetch error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-row justify-center items-center gap-4 mt-6">
      {loading
        ? Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="w-[150px] h-[150px] rounded-lg bg-gray-200 animate-pulse"
          />
        ))
        : images.map((item) => (
          <Link
            href={item.link || '#'}
            key={item._id}
            className="flex flex-row items-center w-[150px] h-[150px] group rounded-lg"
          >
            <img
              src={urlForImage(item.image).url()}
              alt={item.title}
              className="w-[150px] h-[150px] object-contain rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </Link>
        ))}
    </div>
  );
};

export default ThreeImages;
