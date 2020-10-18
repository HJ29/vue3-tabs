const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../docs'),
  publicPath: '/vue3-tabs/',
  configureWebpack: {
    resolve: {
      symlinks: false,
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('vue$', path.join(__dirname, 'node_modules/vue'));
  },
};