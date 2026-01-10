import PageNavigation from "@/components/ui/PageNavigation";
import { DesignIcon } from "@/components/ui/Icons";

export default function DesignPage() {
    return (
        <main className="h-[calc(100vh-81px)] w-full bg-slate-50 dark:bg-slate-950 overflow-hidden flex flex-col items-center justify-center relative p-4">
            <PageNavigation backUrl="/interests" backLabel="Back to Interests" />

            <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mb-4">
                    <DesignIcon className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Graphic Design Gallery
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    A collection of logos, posters, and UI concepts.
                    <br />
                    <span className="italic opacity-70">(Content coming soon)</span>
                </p>
            </div>
        </main>
    );
}
