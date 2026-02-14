# Iyidobi Chinonye - Portfolio

A curated portfolio website showcasing engineering projects, creative design, and photography. Built with modern web technologies to deliver a fast, responsive, and visually immersive experience.

## ✨ Features

- **Work Showcase**:
  - **Web Design**: Detailed case studies of engineering challenges and web solutions.
  - **Graphic Design**: Visual gallery of branding, posters, and flyers.
- **Photography Interface**: A custom photo grid integrated with Sanity for easy management.
- **Dynamic Content**: Powered by Sanity CMS for real-time updates without code changes.
- **Responsive Design**: Mobile-first architecture with smooth transitions and animations.
- **Embedded Studio**: Manage content directly from the `/studio` route.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root directory and add your Sanity credentials:
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
    NEXT_PUBLIC_SANITY_DATASET=production
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Managing Content

This project uses an embedded Sanity Studio.

1.  Navigate to [http://localhost:3000/studio](http://localhost:3000/studio).
2.  Login with your Sanity credentials.
3.  You can manage:
    - **Projects**: (Web Design, Graphic Design)
    - **Photos**: Upload and categorize photography.
    - **Posts**: Blog content (if enabled).

### Deployment

The project is optimized for deployment on Vercel.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Add the Environment Variables in the Vercel dashboard.
4.  Deploy!

Any changes made to the Sanity Schema will require a `sanity deploy` command or will be automatically handled if the Studio is embedded and deployed with the Next.js app (current setup).

## 📄 License

© 2026 Iyidobi Chinonye. All rights reserved.
