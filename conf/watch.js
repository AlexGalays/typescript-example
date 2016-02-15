var webpack = require('webpack');

module.exports = {
  entry: './src/main.tsx',

  output: {
    filename: 'main.js',
    path: './public/'
  },

  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts', exclude: /node_modules/ },
      { test: /gsap/, loader: 'imports?define=>false' }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.ts', '.tsx']
  },

  devtool: 'inline-source-map'
};
