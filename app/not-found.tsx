'use client';

import Link from "next/link";
import PageNavigation from "@/components/ui/PageNavigation";

export default function NotFound() {
    return (
        <main className="h-[calc(100vh-81px)] w-full bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">

            <PageNavigation />

            <div className="relative z-10 text-center max-w-2xl mx-auto -mt-20">
                {/* ECG Line Container */}
                <div className="w-full h-32 md:h-40 mb-4 relative flex items-center justify-center">
                    {/* Flatline SVG Animation */}
                    <svg
                        viewBox="0 0 500 150"
                        className="w-full h-full drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,75 L100,75 L110,40 L130,110 L150,20 L170,130 L190,75 L500,75"
                            fill="none"
                            stroke="#EF4444"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="animate-ecg"
                        />
                    </svg>
                </div>

                <h1 className="text-6xl font-black tracking-tighter text-slate-900 dark:text-slate-50 mb-4">
                    404
                </h1>
                <p className="text-2xl text-slate-600 dark:text-slate-400 font-light mb-8">
                    Page Flatlined.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center px-8 py-3 rounded-full bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-semibold transition-transform hover:scale-105 active:scale-95 shadow-lg"
                >
                    Resuscitate (Home)
                </Link>
            </div>

            {/* Global Styles for Keyframes since we are in a module and might not modify global css easily here, 
            or we can rely on Tailwind config. Let's add inline style for the specific keyframe to ensure it works immediately. */}
            <style jsx>{`
            .animate-ecg {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: draw 2.5s linear infinite;
            }
            @keyframes draw {
                0% {
                    stroke-dashoffset: 1000;
                }
                50% {
                    stroke-dashoffset: 0;
                }
                100% {
                    stroke-dashoffset: -1000;
                }
            }
        `}</style>
        </main>
    );
}
