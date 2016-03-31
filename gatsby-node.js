var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.modifyWebpackConfig = function modifyWebpackConfig(config, env) {
  config.merge({ devtool: 'inline-source-map' });
  if (env === 'static') {
    config.removeLoader('css');
    config.loader('css', function(cfg) {
      cfg.test = /\.css$/;
      cfg.loader = ExtractTextPlugin.extract('css?minimize');
      return cfg
    });
    config.plugin(
      'extract-css',
      ExtractTextPlugin,
      [ 'styles.css' , { allChunks: true } ]
    );
  }
  return config;
}
