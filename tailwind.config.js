/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  // theme: {
  //   extend: {},
  // },
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      {
        night: {
          ...require('daisyui/src/theming/themes')['night'],
          // primary: '#F471B5',
          primary: '#05B6D3',
          neutral: '#153B50',
          "base-100": '#111'
        }
      },
    ],
  },


  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
  ],
}

