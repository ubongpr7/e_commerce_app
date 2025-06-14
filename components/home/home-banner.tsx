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
    <div className="relative bg-cover w-full lg:-mt-20 lg:max-w-lg xl:max-w-2xl lg:border-0 mx-auto overflow-hidden border-0 border-b-8 border-b-gray-300">
      {loading ? (
        <div className="relative w-full h-48 lg:h-72 animate-pulse">
          <div className="w-full h-full bg-gray-300 rounded-lg" />
        </div>
      ) : (
        <>
          {/* Mobile Carousel */}
          <div
            className="flex lg:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-0 pb-1.5 h-[185px] md:h-[365px]"
            ref={carouselRef}
          >
            {banners.map((banner, index) => (
              <a
                key={banner._id}
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative shrink-0 h-[180px] md:h-[360px] w-[90%] snap-center rounded-lg transition-transform duration-500 ease-in-out ${index === 0
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
                  className="object-cover bg-contain h-auto w-full"
                  loading="lazy"
                />
              </a>
            ))}
          </div>

          {/* Desktop Fade Carousel */}
          <div className="relative hidden lg:flex group w-full h-[380px] mt-24">
            {banners.map((banner, index) => (
              <div
                key={banner._id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === activeIndex
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
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
                    className="object-cover rounded-sm bg-contain h-auto w-full"
                    loading="lazy"
                  />
                </a>
              </div>
            ))}

            {/* Navigation Buttons (Desktop) */}
            <button
              onClick={() =>
                setActiveIndex(
                  activeIndex === 0 ? banners.length - 1 : activeIndex - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-600 text-white p-2 bg-gray-800/70 hover:bg-gray-800 rounded-full w-10 h-10 z-10shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              ❮
            </button>
            <button
              onClick={() => setActiveIndex((activeIndex + 1) % banners.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-600 text-white p-2 bg-gray-800/70 hover:bg-gray-800 rounded-full w-10 h-10 z-10shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
