import path from 'path';
import webpack from 'webpack';

// Plugins
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const options = {
  entry: './example/index.js',
  output: {
    path: path.join(__dirname, 'example'),
    filename: 'bundle.js',
    publicPath: '/example/',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'example'),
    publicPath: '/example/',
    port: 3000,
    hot: true,
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      title: 'React File Explorer',
      template: './index.html',
    }),
  ],
};

module.exports = options;
