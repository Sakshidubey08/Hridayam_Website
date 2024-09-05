module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 0,
      features: {
        'oklch-function': false,  // Disable oklch function
      },
    }),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
