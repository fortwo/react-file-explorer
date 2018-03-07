import path from 'path';
import webpack from 'webpack';

// Plugins
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const options = {
  entry: {
    'react-file-explorer': './src/FileExplorer.js',
    'react-file-explorer.min': './src/FileExplorer.js',
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js',
    publicPath: '/',
    library: 'ReactFileExplorer',
    libraryTarget: 'umd',
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
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
    }),
  ],
};

module.exports = options;
