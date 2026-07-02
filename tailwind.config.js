/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1628",
          light: "#1B2B4A",
          muted: "#64748B",
        },
        gold: {
          DEFAULT: "#D4A853",
          soft: "rgba(212, 168, 83, 0.12)",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F7FAFC",
          bg: "#F0F4F8",
          bg2: "#E2E8F0",
          border: "#EDF2F7",
        },
        ink: {
          DEFAULT: "#1A202C",
          soft: "#4A5568",
          faint: "#94A3B8",
        },
        success: {
          text: "#065F46",
          bg: "#ECFDF5",
          border: "#A7F3D0",
          strong: "#059669",
        },
        danger: {
          text: "#991B1B",
          bg: "#FEF2F2",
          border: "#FECACA",
          strong: "#DC2626",
        },
        warning: {
          text: "#92400E",
          bg: "#FFFBEB",
          border: "#FDE68A",
        },
        info: {
          text: "#1E40AF",
          bg: "#EFF6FF",
          border: "#93C5FD",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 20px 60px rgba(10, 22, 40, 0.08), 0 8px 24px rgba(10, 22, 40, 0.04)",
        panel: "0 12px 30px rgba(10, 22, 40, 0.2)",
      },
      borderRadius: {
        xl2: "28px",
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(145deg, #0A1628 0%, #1B2B4A 100%)",
        "page-gradient": "linear-gradient(135deg, #F0F4F8 0%, #E2E8F0 100%)",
      },
    },
  },
  plugins: [],
};
