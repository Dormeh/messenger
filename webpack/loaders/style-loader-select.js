const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV === 'development';

const styleLoader = {
  loader: 'style-loader'
};

const MiniCssExtractPluginLoader = {
  loader: MiniCssExtractPlugin.loader
};

module.exports = [
  devMode ? { ...styleLoader } : { ...MiniCssExtractPluginLoader },
    'css-loader',
    'sass-loader'
  ]
