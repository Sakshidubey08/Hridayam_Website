
import daisyui from "daisyui";
// tailwind.config.js
export const content = [
  "./src/**/*.{html,js,jsx}",
];
export const theme = {
  extend: {},
};
export const plugins = [
  daisyui,
  function({ addUtilities }) {
    addUtilities({
      '.scrollbar-none': {
        '-ms-overflow-style': 'none',  /* Internet Explorer 10+ */
        'scrollbar-width': 'none',     /* Firefox */
        '&::-webkit-scrollbar': {
          display: 'none'              /* Safari and Chrome */
        }
      }
    })
  }
];

