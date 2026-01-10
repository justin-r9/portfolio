import Link from 'next/link';

export default function ReturnHome() {
    return (
        <div className="flex justify-center py-8">
            <Link
                href="/"
                className="group flex items-center space-x-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-900/50 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
            >
                <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
                <span>Return to Home</span>
            </Link>
        </div>
    );
}
