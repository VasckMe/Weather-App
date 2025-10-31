/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", 
    ],
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "background-light": "#F5F5F5",
          "background-dark": "#101c22",
          
          "primary": "#87CEEB",
          "accent": "#FFD700",
          "text-light": "#333333",
          "text-dark": "#F5F5F5",
          "card-light": "#FFFFFF",
          "card-dark": "#1a2a33"
        },
        borderRadius: {
          "DEFAULT": "0.5rem",
          "lg": "0.75rem",
          "xl": "1rem",
          "full": "9999px"
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/container-queries'),
    ],
  }