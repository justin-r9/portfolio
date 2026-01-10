import { client } from "@/sanity/lib/client";
import SpinalCord from "@/components/ui/SpinalCord";
import { milestones as mockMilestones } from "@/lib/mockData";
import HeroSection from '@/components/HeroSection';

export const revalidate = 60;

async function getData() {
  try {
    const milestones = await client.fetch(`*[_type == "milestone"] | order(year asc){
      "id": _id,
      year,
      title,
      description
    }`);

    return {
      milestones: milestones.length > 0 ? milestones : mockMilestones,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      milestones: mockMilestones,
    };
  }
}

export default async function Home() {
  const { milestones } = await getData();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. The Journey (Timeline) */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 border-l-4 border-blue-600 pl-4">
              The Journey
            </h2>
            <p className="mt-2 pl-5 text-lg text-slate-600 dark:text-slate-400">
              From clinical rotations to code commitments.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <SpinalCord milestones={milestones} />
          </div>
        </div>
      </section>

      {/* 3. Achievements & Downloads */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-12">
            Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* CV Download Card */}
            <div className="group rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Curriculum Vitae</h3>
              <p className="mt-2 text-slate-500 mb-6">
                A detailed overview of my medical and engineering career.
              </p>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Download CV
              </a>
            </div>

            {/* Certificates / Placeholder */}
            <div className="group rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Certifications</h3>
              <p className="mt-2 text-slate-500 mb-6">
                Medical licenses and software engineering certifications.
              </p>
              <button
                disabled
                className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400 cursor-not-allowed dark:bg-slate-800"
              >
                View Documents
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
