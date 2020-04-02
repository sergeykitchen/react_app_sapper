/* eslint-env node */
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin");

const optimization = isDev => {
  const config = {};

  if (!isDev) {
    config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserPlugin()];
  }
  return config;
};

// For production build, set this env var to the server public path.
const publicPath = process.env.APP_PUBLIC_PATH || "";

const mode = process.env.NODE_ENV || "production";
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  stats: "errors-warnings",
  mode: mode,
  context: path.resolve(__dirname, "src"),
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    //  https: true,
    historyApiFallback: true
  },

  optimization: optimization(isDev),
  devtool: isDev ? "source-map" : "",
  resolve: {
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx/],
        include: path.resolve(__dirname, "src"),
        use: ["babel-loader"]
      },
      {
        // For production, we output a separately cachable stylesheet.
        test: /\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          "postcss-loader"
        ]
      },
      {
        // For production, we output a separately cachable stylesheet.
        test: /\.scss$/,
        use: [
          // Uses style-loader in development to enable hot style replacement (HMR).
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          // Remove or comment out the `modules` property (or set it to `false`) to disable css-modules.
          {
            loader: "css-loader"
          },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: [/\.jpg$/, /\.png/],
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash:8].[ext]"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {}
    }),
    new MiniCssExtractPlugin(),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: "./index.html",
      minify: {
        collapseWhitespace: !isDev
      }
    })
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, "src", "assets", "product-images"),
    //     to: path.resolve(__dirname, "dist", "assets")
    //   }
    //   //   { from: path.resolve(__dirname, "favicons"), to: "favicons" }
    // ])
  ]
};
