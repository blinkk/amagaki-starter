/**
 * Plugins for using Degu elements.
 */

import {NunjucksTemplateEngine, Pod} from '@amagaki/amagaki';

import nunjucks from 'nunjucks';

export class DeguPlugin {
  static register(pod: Pod) {
    const nunjucksEngine = pod.engines.getEngineByExtension(
      '.njk'
    ) as NunjucksTemplateEngine;
    nunjucksEngine.env.addGlobal('degu', {
      asset: DeguPlugin.asset,
    });
  }

  static asset(options: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    class?: string;
  }) {
    // TODO: When `degu-video` is available, check `url` extension and output
    // the appropriate element.
    return nunjucks.runtime.markSafe(
      `
        <degu-image
          src="${options.url}"
          alt="${options.alt ?? ''}"
          ${options.class ? `class="${options.class}"` : ''}
          ${options.width ? `width="${options.width}"` : ''}
          ${options.height ? `height="${options.height}"` : ''}
        ></degu-image>
      `.trim()
    );
  }
}
