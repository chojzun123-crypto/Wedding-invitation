import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 따뜻한 화이트 배경 + 블러시 로즈 / 뮤트 골드 포인트 (로맨틱 미니멀)
        ivory: "#FCFAF7",
        paper: "#FFFFFF",
        ink: "#3A3531",
        sub: "#938A82",
        line: "#EDE6DD",
        point: "#A98379",   // 더스티 로즈 (강조)
        accent: "#C2A36B",  // 뮤트 골드 (라벨/디테일)
        blush: "#F4ECE8",   // 아주 옅은 로즈 (배경 톤)
      },
      fontFamily: {
        serif: ["var(--font-myeongjo)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      maxWidth: {
        card: "420px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s ease-out forwards",
        fadeIn: "fadeIn 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
