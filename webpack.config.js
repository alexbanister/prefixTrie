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
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
