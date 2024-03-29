const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const styleLoaderSelect = require('./loaders/style-loader-select');

const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.config();

module.exports = {
  target: 'web',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle-[fullhash].js',
    publicPath: '/'
  },
  resolve: {

    alias: {
      core: path.resolve(__dirname, '../src/core/'),
      data: path.resolve(__dirname, '../src/data/'),
      handlebars: 'handlebars/dist/handlebars.js'

    },
    extensions: ['.ts', '.tsx', '.js', '.json'],

  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, '../tsconfig.json'),
              transpileOnly: true
            },
          },
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.s[ac]ss$/i,
        use: styleLoaderSelect
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader?name=asserts/images/[name].[ext]',
          },
        ],
      },

    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[fullhash].css',
    })
  ]
};
