const webpack = require("webpack");

module.exports = {
  entry: [__dirname + "/../entry.js"],
  // devtool makes your chrome show where the error is aside from pointing the error in your bundle file
  devtool: "inline-source-map",
  // tells where your webpack-dev-server where to watch for changes
  devServer: {
    contentBase: __dirname + "/../public/"
  },
  output: {
    // where to put the bundle.js , but to use webpack-dev-server properly
    // use the path to public and just change the filename: to /path/bundle.js
    path: __dirname + "/../public/",
    /* 
    used by plugins , mainly for production.
    publicPath: "http://mysite.com/"
    for eg. in your css you have url(./img.jpg) => url(http://mysite.com)
    */
    publicPath: "/",
    filename: "assets/js/bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader:
          "style-loader!css-loader!resolve-url-loader!postcss-loader!sass-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!resolve-url-loader"
      },
      {
        test: /\.(png|jpg|gif|eot|woff2|svg|ttf|woff)$/,
        loader: "url-loader",
        options: {
          limit: 5000,
          name: "img-[hash:6].[ext]",
          outputPath: "../public/assets/img/",
          publicPath: "assets/img/"
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          // where to put the files
          outputPath: "../public/assets/img/",
          // will change the url used by fileloader
          publicPath: "assets/img/"
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["react", "env"],
          plugins: []
        }
      }
    ]
  },
  plugins: [require("autoprefixer")]
};