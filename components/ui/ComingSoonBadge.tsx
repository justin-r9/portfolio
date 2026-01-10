interface ComingSoonBadgeProps {
    children?: React.ReactNode;
    label?: string;
}

export default function ComingSoonBadge({ children, label = "Pending Clinical Trial" }: ComingSoonBadgeProps) {
    return (
        <div className="relative group overflow-hidden rounded-xl">
            <div className="grayscale transition-all duration-700 ease-out group-hover:grayscale-0">
                {children}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-[2px] opacity-100 transition-opacity duration-500 group-hover:opacity-0 group-hover:pointer-events-none">
                <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-2xl transform transition-transform duration-500 group-hover:scale-110">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">
                        {label}
                    </span>
                </div>
            </div>
        </div>
    );
}
