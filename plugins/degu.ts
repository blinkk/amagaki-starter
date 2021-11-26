/**
 * Plugins for using Degu elements.
 */

import {NunjucksTemplateEngine, Pod} from '@amagaki/amagaki';

import {SafeString} from 'nunjucks/src/runtime';
import {escape} from 'nunjucks/src/lib';

/** Template tag function for escaping values for use with Nunjucks templates. */
const html = (literals: TemplateStringsArray, ...substitutions: unknown[]) => {
  let result = '';
  for (const [i, substitution] of substitutions.entries()) {
    // Avoid double-escaping when using ternary or nested expressions.
    if (substitution instanceof SafeString) {
      result += literals[i] + substitution;
    } else {
      result += literals[i] + escape(substitution);
    }
  }
  result += literals[literals.length - 1];
  return new SafeString(result.trim());
};

export class DeguPlugin {
  static register(pod: Pod) {
    const engine = pod.engines.getEngineByExtension(
      '.njk'
    ) as NunjucksTemplateEngine;
    engine.env.addGlobal('degu', {
      asset: DeguPlugin.asset,
    });
  }

  /** Returns a `<degu-image>` or `<degu-video>` depending requested file. */
  static asset(options: {
    url: string;
    altText: string;
    width?: number;
    height?: number;
    class?: string;
  }) {
    // TODO: When `degu-video` is available, check `url` extension and output
    // the appropriate element.
    return html`
      <degu-image
        src="${options.url}"
        alt="${options.altText ?? ''}"
        ${options.class ? html`class="${options.class}"` : ''}
        ${options.width ? html`width="${options.width}"` : ''}
        ${options.height ? html`height="${options.height}"` : ''}
      ></degu-image>
    `;
  }
}
