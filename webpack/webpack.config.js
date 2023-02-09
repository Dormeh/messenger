const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        test: /\.(sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
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
  ]
};
