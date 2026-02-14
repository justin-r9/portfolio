import Link from 'next/link';

import PageNavigation from "@/components/ui/PageNavigation";

const interests = [
    {
        id: 'chess',
        title: 'Chess',
        description: 'Blunders, Gambits, and Lichess Ratings.',
        href: '/interests/chess',
        color: 'bg-emerald-600',
        textColor: 'text-emerald-600',
        bgLight: 'bg-emerald-50',
        bgDark: 'dark:bg-emerald-900/20',
        border: 'border-emerald-200',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.663-.658v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.315-4.907 48.53 48.53 0 00-3.897.258.64.64 0 00-.657-.643v0c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0zM12 15.75h.007v.008H12v-.008z" />
            </svg>
        )
    },
    {
        id: 'writing',
        title: 'Writing',
        description: 'Quora answers and articles.',
        href: '/interests/writing',
        color: 'bg-amber-600',
        textColor: 'text-amber-600',
        bgLight: 'bg-amber-50',
        bgDark: 'dark:bg-amber-900/20',
        border: 'border-amber-200',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        )
    },
];

export default function InterestsPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8">
            <div className="mx-auto max-w-7xl h-full flex flex-col">

                <div className="mb-8">
                    <PageNavigation />
                </div>

                <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
                        Interests
                    </h1>
                    <p className="mt-4 text-xl text-slate-600 dark:text-slate-400">
                        Exploring my passions beyond the code.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] animate-in fade-in zoom-in duration-700">
                    {interests.map((item, index) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`group relative overflow-hidden rounded-3xl border ${item.border} ${item.bgLight} ${item.bgDark} p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                            ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}
                            `}
                        >
                            <div className="relative z-10 flex flex-col items-start justify-between h-full">
                                <div className={`p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm ${item.textColor}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h2 className={`text-2xl font-bold ${item.textColor} mb-2`}>
                                        {item.title}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Background Icon */}
                            <div className={`absolute -right-8 -bottom-8 opacity-5 dark:opacity-10 pointer-events-none transform rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                                <div className={`w-40 h-40 ${item.textColor}`}>
                                    {item.icon}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
