'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SanityClient from "@/lib/sanityClient";
import { urlForImage } from '@/lib/sanityImage';

const Category2 = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SanityClient.fetch(`*[_type == "category2"]{_id, title, image, link}`)
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-row justify-between gap-4 mt-2 p-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-full animate-pulse">
            <div className="w-full h-[80px] bg-gray-300 rounded-md mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-between gap-4 mt-2 p-2">
      {categories.map((category) => (
        <Link
          key={category._id}
          href={category.link || '#'}
          className="w-full group"
        >
          <div className="w-full">
            <div
              className="w-full h-[80px] bg-cover bg-center rounded-md transition-transform duration-300 transform group-hover:scale-105 shadow-sm"
              style={{
                backgroundImage: `url('${urlForImage(category.image).url()}')`,
              }}
            ></div>
            <p className="mt-2 text-center text-xs">{category.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category2;
