'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface NewsCardProps {
    title: string;
    excerpt: string;
    imageUrl: string;
    slug: string;
    date: string;
}

export default function NewsCard({ title, excerpt, imageUrl, slug, date }: NewsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
        >
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide">{date}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
                    {excerpt}
                </p>
                <Link
                    href={`/blog/${slug}`}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-auto flex items-center gap-1"
                >
                    Read Article
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </motion.div>
    );
}
