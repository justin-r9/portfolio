import { client } from "@/sanity/lib/client";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";
import { projects as mockProjects } from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageNavigation from "@/components/ui/PageNavigation";

// Revalidate every 60 seconds
export const revalidate = 60;

// Type definition for valid categories
type CategorySlug = "data-analysis" | "automation";

interface Project {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    slug: string;
    status: string;
}

const CATEGORY_MAP: Record<CategorySlug, string> = {
    "data-analysis": "Data Analysis",
    "automation": "Automation"
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

        // Sanity might return empty. Fallback to mock data filtering.
        if (projects.length > 0) return projects;

        return mockProjects.filter(p => p.category === categoryTitle);

    } catch (error) {
        console.error("Error fetching projects:", error);
        return mockProjects.filter(p => p.category === categoryTitle);
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
                        <div className="col-span-full py-12 text-center text-slate-500">
                            <p>No projects found in this category.</p>
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
