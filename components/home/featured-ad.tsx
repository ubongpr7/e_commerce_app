'use client';

import { useEffect, useState } from 'react';
import SanityClient from '@/lib/sanityClient';
import { urlForImage } from '@/lib/sanityImage';

interface FeaturedAdData {
    title: string;
    image: any;
    link: string;
    alt?: string;
}

const FeaturedAd = () => {
    const [data, setData] = useState<FeaturedAdData | null>(null);

    useEffect(() => {
        SanityClient.fetch(`*[_type == "featuredAd"][0]{title, image, link, alt}`)
            .then(setData)
            .catch(console.error);
    }, []);

    if (!data) {
        return (
            <div className="w-full h-[400px] bg-gray-200 animate-pulse" />
        );
    }

    const imageUrl = urlForImage(data.image).url(); // No size constraints here

    return (
        <div className='px-16 py-5'>
            <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-[350px] bg-cover bg-center bg-no-repeat rounded-lg shadow-lg"
                style={{ backgroundImage: `url(${imageUrl})` }}
                aria-label={data.alt || data.title}
            >
                <div className="w-full h-full bg-black/30 items-center justify-center hidden">
                    <h1 className="text-white text-4xl font-bold hidden">{data.title}</h1>
                </div>
            </a>
        </div>
    );
};

export default FeaturedAd;
