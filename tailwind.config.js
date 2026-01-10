/** @type {import('tailwindcss').Config} */
module.exports = {
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
        // Foundation colors
        "foundation-1": "#7B1AD8",
        "foundation-2": "#E50085",
        "foundation-3": "#C21AD6",

        // Content colors
        "content-1": "#727DEF",
        "content-2": "#373E65",
        "content-3": "#24284D",
        "content-4": "#725BC1",
        "content-5": "#925BC0",
        "content-6": "#E2CCFF",

        // Grey colors
        "grey-1": "#FFFFFF",
        "grey-2": "#7F7F7F",
        "grey-3": "#9A9A9A",
        "grey-4": "#000000",
      },
      fontFamily: {
        'primary': ['Sora', 'sans-serif'],
        'secondary': ['SpaceGrotesk', 'sans-serif'],
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
