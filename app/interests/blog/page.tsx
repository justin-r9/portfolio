import ReturnHome from "@/components/ui/ReturnHome";
import { NewspaperIcon } from "@/components/ui/Icons";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="mb-8">
                <ReturnHome />
            </div>

            <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-4">
                    <NewspaperIcon className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                    The Cortex
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Thoughts, tutorials, and medical insights.
                    <br />
                    <span className="italic opacity-70">(Content coming soon)</span>
                </p>
            </div>
        </main>
    );
}
