import { client } from "@/sanity/lib/client";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";

import Image from "next/image";

import { notFound } from "next/navigation";
import PageNavigation from "@/components/ui/PageNavigation";

// Revalidate every 60 seconds
export const revalidate = 60;

// Type definition for valid categories
type CategorySlug = "web-design" | "graphic-design";

interface Project {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    slug: string;
    status: string;
}

const CATEGORY_MAP: Record<CategorySlug, string> = {
    "web-design": "Web Design",
    "graphic-design": "Graphic Design"
};

async function getProjectsByCategory(categoryTitle: string) {
    try {
        // Sanity query filtering by category
        const projects = await client.fetch(`*[_type == "project" && category == $category]{
      "id": _id,
      title,
      category,
      "imageUrl": mainImage.asset->url,
      "slug": slug.current,
      status
    }`, { category: categoryTitle });

        // Sanity might return empty.
        return projects;

    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

// Correct param definition for Next.js App Router dynamic segments
type Props = {
    params: Promise<{ category: string }>;
}

export default async function CategoryPage(props: Props) {
    const params = await props.params;
    const categorySlug = params.category as CategorySlug;
    const categoryTitle = CATEGORY_MAP[categorySlug];

    if (!categoryTitle) {
        notFound();
    }

    const projects = await getProjectsByCategory(categoryTitle);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <PageNavigation backUrl="/work" backLabel="Back to Work" />
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                        {categoryTitle} Projects
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Selected works in {categoryTitle.toLowerCase()}.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project: Project) => {
                        const isComingSoon = project.status === 'Coming Soon' || true; // Default to badge active for visual demo based on requirement "Items are overlaid..."

                        return (
                            <div key={project.id} className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-shadow duration-300">
                                {/* Card Image */}
                                <div className="relative aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                                    {isComingSoon ? (
                                        <ComingSoonBadge>
                                            <ProjectImage src={project.imageUrl} alt={project.title} />
                                        </ComingSoonBadge>
                                    ) : (
                                        <ProjectImage src={project.imageUrl} alt={project.title} />
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="p-5">
                                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 block uppercase tracking-wide">
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                        {project.title}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}

                    {projects.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-700">
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-md">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-6">
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                    Case Studies in Progress
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Detailed breakdowns of my work in {categoryTitle.toLowerCase()} are currently being documented. Check back soon!
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-12">
                </div>
            </div>
        </main>
    );
}

function ProjectImage({ src, alt }: { src: string, alt: string }) {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
    )
}
