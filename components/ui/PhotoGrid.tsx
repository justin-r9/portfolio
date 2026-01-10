'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Lightbox from './Lightbox';

interface Photo {
    id: string;
    src: string;
    alt: string;
    width?: number;
    height?: number;
    blurDataURL?: string;
}

interface PhotoGridProps {
    photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const isOpen = selectedIndex >= 0;

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {photos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group hover:z-10"
                        onClick={() => setSelectedIndex(index)}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 20vw"
                            className="object-cover transition-transform duration-500"
                            placeholder={photo.blurDataURL ? 'blur' : undefined}
                            blurDataURL={photo.blurDataURL}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">View</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Lightbox
                photos={photos}
                initialIndex={selectedIndex}
                isOpen={isOpen}
                onClose={() => setSelectedIndex(-1)}
            />
        </>
    );
}
