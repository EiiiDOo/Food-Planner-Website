import type { Config } from "tailwindcss";
import tailwindScrollbar from "tailwind-scrollbar";
import tailwindScrollbarHide from "tailwind-scrollbar-hide";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "logo-color": "#83c9b1",
        "custom-bg": "url('/back_new.jpg')",
      },
    },
  },
  plugins: [tailwindScrollbar, tailwindScrollbarHide, daisyui],
} satisfies Config;
