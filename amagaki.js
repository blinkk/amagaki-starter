const placeholderPlugin = require('./plugins/placeholder');

module.exports = function (pod) {

  const nunjucksPlugin = pod.plugins.get('NunjucksPlugin');

  pod.configure({
    metadata: {
      name: 'Amagaki Starter',
    },
    localization: {
      defaultLocale: 'en',
      locales: ['en'],
    },
    staticRoutes: [
      {
        path: '/static/css/',
        staticDir: '/dist/css/',
      },
      {
        path: '/static/js/',
        staticDir: '/dist/js/',
      },
    ],
  });

  placeholderPlugin.register(pod, {
    sizes: ['16x9', '1x1', '9x16', '7x3'],
  });


  nunjucksPlugin.addGlobal('cb', () => {
    return Math.floor(Date.now() / 1000);
  });
};
