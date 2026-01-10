'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-20 pb-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50"
                    >
                        Medical Student & Software Engineer
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl md:text-7xl"
                    >
                        Bridging <span className="text-blue-600 relative inline-block">
                            Medicine
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-200 dark:text-blue-900 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span> & <span className="text-slate-800 dark:text-slate-100">Code</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mt-6 max-w-2xl text-xl text-slate-600 dark:text-slate-400"
                    >
                        Building intelligent systems that understand the complexities of healthcare.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="/work"
                            className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-500 hover:-translate-y-1 hover:shadow-blue-500/40"
                        >
                            View My Work
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-slate-700 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 transition-all hover:bg-slate-50 hover:-translate-y-1 hover:shadow-slate-200/70 dark:bg-slate-800 dark:text-slate-200 dark:shadow-slate-900/50 dark:ring-slate-700 dark:hover:bg-slate-700"
                        >
                            Contact Me
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
