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

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
};
