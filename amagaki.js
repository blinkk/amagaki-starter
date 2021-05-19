const path = require('path');
const placeholderPlugin = require('./plugins/placeholder');
const {StaticFile} = require('@amagaki/amagaki/src/static');
const {Document} = require('@amagaki/amagaki/src/document');

function toRelativeUrl(value, ctx) {
  if (
    !value ||
    typeof value !== 'string' ||
    value.startsWith('http') ||
    !ctx.doc
  ) {
    return value;
  }
  const result = path.relative(ctx.doc.url.path, value);
  if (!result || result === '/') {
    return './';
  }
  return value.endsWith('/') ? `./${result}/` : `./${result}`;
}

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
      {
        path: '/static/js/',
        staticDir: '/dist/js/',
      },
    ],
  });

  placeholderPlugin.register(pod, {
    sizes: ['16x9', '1x1', '9x16', '7x3'],
  });

  const nunjucksPlugin = pod.plugins.get('NunjucksPlugin');
  nunjucksPlugin.addFilter('url', function (object) {
    if (object instanceof StaticFile) {
      return `${toRelativeUrl(object.url.path, this.ctx)}?fingerprint=${
        object.fingerprint
      }`;
    } else if (object instanceof Document) {
      return `${toRelativeUrl(object.url.path, this.ctx)}`;
    }
    return `${toRelativeUrl(object, this.ctx)}`;
  });
};
