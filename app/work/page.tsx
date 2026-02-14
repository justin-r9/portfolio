import Link from "next/link";
import PageNavigation from "@/components/ui/PageNavigation";

export default function WorkPage() {
    return (
        <main className="h-[calc(100vh-81px)] w-full bg-slate-50 dark:bg-slate-950 overflow-hidden flex flex-col md:flex-row relative">

            {/* Floating Nav - Pass z-50 to ensure it's above the split layers */}
            <PageNavigation />


            {/* Left/Top Section: Web Design */}
            <Link
                href="/work/web-design"
                className="group relative flex flex-1 w-full md:w-1/2 items-center justify-center overflow-hidden bg-blue-600 dark:bg-blue-800/60 transition-all hover:flex-[1.2] hover:z-10 focus:outline-none"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-800 dark:to-slate-900 opacity-90 dark:opacity-90 transition-opacity group-hover:opacity-100" />

                <div className="relative z-10 text-center p-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Web Design</h2>
                    <p className="text-blue-100 text-lg md:text-xl max-w-md mx-auto opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        Crafting immersive digital experiences.
                    </p>
                    <div className="mt-8 inline-flex items-center rounded-full bg-white/20 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30 opacity-0 group-hover:opacity-100 duration-300">
                        Explore Projects &rarr;
                    </div>
                </div>
            </Link>


            {/* Right/Bottom Section: Graphic Design */}
            <Link
                href="/work/graphic-design"
                className="group relative flex flex-1 w-full md:w-1/2 items-center justify-center overflow-hidden bg-indigo-900 dark:bg-indigo-900/60 transition-all hover:flex-[1.2] hover:z-10 focus:outline-none"
            >
                <div className="absolute inset-0 bg-gradient-to-bl from-indigo-800 to-purple-900 dark:from-indigo-900 dark:to-slate-950 opacity-90 dark:opacity-90 transition-opacity group-hover:opacity-100" />

                <div className="relative z-10 text-center p-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Graphic Design</h2>
                    <p className="text-indigo-100 text-lg md:text-xl max-w-md mx-auto opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        Visual identity and creative branding.
                    </p>
                    <div className="mt-8 inline-flex items-center rounded-full bg-white/20 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30 opacity-0 group-hover:opacity-100 duration-300">
                        View Solutions &rarr;
                    </div>
                </div>
            </Link>
        </main>
    );
}
