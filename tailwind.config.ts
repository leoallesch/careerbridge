import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode with a class (e.g., add "dark" to <html>)
  plugins: [],
  theme: {
    extend: {
      colors: {
        // Use CSS variables with hsl() for dynamic theming
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))', // Now uses the CSS variable
        secondary: 'hsl(var(--secondary))',
        'text-light': 'hsl(var(--text-light))',
        'text-muted': 'hsl(var(--text-muted, 208 18% 52%))', // Fallback intact
        gray: {
          100: 'hsl(var(--gray-100))',
          500: 'hsl(var(--gray-500))',
          900: 'hsl(var(--gray-900))',
        },
      },
      fontSize: {
        sm: 'var(--text-sm)',
        md: 'var(--text-md)',
        lg: 'var(--text-lg)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
      },
    },
  },
};

export default config;