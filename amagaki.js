const placeholderPlugin = require('./plugins/placeholder');

module.exports = function (pod) {
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
        path: '/static/',
        staticDir: '/src/static/',
      },
      {
        path: '/static/css/',
        staticDir: '/dist/css/',
      },
    ],
  });

  placeholderPlugin.register(pod, {
    sizes: ['16x9', '1x1', '9x16', '7x3'],
  });
};
