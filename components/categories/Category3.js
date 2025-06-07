'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SanityClient from "@/lib/sanityClient";
import { urlForImage } from "@/lib/sanityImage";

const Category3 = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fetch categories from Sanity
    SanityClient.fetch(`*[_type == "category3"]{_id, title, image, link}`)
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Detect screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Tailwind 'lg' = 1024px
    };

    handleResize(); // Run on load
    window.addEventListener('resize', handleResize); // Run on resize
    return () => window.removeEventListener('resize', handleResize); // Clean up
  }, []);

  const visibleCategories = isMobile ? categories.slice(0, 4) : categories;

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
    <div className="grid grid-cols-4 lg:ml-16 lg:rounded-md lg:mr-16 lg:grid-cols-6 gap-4 mt-2 lg:p-2 text-center lg:gap-0 lg:bg-orange-600 lg:justify-items-center">
      {visibleCategories.map((category) => (
        <Link
          key={category._id}
          href={category.link || '#'}
          className="w-full group"
        >
          <div className="w-full flex flex-col items-center">
            <div
              className="h-[80px] md:h-[160px] lg:h-[150px] xl:h-[170px] w-full bg-cover bg-center rounded-md transition-transform duration-300 transform group-hover:scale-105 shadow-sm"
              style={{
                backgroundImage: `url('${urlForImage(category.image).url()}')`,
              }}
            ></div>
            <p className="mt-2 text-center lg:text-gray-900 lg:font-normal md:text-sm text-xs">
              {category.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category3;
