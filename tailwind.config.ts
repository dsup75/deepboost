import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#050507",
          secondary: "#09090D",
        },
        card: "#101016",
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
        },
        text: {
          DEFAULT: "#F5F5F7",
          muted: "#9696A3",
        },
        violet: {
          DEFAULT: "#7C3AED",
          light: "#A78BFA",
        },
        cyan: {
          DEFAULT: "#22D3EE",
          light: "#67E8F9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
      },
      backgroundImage: {
        "gradient-violet-blue": "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
        "gradient-violet-cyan": "linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%)",
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
