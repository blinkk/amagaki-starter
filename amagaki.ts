import {Document, NunjucksPlugin, Pod, StaticFile, Url} from '@amagaki/amagaki';

import {DeguPlugin} from './plugins/degu';
import {PageBuilder} from '@amagaki/amagaki-plugin-page-builder';
import {PlaceholderPlugin} from './plugins/placeholder';

export default (pod: Pod) => {
  DeguPlugin.register(pod);
  PageBuilder.register(pod, {
    head: {
      siteName: 'Starter',
      scripts: [pod.staticFile('/dist/js/main.min.js')],
      stylesheets: [
        'https://fonts.googleapis.com/css?family=Open+Sans:400,500,600,700|Roboto:400,500,600,700|Material+Icons&amp;display=swap',
        pod.staticFile('/dist/css/main.css'),
      ],
    },
  });

  pod.configure({
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
    environments: {
      prod: {},
    },
  });

  if (pod.env.name !== 'prod') {
    PlaceholderPlugin.register(pod, {
      sizes: ['16x9', '1x1', '9x16', '7x3'],
    });
  }

  const nunjucksPlugin = pod.plugins.get('NunjucksPlugin') as NunjucksPlugin;
  type Urlable = StaticFile | Document | string;
  nunjucksPlugin.addFilter('url', function (object: Urlable) {
    if (object instanceof StaticFile) {
      return `${Url.relative(object.url.path, this.ctx.doc)}?fingerprint=${
        object.fingerprint
      }`;
    } else if (object instanceof Document) {
      return `${Url.relative(object.url.path, this.ctx.doc)}`;
    }
    return `${Url.relative(object, this.ctx.doc)}`;
  });
};
