import PageNavigation from "@/components/ui/PageNavigation";

export default function VideoPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
            <PageNavigation backUrl="/interests" backLabel="Back to Interests" />

            <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 mb-4">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Video Editing Portfolio
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Motion graphics, vlogs, and cinematic edits.
                    <br />
                    <span className="italic opacity-70">(Content coming soon)</span>
                </p>
            </div>
        </main>
    );
}
