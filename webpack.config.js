const glob = require('glob');

module.exports = {
  entry: ["./src/ts/main.ts"].concat(
    glob.sync("./src/sass/**/*.sass", { ignore: ["./src/sass/**/_*"] })
  ),
  module: {
    // Sass
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "css/",
              name: "[name].min.css",
            },
          },
          "sass-loader",
        ],
      },
      /* TODO: Fix me.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: './tsconfig.json',
        },
        include: ['./src/ts/'],
        exclude: /node_modules/,
      },
      */
    ],
  },
};
