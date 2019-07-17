const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const devMode = process.env.NODE_ENV !== 'production';
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  output:{
    path: path.join(__dirname,'/dist'),
    publicPath: '/',
    filename:'[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: devMode ? {} : {
              modules: true,
              modules: {
                localIdentName: '[sha1:hash:hex:4]'
              },
              importLoaders: 1,
            }
          }
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
           MiniCssExtractPlugin.loader,
           {
            loader: "css-loader",
            options: {
              modules: {
                ...(devMode && { localIdentName: '[name]__[local]___[hash:base64:5]' })
              },
              importLoaders: 1,
            }
          },
           'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff2?|otf)$/,
        use: 'file-loader'
      },
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    // new BundleAnalyzerPlugin(),
    new Dotenv({ systemvars: true }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      cache: true,
      parallel: true,
      terserOptions: {
        compress: {
          drop_console: true,
        }
      }
    })],
  },
  devServer: {
    historyApiFallback: true,
  }
};
