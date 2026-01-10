'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, SystemIcon } from './Icons';

// Updated Nav Items: Work, Photography, Hobbies, Contact
const navItems = [
    { name: 'Work', href: '/work' },
    { name: 'Photography', href: '/photography' },
    { name: 'Interests', href: '/interests' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close theme menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.theme-dropdown')) {
                setIsThemeMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const themeOptions = [
        { id: 'light', name: 'Light', icon: SunIcon },
        { id: 'dark', name: 'Dark', icon: MoonIcon },
        { id: 'system', name: 'System', icon: SystemIcon },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/70 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/70 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 transition-all duration-300">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        Chinonye<span className="text-blue-600">.</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-base font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${isActive
                                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                    : 'text-slate-600 dark:text-slate-400'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* Theme Dropdown */}
                    <div className="relative theme-dropdown ml-4">
                        <button
                            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Toggle Theme Menu"
                        >
                            {mounted ? (
                                resolvedTheme === 'dark' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />
                            ) : (
                                <SunIcon className="h-6 w-6" />
                            )}
                        </button>

                        {isThemeMenuOpen && (
                            <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-lg bg-white dark:bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-200">
                                <div className="py-1">
                                    {themeOptions.map((option) => {
                                        const Icon = option.icon;
                                        const isSelected = theme === option.id;
                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    setTheme(option.id);
                                                    setIsThemeMenuOpen(false);
                                                }}
                                                className={`group flex w-full items-center px-4 py-2 text-sm ${isSelected
                                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                <Icon className="mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400" />
                                                {option.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center space-x-4 md:hidden">
                    {/* Theme Toggle - Simple Cycle for Mobile or Dropdown? Let's use simple cycle for mobile for better UX, or the same menu? 
                        User asked for "clicking the toggle button opens a small menu". Let's stick to menu for desktop, but maybe cycle for mobile?
                        Actually, let's just make the mobile button cycle for simplicity unless requested otherwise. Or reuse logic.
                        Let's reuse logic but simpler: Cycle Light -> Dark -> System
                     */}
                    <button
                        onClick={() => {
                            if (theme === 'light') setTheme('dark');
                            else if (theme === 'dark') setTheme('system');
                            else setTheme('light');
                        }}
                        className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 transition-colors"
                    >
                        {mounted && resolvedTheme === 'dark' ? (
                            <MoonIcon className="h-6 w-6" />
                        ) : (
                            <SunIcon className="h-6 w-6" />
                        )}
                    </button>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                        aria-controls="mobile-menu"
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1.5 overflow-hidden">
                            <span className={`block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 dark:border-slate-800" id="mobile-menu">
                    <div className="space-y-1 px-4 pb-3 pt-2 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block rounded-md px-3 py-3 text-lg font-medium transition-colors ${isActive
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}

