/**
 * Plugins for using Degu elements.
 */

import {NunjucksTemplateEngine, Pod} from '@amagaki/amagaki';

import {SafeString} from 'nunjucks/src/runtime';
import {escape} from 'nunjucks/src/lib';

/** Template tag function for escaping values used with Nunjucks templates. */
const html = (literals: TemplateStringsArray, ...substitutions: unknown[]) => {
  const result = [];
  for (const [i, value] of substitutions.entries()) {
    result.push(literals[i]);
    // Avoid double-escaping when using ternary or nested expressions.
    result.push(value instanceof SafeString ? value : escape(value));
  }
  result.push(literals[literals.length - 1]);
  return new SafeString(result.join('').trim());
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

  /**
   * Returns a `<degu-image>` or `<degu-video>` depending on the requested file.
   *
   * Usage:
   * ```
   * {{degu.asset(options)}}
   * ```
   */
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
