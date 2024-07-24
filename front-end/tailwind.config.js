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
    fontSize: {
      sm: "13px",
      base: "15px",
      lg: "17px",
    },
    extend: {
      colors: {
        border: "var(--border)",
        separator: "var(--separator)",
        input: "var(--input)",
        ring: "var(--ring)",
        "scroll-thumb": "var(--scroll-thumb)",
        tooltip: "var(--tooltip)",

        hover: {
          DEFAULT: "var(--hover)",
          media: "var(--hover-media)",
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
          flat: "var(--card-flat)",
        },
        toast: {
          DEFAULT: "var(--toast)",
          foreground: "var(--toast-foreground)",
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
      fontFamily: {
        sans: ['"Segoe UI"', "Helvetica", "Arial", "sans-serif"],
        auth: ["Helvetica", "Arial", "sans-serif"],
      },
      screens: {
        sm: "700px",
        md: "768px",
        lg: "1100px",
        xl: "1379px",
        "2xl": "1536px",
      },
      keyframes: {
        "spin-fb": {
          "0%": {
            transform: "rotate(-90deg)",
          },
          "25%": {
            transform: "rotate(90deg)",
          },
          "50%": {
            transform: "rotate(270deg)",
          },
          "75%": {
            transform: "rotate(450deg)",
          },
          "100%": {
            transform: "rotate(990deg)",
          },
        },
        "spin-fb-circle": {
          "0%": {
            "stroke-dashoffset": "18.8px",
            transform: "rotate(-90deg)",
          },
          "25%": {
            "stroke-dashoffset": "84.4px",
            transform: "rotate(162deg)",
          },
          "50%": {
            "stroke-dashoffset": "42.4px",
            transform: "rotate(72deg)",
          },
          "75%": {
            "stroke-dashoffset": "84.8px",
            transform: "rotate(162deg)",
          },
          "100%": {
            "stroke-dashoffset": "18.8px",
            transform: "rotate(-90deg)",
          },
        },
      },
      animation: {
        "spin-fb": "spin-fb 2s cubic-bezier(0,0,1,1) infinite",
        "spin-fb-circle":
          "spin-fb-circle 2s cubic-bezier(.33,0,.67,1) infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-aria-attributes"),
  ],
}
