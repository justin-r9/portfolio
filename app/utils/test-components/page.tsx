import NewsCard from "@/components/ui/NewsCard";
import PhotoGrid from "@/components/ui/PhotoGrid";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";
import SpinalCord from "@/components/ui/SpinalCord";
import { projects, photos, posts, milestones } from "@/lib/mockData";
import Image from "next/image";

export default function TestComponentsPage() {
    return (
        <div className="max-w-5xl mx-auto p-8 space-y-12">
            <section>
                <h2 className="text-2xl font-bold mb-4">NewsCard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <NewsCard key={post.id} {...post} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">PhotoGrid</h2>
                <PhotoGrid photos={photos} />
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">ComingSoonBadge</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <ComingSoonBadge key={project.id} label="Pending Clinical Trial">
                            <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                                    <span className="text-xs font-mono text-zinc-400 mb-1">
                                        {project.category}
                                    </span>
                                    <h3 className="text-white font-bold">{project.title}</h3>
                                </div>
                            </div>
                        </ComingSoonBadge>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">SpinalCord</h2>
                <SpinalCord milestones={milestones} />
            </section>
        </div>
    );
}
