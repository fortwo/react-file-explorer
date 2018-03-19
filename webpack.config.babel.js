import path from 'path';
import webpack from 'webpack';

// Plugins
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const options = {
  //entry: CSS ? './demo/with-css/index.js' : './demo/with-styled-components/index.js',
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'bundle.js',
    publicPath: '/demo/',
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
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'image-webpack-loader',
        query: {
          optipng: {
            optimizationLevel: 7,
          },
        },
      },
    ]
  },
  devServer: {
    //contentBase: path.join(__dirname, 'demo/with-styled-components/'),
    publicPath: '/demo/',
    port: 3001,
    hot: true,
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};

module.exports = options;
