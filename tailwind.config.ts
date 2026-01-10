import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            animation: {
                ecg: 'draw 2.5s linear infinite',
            },
            keyframes: {
                draw: {
                    '0%': { strokeDashoffset: '1000' },
                    '50%': { strokeDashoffset: '0' },
                    '100%': { strokeDashoffset: '-1000' },
                }
            }
        },
    },
    plugins: [],
};
export default config;
