PROJECT BLUEPRINT: The Digital Headquarters

Version: 5.0.0 (The "Standard Navigation" Update)
Author: Chinonye Iyidobi (Owner) & Gemini (Architect)
Target: Full-Stack Portfolio (Next.js 14 / Sanity CMS)

1. Executive Summary

A unified platform utilizing standard, user-friendly navigation.

Work: The Technical Showcase (Data & Automation).

Photography: The Visual Portfolio.

Blog: The "Cortex" / Thought Leadership.

About: The Convergence of Medical Authority & Human Personality.

Contact: Direct Intake.

2. Technical Architecture

Framework: Next.js 14 (App Router).

CMS: Sanity.io (Embedded Studio).

Styling: Tailwind CSS + Framer Motion.

Deployment: Vercel.

Directory Structure

/app
  /page.tsx             (Hero: "Code & Clinical Insight")
  /work/page.tsx        (Consolidated: Data Analysis & Automation Projects)
  /photography/page.tsx (Live: Responsive Grid)
  /blog/                (Live: "Google News" Style Index)
    page.tsx
    [slug]/page.tsx
  /about/page.tsx       (Live: Medic Status, Timeline, Cubing, Reading)
  /contact/page.tsx     (Live: Intake Form)
  /api                  (Resend, Draft Mode)
/sanity
  /schemaTypes          (project, photo, post, book, milestone)
/components
  /ui                   (ComingSoonBadge, NewsCard, SpinalCord, PhotoGrid)


3. Feature Specifications

3.1 WORK (The Technician)

Route: /work

Content: Displays projects categorized as "Automation" or "Data Analysis".

State: Items are overlaid with the ComingSoonBadge (Greyscale + "Pending Clinical Trial" label).

Interaction: Non-clickable until live.

3.2 PHOTOGRAPHY (The Creative)

Route: /photography

Desktop: "Breathing Grid" (Scale up within container).

Mobile: Lightbox interaction.

3.3 BLOG (The Cortex)

Route: /blog

Layout: "Google News" Density.

Card: Thumbnail + Headline + 15-word Excerpt (Line-clamped).

Interaction: Clicking "Read More" opens the full slug.

3.4 ABOUT (The Anchor)

Route: /about

Section A (The Medic): UNN Class of 028 Status + Downloadable CV.

Section B (The Journey): The Timeline (Sine Wave on Desktop / Spinal Cord on Mobile).

Section C (The Human):

Speedcubing: Stat Card (PB: 22s).

Reading Log: Horizontal Scroll of book covers.

3.5 CONTACT

Route: /contact

Features: Resend API form + WhatsApp Link.