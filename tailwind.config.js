/** @type {import('tailwindcss').Config} */
const configs = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}", "./safelist.txt"],
  mode: "jit",
  // prefix: 'tw-',
  darkMode: "media",

  theme: {
    screens: {
      xs: "360px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1920px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      spacing: {
        "10px": "0.624rem",
        "88px": "5.5rem",
      },
      zIndex: {
        60: "60 !important",
      },
      boxShadow: {
        "l-1": "0px 1px 4px var(--shadow-color)",
        "l-2": "0px 3px 6px var(--shadow-color)",
        "l-3": " 0px 5px 8px var(--shadow-color)",
        "l-4": "0px 7px 10px var(--shadow-color)",
        "l-5": "0px 9px 12px var(--shadow-color)",
      },
      transitionDelay: {
        0: "0ms",
        2000: "2000ms",
      },
      scale: {
        200: "2",
        300: "3",
        400: "4",
      },
      margin: {
        17: "4.25rem",
        18: "4.5rem",
      },
      padding: {
        70: "17.5rem",
        17: "4.25rem",
        18: "4.5rem",
      },
      height: {
        11.5: "2.875rem",
        15: "3.75rem",
        17: "4.25rem",
        17.5: "4.375rem",
        18: "4.5rem",
        65: "16.25rem",
        50: "12.5rem",
        45: "11.25rem",
        150: "37.5rem",
        84: "21rem",
      },
      width: {
        15: "3.75rem",
        17: "4.25rem",
        17.5: "4.375rem",
        18: "4.5rem",
        65: "16.25rem",
        50: "12.5rem",
        45: "11.25rem",
        150: "37.5rem",
        84: "21rem",
      },
      maxHeight: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "9/10": "90%",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "9/10": "90%",
      },
      minHeight: {
        8: "2rem",
      },
      minWidth: {
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.5: "0.875rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem",
        px: "1px",
        auto: "auto",
      },
      colors: {},
      fontSize: {
        overline: ["0.625rem", "1.25rem"], // 10px
        caption: ["0.75rem", "1.5rem"], // 12px
        "body-2": ["0.8125rem", "1.75rem"], // 13px
        button: ["0.875rem", "1.875rem"], // 14px
        base: ["1rem", "2.125rem"], // 16px
        "subtitle-2": ["1rem", "2.125rem"], // 16px
        "subtitle-1": ["1.25rem", "2.625rem"], // 20px
        "headline-6": ["1.5rem", "3rem"], // 24px
        "headline-5": ["2rem", "3.5rem"], // 32px
        "headline-4": ["3rem", "4.75rem"], // 48px
        "headline-3": ["3.5rem", "5.375rem"], // 56px
        "headline-2": ["4rem", "6.25rem"], // 64px
        "headline-1": ["4.5rem", "7.25rem"], // 72px
      },
      fontWeight: {
        thin: 100,
        "extra-thin": 200,
        light: 300,
        Regular: 400,
        normal: 400,
        medium: 500,
        "semi-bold": 600,
        bold: 700,
        "extra-bold": 800,
        black: 900,
      },
      borderRadius: {
        inherit: "inherit",
        none: "0",
        xs: "0.25rem",
        sm: "0.5rem",
        DEFAULT: "1rem",
        md: "1.25rem",
        lg: "1.625rem",
        large: "2rem",
        full: "9999px",
      },
      borderRightColor: {
        transparent: "transparent",
      },
      borderLeftColor: {
        transparent: "transparent",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--gradient-color-stops))",
      },
    },
  },
  variants: {
    extend: {
      margin: ["first", "last"],
      padding: ["first", "last"],
      backgroundColor: ["hover", "focus"],
      height: ["hover"],
      borderColor: ["checked"],
      opacity: ["disabled", "hover"],
      ringWidth: ["hover"],
      borderRadius: ["first", "last"],
      borderWidth: ["first", "last"],
      display: ["last", "first"],
      fontWeight: ["last", "first"],
      transform: ["responsive", "direction"],
      rotate: ["responsive", "direction"],
    },
  },
  corePlugins: {
    container: false,
    // preflight: false
  },
  jit: true,
  plugins: [
    typeof require == "function" && require("daisyui"),
    typeof require == "function" && require("@tailwindcss/aspect-ratio"),
    typeof require == "function" && require("tailwindcss-rtl"),
    typeof require == "function" && require("tailwindcss-dir")(),
    typeof require == "function" &&
      function ({ addComponents }) {
        addComponents({
          ".container": {
            maxWidth: "100%",
            "margin-right": "auto",
            "margin-left": "auto",
            "@screen sm": {
              maxWidth: "680px", // more than sm
            },
            "@screen md": {
              maxWidth: "900px", // more than md
            },
            "@screen lg": {
              maxWidth: "1124px", // more than lg
            },
            "@screen xl": {
              maxWidth: "1280px",
            },
            "@screen 2xl": {
              maxWidth: "1536px",
            },
            "@screen 3xl": {
              maxWidth: "1920px",
            },
          },
        });
      },
  ],
  daisyui: {
    themes: ["emerald", "sunset", "dark", "light"],
  },
};
module.exports = configs;
