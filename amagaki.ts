import {
  Document,
  NunjucksTemplateEngine,
  Pod,
  StaticFile,
  Url,
} from '@amagaki/amagaki';

import {DeguPlugin} from './plugins/degu';
import {PageBuilder} from '@amagaki/amagaki-plugin-page-builder';
import {PlaceholderPlugin} from './plugins/placeholder';
import {PreactEnginePlugin} from '@amagaki/amagaki-engine-preact';

export default (pod: Pod) => {
  PreactEnginePlugin.register(pod);
  DeguPlugin.register(pod);
  PageBuilder.register(pod, {
    inspector: {
      enabled: true,
    },
    beautifyContainer: false,
    head: {
      siteName: 'Starter',
      scripts: [pod.staticFile('/dist/js/main.min.js')],
      icon: pod.staticFile('/src/static/images/amagaki.png'),
      stylesheets: [
        'https://fonts.googleapis.com/css?family=Manrope:400,500,600,700|Material+Icons&amp;display=swap',
        pod.staticFile('/dist/css/main.css'),
      ],
    },
    partialPaths: {
      css: ['/dist/css/${partial.partial}/${partial.partial}.css'],
      js: ['/dist/js/partials/${partial.partial}/${partial.partial}.js'],
      view: ['/src/partials/${partial.partial}/${partial.partial}.tsx'],
    },
  });

  pod.configure({
    localization: {
      defaultLocale: 'en',
      locales: ['en'],
    },
    staticRoutes: [
      {
        path: '/static/images/',
        staticDir: '/src/static/images/',
      },
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
      sizes: ['16x9', '1x1', '4x3', '9x16', '7x3', '8x4'],
    });
  }

  const engine = pod.engines.getEngineByExtension(
    '.njk'
  ) as NunjucksTemplateEngine;

  engine.env.addFilter('languageDisplayName', lang => {
    const languageNames = new Intl.DisplayNames(lang, {type: 'language'});
    return languageNames.of(lang);
  });

  engine.env.addFilter(
    'url',
    function (object: StaticFile | Document | string) {
      if (object instanceof StaticFile) {
        return `${Url.relative(object.url.path, this.ctx.doc)}?fingerprint=${
          object.fingerprint
        }`;
      } else if (object instanceof Document) {
        return `${Url.relative(object.url.path, this.ctx.doc)}`;
      }
      return `${Url.relative(object, this.ctx.doc)}`;
    }
  );
};
