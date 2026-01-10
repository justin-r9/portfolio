'use client';

import { motion } from 'framer-motion';

interface Milestone {
    id: string;
    year: string;
    title: string;
    description: string;
}

interface SpinalCordProps {
    milestones: Milestone[];
}

export default function SpinalCord({ milestones }: SpinalCordProps) {
    return (
        <div className="relative border-l-2 border-dashed border-slate-300 dark:border-slate-700 ml-4 pl-10 py-4 space-y-16">
            {milestones.map((milestone, index) => (
                <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative"
                >
                    {/* Node */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="absolute -left-[49px] top-1.5 h-5 w-5 rounded-full border-4 border-white dark:border-slate-950 bg-blue-500 shadow-md z-10"
                    />

                    <div className="flex flex-col group p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors -mt-4">
                        <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400 mb-1">
                            {milestone.year}
                        </span>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {milestone.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                            {milestone.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
