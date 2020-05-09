const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "wip-junk", "index.ts"),
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.glsl$/,
        loader: "webpack-glsl-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".glsl"],
    alias: {
      glMatrix: path.resolve(__dirname, "gl-matrix", "src"),
    },
  },
  output: {
    filename: "junk.js",
    path: path.resolve(__dirname, "wip-junk"),
  },
};
