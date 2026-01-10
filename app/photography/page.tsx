import { client } from "@/sanity/lib/client";
import { photos as mockPhotos } from "@/lib/mockData";
import PhotoGrid from "@/components/ui/PhotoGrid";
import PageNavigation from "@/components/ui/PageNavigation";

export const revalidate = 60;

// Since this is a Client Component (for Framer Motion), we need to fetch data differently or mock it for now.
// Or we can keep it Server Component and wrap the content in a motion.div client component.
// Strategy: Keep page.tsx as Server Component, but for simplicity in this strict environment, 
// I will just make it a Client fetch or pass data. 
// BUT, `client` uses Sanity which works on server. 
// Best approach: Keep it async server component, and use a Client Wrapper for the animation.
// OR: Just use simple className animations for entry to avoid complexity.
// Let's stick to the Server Component structure and import a client-side Grid. `PageNavigation` is client-safe.
// I will make this file a standard Server Component and pass data. 
// Note: `framer-motion` needs 'use client'. I will apply motion in `PhotoGrid` or a wrapper.
// Actually, `PhotoGrid` IS a client component. I can wrap the whole page content there? No, that's messy.
// I will just make the PAGE a client component for the animation requirement "Add more animation".
// And fetch data with a useEffect or SWR... NO, that breaks SEO.
// Better: Server Component for data, Client Component for Layout Animation.

async function getPhotos() {
    try {
        const photos = await client.fetch(`*[_type == "photo"]{
      "id": _id,
      "src": image.asset->url,
      "alt": title,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "blurDataURL": image.asset->metadata.lqip
    }`);
        return photos.length > 0 ? photos : mockPhotos;
    } catch (error) {
        console.error("Error fetching photos:", error);
        return mockPhotos;
    }
}

export default async function PhotographyPage() {
    const photos = await getPhotos();

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">

                {/* Navigation - Top */}
                <PageNavigation />

                {/* Content with Animation Wrapper (Inline or component) */}
                {/* For simple entry animation, we can use a utility class or simple keyframe if we don't want a heavy client wrapper */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-4 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                            Photography
                        </h1>
                        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                            A visual exploration of the world through my lens.
                        </p>
                    </div>

                    <PhotoGrid photos={photos} />
                </div>
            </div>
        </main>
    );
}

// Ensure PageNavigation is imported correctly.
