/*
    WEBPACK CONFIGURATION VARIABLES
*/

//- -------------------------------------------------------

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
  entry: [__dirname + "/../entry.js"],
  // devtool: "source-map" make all your loaders be allowed to create a map during compile
  // good for debugging
  devtool: "source-map",
  output: {
    // where to put the bundle.js , but to use webpack-dev-server properly
    // use the path to public and just change the filename: to /path/bundle.js
    path: __dirname + "/../public/",
    /* 
    used by plugins , mainly for production.
    publicPath: "http://mysite.com/"
    for eg. in your css you have url(./img.jpg) => url(http://mysite.com)
    publicPath: "/",
    */

    filename: "assets/js/bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  module: {
    rules: [
      {
        /*
          Take note ONLY 1 test for file.
        */
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "resolve-url-loader",
            options: {
              debug: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!resolve-url-loader"
      },
      {
        test: /\.(png|jpg|gif|eot|woff2|svg|ttf|woff)$/,
        loader: "url-loader",
        options: {
          limit: 2000,
          outputPath: "assets/img/", // Where to put any resource file
          publicPath: "../img/", // This will change the URL for the CSS. As the URL in css is relative to the CSS file itself not the document.
          fallback: "file-loader" // Will encode any files lower than 2KB = 2000 otherwise use FILE-LOADER which should be installed as well and will pass the same OPTIONS to the fallback.
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/style.css"
    })
  ]
};
