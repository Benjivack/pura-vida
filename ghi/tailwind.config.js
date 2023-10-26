/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js, ts, tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        mountain:
          "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
      },
    },
  },
  plugins: [],
};
