'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useCallback, useRef } from 'react';

// Duplicate definition to avoid circular dep
interface Photo {
    id: string;
    src: string;
    alt: string;
    width?: number;
    height?: number;
    blurDataURL?: string;
}

interface LightboxProps {
    photos: Photo[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function Lightbox({ photos, initialIndex, isOpen, onClose }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [direction, setDirection] = useState(0);
    const touchStartX = useRef<number | null>(null);

    // Reset index when opening
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setDirection(0);
        }
    }, [isOpen, initialIndex]);

    const handleNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1 < photos.length ? prev + 1 : 0));
    }, [photos.length]);

    const handlePrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : photos.length - 1));
    }, [photos.length]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, handleNext, handlePrev]);

    // Swipe handlers
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartX.current) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;

        // Threshold for swipe
        if (Math.abs(diff) > 50) {
            if (diff > 0) handleNext(); // Swipe Left -> Next
            else handlePrev(); // Swipe Right -> Prev
        }
        touchStartX.current = null;
    };

    const currentPhoto = photos[currentIndex];

    return (
        <AnimatePresence>
            {isOpen && currentPhoto && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 overflow-hidden"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Close Button - Fixed Top Right */}
                    <button
                        onClick={onClose}
                        className="fixed top-6 right-6 z-[80] p-2 bg-black/50 hover:bg-black/70 rounded-full text-white hover:text-blue-400 transition-colors backdrop-blur-md"
                        aria-label="Close lightbox"
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Navigation Buttons (Desktop) */}
                    {photos.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-[70] p-3 bg-black/50 hover:bg-black/80 rounded-full text-white transition-all backdrop-blur-sm"
                                aria-label="Previous image"
                            >
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-[70] p-3 bg-black/50 hover:bg-black/80 rounded-full text-white transition-all backdrop-blur-sm"
                                aria-label="Next image"
                            >
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Image Container */}
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: direction * 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -50 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative flex items-center justify-center pointer-events-none"
                    >
                        {/* 
                          Use intrinsic width/height if available to allow 'click outside' to work.
                          If no dimensions (mock data), fall back to a fixed container size.
                        */}
                        <div
                            className="relative pointer-events-auto"
                            onClick={(e) => e.stopPropagation()} // Stop click from closing ONLY on the image itself
                        >
                            {currentPhoto.width && currentPhoto.height ? (
                                <Image
                                    src={currentPhoto.src}
                                    alt={currentPhoto.alt}
                                    width={currentPhoto.width}
                                    height={currentPhoto.height}
                                    className="max-h-[85vh] w-auto max-w-[90vw] object-contain rounded-md"
                                    quality={100}
                                    priority
                                    placeholder={currentPhoto.blurDataURL ? 'blur' : undefined}
                                    blurDataURL={currentPhoto.blurDataURL}
                                />
                            ) : (
                                <div className="relative w-[90vw] h-[80vh]">
                                    <Image
                                        src={currentPhoto.src}
                                        alt={currentPhoto.alt}
                                        fill
                                        className="object-contain"
                                        quality={100}
                                        priority
                                        placeholder={currentPhoto.blurDataURL ? 'blur' : undefined}
                                        blurDataURL={currentPhoto.blurDataURL}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Caption / Counter */}
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] text-white/90 bg-black/50 px-4 py-1 rounded-full backdrop-blur-md font-medium text-sm">
                        {currentIndex + 1} / {photos.length}
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
