const placeholder = require('./plugins/placeholder');
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
        path: '/static/css/',
        staticDir: '/dist/css/',
      },
    ],
  });
  placeholderPlugin.register(pod);
};
