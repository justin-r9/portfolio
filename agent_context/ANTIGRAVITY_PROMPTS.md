MASTER PROMPTS FOR GOOGLE ANTIGRAVITY (V2 - With Auto-Population)

Context Setup:
Ensure the folder agent_context containing the Blueprint V5 and Content Manual V5 is present in the workspace.

PROMPT 1: The Foundation & Schema (Agent A)

"Act as a Senior Full-Stack Architect. Review the file agent_context/PROJECT_BLUEPRINT_V5.md.

CONTEXT: I have already scaffolded the Next.js 14 app and initialized Sanity at /app/studio.

YOUR TASK:

Based on the Blueprint, generate the Sanity Schema definitions for:

project (fields: title, slug, category, status, image, description)

photo (fields: title, image, alt, category)

post (fields: title, slug, excerpt, body, image, category)

milestone (fields: year, title, description)

book (fields: title, author, status, coverImage)

Register these schemas in sanity/schemaTypes/index.ts.

Ensure the sanity.config.ts is correctly set up to load these schemas.

Do not build the UI yet. Focus only on the scaffold and the backend structure."

PROMPT 2: The UI Components (Agent B)

"Review the 'Feature Specifications' in agent_context/PROJECT_BLUEPRINT_V5.md. I need you to build the core UI components in /components.

CRITICAL INSTRUCTION: Create a file lib/mockData.ts. Populate it with 'Medical Ipsum' text (e.g., 'The patient presented with acute code deficiencies...') and placeholder image URLs (use 'https://placehold.co/600x400') for Projects, Photos, and Blog Posts. This will be used as a fallback.

Components to build:

NewsCard.tsx: For the Blog. Use Tailwind's line-clamp-3.

PhotoGrid.tsx: A responsive grid. Images zoom slightly within their container on hover (overflow-hidden, scale-105).

ComingSoonBadge.tsx: A visual overlay (Greyscale + 'Pending Clinical Trial' label).

SpinalCord.tsx: The mobile timeline (vertical dotted line with nodes)."

PROMPT 3: The Page Assembly (Agent C)

"Now, assemble the pages defined in the Blueprint V5.

CRITICAL INSTRUCTION: For every page, implement a data fallback. Try to fetch from Sanity first; if the result is empty or null, use the data from lib/mockData.ts. Do not render empty pages.

app/photography/page.tsx: Render PhotoGrid.

app/blog/page.tsx: Render NewsCard grid.

app/work/page.tsx: Render Projects. Apply ComingSoonBadge if status is 'Coming Soon'.

app/about/page.tsx:

Top: Medical Credential & CV Download.

Middle: Timeline (SpinalCord Mobile).

Bottom: Speedcubing Stats & Reading Log.

app/contact/page.tsx: Email and WhatsApp links.

Ensure the Navigation Bar (Home, Work, Photography, Blog, About, Contact) is present on all pages."