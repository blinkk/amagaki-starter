// const yaml = require('js-yaml');

module.exports = function (pod) {
  pod.configure({
    metadata: {
      name: 'Amagaki Example',
    },
    localization: {
      defaultLocale: 'en',
      locales: ['en'],
    },
    staticRoutes: [
      {
        path: '/static/',
        staticDir: '/src/static/',
      },
      {
        path: '/static/css/',
        staticDir: '/dist/css/',
      },
    ],
  });
  // Shortcut method for adding custom nunjucks filter and global.
  const nunjucksPlugin = pod.plugins.get('NunjucksPlugin');
  nunjucksPlugin.addFilter('testShortcutFilter', value => `${value}--SHORTCUT`);
  nunjucksPlugin.addGlobal('copyrightYear', () => new Date().getFullYear());
};