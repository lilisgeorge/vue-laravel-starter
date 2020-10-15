/* eslint-disable global-require */
module.exports = {
  devServer: {
    proxy: process.env.VUE_APP_API_URL,
  },
  outputDir: '../api/public',
  assetsDir: 'app',
  indexPath: '../resources/views/app.blade.php',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-import'),
          require('tailwindcss'),
        ],
      },
    },
  },
};
