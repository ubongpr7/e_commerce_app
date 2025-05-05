"use client";

import { useEffect, useState, useRef } from "react";
import SanityClient from "@/lib/sanityClient";
import { urlForImage } from "@/lib/sanityImage";
import Image from "next/image";

interface Banner {
  _id: string;
  image: any;
  link: string;
}

const Carousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch banners from Sanity
  useEffect(() => {
    SanityClient.fetch(`*[_type == "banner"]{_id, image, link}`)
      .then((data: Banner[]) => {
        setBanners(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  // Auto-slide for desktop
  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  // Auto-scroll mobile on activeIndex change
  const scrollToIndex = (index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    const bannerWidth = container.offsetWidth * 0.85 + 16; // banner + margin
    container.scrollTo({
      left: index * bannerWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex]);

  return (
    <div className="group relative w-full lg:-mt-20 lg:border-0 max-w-2xl mx-auto overflow-hidden border-0 border-b-8 border-b-gray-300">
      {loading ? (
        <div className="relative w-full h-48 lg:h-72 animate-pulse">
          <div className="w-full h-full bg-gray-300 rounded-lg" />
        </div>
      ) : (
        <>
          {/* Mobile Carousel */}
          <div
            className="flex lg:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-0 pb-1.5"
            ref={carouselRef}
          >
            {banners.map((banner, index) => (
              <a
                key={banner._id}
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative shrink-0 h-48 w-[85%] snap-center rounded-lg transition-transform duration-500 ease-in-out ${index === 0
                  ? "mr-1"
                  : index === banners.length - 1
                    ? "ml-1"
                    : "mx-1"
                  }`}
              >
                <Image
                  src={urlForImage(banner.image).url()}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="object-cover rounded-sm"
                  loading="lazy"
                />
              </a>
            ))}
          </div>

          {/* Desktop Fade Carousel */}
          <div className="relative hidden mt-24 lg:flex w-full h-80">
            {banners.map((banner, index) => (
              <div
                key={banner._id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
              >
                <a
                  href={banner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 block w-full h-full rounded-sm overflow-hidden"
                >
                  <Image
                    src={urlForImage(banner.image).url()}
                    alt={`Banner ${index + 1}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </a>
              </div>
            ))}

            {/* Navigation Buttons */}
            <button
              onClick={() =>
                setActiveIndex(
                  activeIndex === 0 ? banners.length - 1 : activeIndex - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full shadow hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ❮
            </button>
            <button
              onClick={() => setActiveIndex((activeIndex + 1) % banners.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full shadow hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ❯
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;