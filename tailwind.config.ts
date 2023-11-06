import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/bg.svg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
