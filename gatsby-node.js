exports.modifyWebpackConfig = function modifyWebpackConfig(config, env) {
  if (process.env.NODE_ENV !== 'production') {
    config.merge({ devtool: 'inline-source-map' });
  }
  return config;
}
