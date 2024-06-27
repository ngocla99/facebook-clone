/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        "scroll-thumb": "var(--scroll-thumb)",
        tooltip: "var(--tooltip)",

        hover: {
          DEFAULT: "var(--hover)",
        },

        active: "var(--active)",
        positive: "var(--positive)",

        background: {
          DEFAULT: "var(--background)",
          secondary: "var(--background-secondary)",
          comment: "var(--background-comment)",
        },
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      height: {
        header: "56px",
      },
      boxShadow: {
        DEFAULT: "0 1px 2px rgba(0, 0, 0, 0.2)",
        header: "1px 8px 15px -7px rgba(0, 0, 0, 0.1)",
        xl: "0 2px 12px rgba(0, 0, 0, 0.2)",
        "2xl":
          "0 12px 12px rgba(0, 0, 0, 0.2) , inset 0 0 0 0 rgba(255, 255, 255, 0.5)",
        "3xl":
          "0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
      },
      screens: {
        sm: "700px",
        md: "768px",
        lg: "1100px",
        xl: "1379px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-aria-attributes"),
  ],
}
