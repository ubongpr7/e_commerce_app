"use client";

import { useEffect, useState } from "react";
import SanityClient from "@/lib/sanityClient"; // Import the initialized client
import { urlForImage } from "@/lib/sanityImage"; // Assuming proper image helper functions
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

interface Banner {
  _id: string;
  image: any; // Adjust as per your actual image field structure
  link: string;
}

const Carousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch banners from Sanity
  useEffect(() => {
    SanityClient
      .fetch(`*[_type == "banner"]{_id, image, link}`)
      .then((data: Banner[]) => {
        setBanners(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  // Navigation functions
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // Swipe handlers for mobile
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true, // Retain mouse tracking for desktop as well
  });

  return (
    <div
      className="group rounded-lg mt-24 relative w-full max-w-2xl mx-auto overflow-hidden p-2 border border-b-8 border-b-gray-300"
      {...handlers}
    >
      {loading ? (
        <div className="relative w-full h-48 md:h-72 lg:h-96 xl:h-128 2xl:h-144 animate-pulse">
          {/* Skeleton Loader */}
          <div className="w-full h-full bg-gray-300 rounded-lg"></div>
        </div>
      ) : (
        <>
          <div className="relative w-full h-48 flex transition-all duration-700 ease-in-out md:h-72 lg:h-96 xl:h-128 2xl:h-144">
            {banners.map((banner, index) => (
              <div
                key={banner._id}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                  index === activeIndex
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <a href={banner.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={urlForImage(banner.image).url()}
                    alt={`Banner ${index + 1}`}
                    fill
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity"
          >
            ❯
          </button>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 space-x-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === activeIndex ? "bg-white" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
