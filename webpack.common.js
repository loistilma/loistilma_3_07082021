const webpack = require('webpack');
const glob = require('glob')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PurgecssPlugin = require('purgecss-webpack-plugin')
const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    contact: {
      import: './src/contact.js',
      dependOn: 'shared',
    },
    shared: {
      import: './src/shared.js',
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.ico$/i,
        type: 'asset/resource',
        generator: {
            filename: '[name][ext]'
        }
      },
      {
        test: /\.webp$/i,
        type: 'asset/resource',
        generator: {
            filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'fonts/[name][ext]'
        }
      },
      {
        test:/\.html$/,
        use: ['html-loader']
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin(),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index', 'shared'],
    }),
    new HtmlWebpackPlugin({
        inject: 'body',
        template: './src/contact.html',
        filename: 'contact.html',
        chunks: ['contact', 'shared'],
      })
  ],
};