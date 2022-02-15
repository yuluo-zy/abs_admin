/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const {
  override,
  addWebpackModuleRule,
  addWebpackPlugin,
  addWebpackAlias,
  overrideDevServer
} = require('customize-cra');
const ArcoWebpackPlugin = require('@arco-design/webpack-plugin');
const addLessLoader = require('customize-cra-less-loader');

const addProxy = () => (configFunction) => {
  configFunction.proxy = {
    '/api/': {
      target: 'http://192.168.8.85:30102',
      changeOrigin: true,
      pathRewrite: { '^/api': '/' }
    }
  };

  return configFunction;
};
module.exports = {
  webpack: override(
    addLessLoader(),
    addWebpackModuleRule({
      test: /\.svg$/,
      loader: '@svgr/webpack'
    }),
    addWebpackPlugin(new ArcoWebpackPlugin()),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    })
  ),
  devServer: overrideDevServer(
    addProxy()
  )
};
