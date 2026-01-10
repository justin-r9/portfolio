'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="contents">{children}</div>;
    }

    // Use theme as key to force re-mount of children when it changes
    // This satisfies "Changing the theme should force the entire site to completely re-render itself from scratch"
    return (
        <div key={theme} className="contents">
            {children}
        </div>
    );
}
