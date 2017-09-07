const path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    main: "./scripts/index.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "transform-loader?brfs"
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
