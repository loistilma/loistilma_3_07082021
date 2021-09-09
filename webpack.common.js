const webpack = require('webpack');
const glob = require('glob')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');
const path = require('path');

module.exports = {
  entry: {
    // index entry depend on shared entry
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    // contact entry depend on shared entry
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
    // Clean output folder before building
    clean: {     
      keep: /\.(webp|ico)$/i, // Do not clean this files.
    },
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
    // Extract imported CSS into each chunk (shared.js -> shared.css, index.js -> index.css, contact.js -> contact.css)
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),

    // Inject <link rel="preload"> into html
    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /.*\.(woff2)$/i,
          // Example: <link rel="preload" href="fonts/glyphicons-halflings-regular.woff2" as="font" type="font/woff2" crossorigin>
          attributes: {as: 'font', type: 'font/woff2', crossorigin: true },
        },
        {
          match: /.*\.(woff)$/i,
          attributes: {as: 'font', type: 'font/woff', crossorigin: true },
        },
        {
          match: /la-chouette-agence-banniere.webp$/,
          attributes: {as: 'image'},
        },
      ]
    }),

    // Import global "$" and "jQuery"
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
    }),

    // Inject index.html and head tags into template.html
    new HtmlWebpackPlugin({
      inject: 'body',
      description: '<meta name="description" content="La chouette agence, entreprise spécialisée dans le web design basée à Lyon, vous aidera dans la création de vos sites internet.">',
      title: 'Accueil | Entreprise web design à Lyon | La chouette agence',
      template: './src/template.html',
      filename: 'index.html',
      chunks: ['index', 'shared'],
      htmlpath: './src/pages',
    }),

    // Inject contact.html and head tags into template.html
    new HtmlWebpackPlugin({
      inject: 'body',
      description: '<meta name="description" content="Si vous avez une question ou que vous souhaitez collaborer avec notre agence. Venez-ici pour contacter notre équipe et nous parlez de votre projet.">',
      title: 'Contact | Agence web design Lyon | La chouette agence',
      template: './src/template.html',
      filename: 'contact.html',
      chunks: ['contact', 'shared'],
      htmlpath: './src/pages',
    }),

    // Remove unused CSS
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,  { nodir: true }),
    }),
  ],
};