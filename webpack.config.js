import path from "node:path";
import { fileURLToPath } from "node:url";
import PugPlugin from "pug-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";

/** @type {import("webpack").Configuration} */
const config = {
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  devServer: {
    port: "8000",
    open: true,
  },

  devtool: "source-map",

  plugins: [
    new PugPlugin({
      entry: {
        index: path.resolve(__dirname, "src", "index.pug"),
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ],
  },
};

export default () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
