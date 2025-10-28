import type { Config } from "tailwindcss";

const config: Config = {
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
        category: {
          ai: '#8B5CF6',
          web: '#10B981',
          cloud: '#3B82F6',
          security: '#EF4444',
          mobile: '#06B6D4',
          data: '#F59E0B',
          blockchain: '#14B8A6',
          devops: '#8B5CF6',
        },
      },
    },
  },
  plugins: [],
};
export default config;
