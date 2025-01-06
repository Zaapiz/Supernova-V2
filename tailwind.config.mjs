/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "nav-bg": "#343A40",
        "title-blue": "#008cff",
        "darker-blue": "#006cc5",
        "darkerer-blue": "#0464b3",
      },
      fontFamily: {
        poppins: "Poppins",
        rubik: "Rubik",
      },
      spacing: {
        textw: "864px",
        buttonr: "550px",
        half: "50vh",
      },
      size: {
        idk: "500px",
      },
    },
  },
  plugins: [],
};
