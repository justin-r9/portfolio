import { client } from "@/sanity/lib/client";
import Image from "next/image";
import PageNavigation from "@/components/ui/PageNavigation";

// Revalidate every 60 seconds
export const revalidate = 60;

interface Project {
    id: string;
    title: string;
    imageUrl: string;
    blurDataURL?: string;
    slug: string;
    status: string;
    description?: string;
    liveSiteUrl?: string;
    sourceCodeUrl?: string;
    techStack?: string[];
}

async function getProjects() {
    try {
        // Fetch all projects. 
        // We removed 'category', so everything here is Web Design.
        const projects = await client.fetch(`*[_type == "project"]{
      "id": _id,
      title,
      "imageUrl": image.asset->url,
      "blurDataURL": image.asset->metadata.lqip,
      "slug": slug.current,
      status,
      description,
      liveSiteUrl,
      sourceCodeUrl,
      techStack
    }`);

        return projects;

    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export default async function WorkPage() {
    const projects = await getProjects();

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <PageNavigation />
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                        Web Design
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        A curated archive of engineering challenges solved.
                    </p>
                </div>

                <div className="space-y-20">
                    {projects.map((project: Project, index: number) => (
                        <div key={project.id} className={`flex flex-col gap-12 lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                            {/* Image Section */}
                            <div className="flex-1">
                                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-800">
                                    <ProjectImage
                                        src={project.imageUrl}
                                        alt={project.title}
                                        blurDataURL={project.blurDataURL}
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 lg:pl-10">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                                    {project.title}
                                </h2>

                                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                    {project.description || "Project description coming soon."}
                                </p>

                                {project.techStack && (
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.techStack.map((tech) => (
                                            <span key={tech} className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-3 py-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-4">
                                    {project.liveSiteUrl && (
                                        <a
                                            href={project.liveSiteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                                        >
                                            Visit Live Site
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                    {project.sourceCodeUrl && (
                                        <a
                                            href={project.sourceCodeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 px-6 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            Source Code
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="mt-20 flex flex-col items-center justify-center text-center">
                        <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-4 mb-4">
                            <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            No projects found
                        </h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-sm">
                            Projects are currently being added to the archives. Please check back shortly.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}

function ProjectImage({ src, alt, blurDataURL }: { src: string, alt: string, blurDataURL?: string }) {
    return (
        <Image
            src={src || "https://placehold.co/600x400/png?text=Project+Preview"}
            alt={alt}
            fill
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
    )
}
