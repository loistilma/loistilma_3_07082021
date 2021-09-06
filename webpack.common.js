const webpack = require('webpack');
const glob = require('glob')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');
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
    filename: 'scripts/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
            filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'fonts/[name][ext]'
        }
      },
    ],
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
    new HtmlWebpackInjectPreload({
      files: [
        {
          //match: /^(?!.*fontawesome-webfont).*\.(woff|woff2)$/i,
          match: /.*\.(woff2)$/i,
          attributes: {as: 'font', type: 'font/woff2', crossorigin: true },
        },
        {
          //match: /^(?!.*fontawesome-webfont).*\.(woff|woff2)$/i,
          match: /.*\.(woff)$/i,
          attributes: {as: 'font', type: 'font/woff', crossorigin: true },
        },
        {
          match: /la-chouette-agence-banniere.webp$/,
          attributes: {as: 'image'},
        },
      ]
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      description: '<meta name="description" content="La chouette agence, entreprise spécialisée dans le web design basée à Lyon, vous aidera dans la création de vos sites internet.">',
      title: 'Accueil | Entreprise web design à Lyon | La chouette agence',
      template: './src/template.html',
      filename: 'index.html',
      chunks: ['index', 'shared'],
      minify: true, 
      htmlpath: './src/pages',
    }),
    new HtmlWebpackPlugin({
        inject: 'body',
        description: '<meta name="description" content="Si vous avez une question ou que vous souhaitez collaborer avec notre agence. Venez-ici pour contacter notre équipe et nous parlez de votre projet.">',
        title: 'Contact | Agence web design Lyon | La chouette agence',
        template: './src/template.html',
        filename: 'contact.html',
        chunks: ['contact', 'shared'],
        minify: true,
        htmlpath: './src/pages',
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,  { nodir: true }),
    }),
  ],
};