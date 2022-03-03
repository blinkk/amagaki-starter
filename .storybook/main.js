const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/preact',
  staticDirs: [{
    from: '../dist',
    to: '/dist'
  }],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.sass$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: require.resolve('sass-loader'),
          options: {
						sourceMap: true,
            sassOptions: {
              includePaths: [
                path.join(__dirname, '../node_modules/'),
                path.join(__dirname, '../src/sass/'),
								path.join(__dirname, '../src/'),
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};
