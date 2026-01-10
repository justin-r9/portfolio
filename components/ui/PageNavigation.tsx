'use client';

import Link from 'next/link';

interface PageNavigationProps {
    backUrl?: string;
    backLabel?: string;
}

export default function PageNavigation({ backUrl, backLabel }: PageNavigationProps) {
    return (
        <div className="fixed bottom-20 right-8 z-50 sm:top-28 sm:left-8 flex flex-col-reverse sm:flex-col items-end sm:items-start gap-3 opacity-80 hover:opacity-100 transition-opacity print:hidden pointer-events-none">
            {/* Return to Home - Always Visible (Enable pointer events for button) */}
            <Link
                href="/"
                className="pointer-events-auto flex items-center justify-center p-3.5 bg-cyan-600 dark:bg-red-600 border border-cyan-500 dark:border-red-500 rounded-full shadow-xl hover:bg-cyan-500 dark:hover:bg-red-500 hover:scale-110 transition-all group"
                title="Return to Home"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </Link>

            {/* Optional Back to Parent Button */}
            {backUrl && (
                <Link
                    href={backUrl}
                    className="pointer-events-auto flex items-center justify-center p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full shadow-md hover:bg-white dark:hover:bg-slate-900 hover:shadow-lg transition-all group"
                    title={backLabel || "Go Back"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                </Link>
            )}
        </div>
    );
}
