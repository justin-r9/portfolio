'use client';

import { useState } from 'react';
import PageNavigation from "@/components/ui/PageNavigation";

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to send message');

            setStatus('success');
            (e.target as HTMLFormElement).reset();

            // Reset status to idle after 3 seconds so user can send again
            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        } catch (error) {
            console.error(error);
            setStatus('error');

            // Allow retry after error too
            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        }
    }

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950">
            <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Nav at Top */}
                <div className="mb-4">
                    <PageNavigation />
                </div>

                <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                        Get in Touch
                    </h1>
                    <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                        Have a question or want to work together?
                    </p>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-500 delay-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="mt-1 block w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="mt-1 block w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                required
                                className="mt-1 block w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                        </button>

                        {status === 'error' && (
                            <p className="text-sm text-red-600 text-center">
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </form>

                    <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center space-y-4">
                        <p className="text-sm text-zinc-500 uppercase tracking-wide font-semibold">Connect & Chat</p>

                        {/* WhatsApp Button - Prominent */}
                        <a
                            href="https://wa.me/2348166454746"
                            target="_blank"
                            className="flex items-center justify-center space-x-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-transform hover:scale-105 shadow-md"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                            <span>Chat on WhatsApp</span>
                        </a>

                        <div className="flex justify-center space-x-6 pt-4">
                            <a href="mailto:contact@iyidobi.com" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                                Email
                            </a>
                            <a href="https://www.linkedin.com/in/iyidobice/" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-700 dark:hover:text-blue-500 font-medium">
                                LinkedIn
                            </a>
                            <a href="https://github.com/justin-r9/" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-700 dark:hover:text-blue-500 font-medium">
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
