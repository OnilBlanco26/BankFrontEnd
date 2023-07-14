/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      xxs: "450px",
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
    },

    extend: {
      fontFamily: {
        nunito: "Nunito",
        poppins: "Poppins",
      },
      colors: {
        gray: { 100: "#808080", 200: "#323232", 300: "#212121" },
        white: "#fff",
        red: "#d6436e",
        green: "#25da72",
        orange: "#fbbd23",
      },
      fontSize: {
        sm: "14px",
        md: "18px",
        lg: "24px",
        xl: "32px",
        base: "16px",
      },
    },
  },
  plugins: [],
};
