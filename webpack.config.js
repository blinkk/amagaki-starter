const glob = require('glob');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

module.exports = env => {
  return {
    entry: ['./src/ts/main.ts'].concat(
      glob.sync('./src/sass/**/*.sass', { ignore: ['./src/sass/**/_*'] })
    ),
    plugins: env.notify ? [new WebpackNotifierPlugin()] : [],
    mode: 'development',
    resolve: {
      extensions: ['.ts'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    module: {
      // Sass
      rules: [
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: path.resolve(__dirname, '/css/'),
                name: '[name].min.css',
              },
            },
            'sass-loader',
          ],
        },

        {
          test: /\.ts|\.tsx$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].min.js',
    },

  };
};
