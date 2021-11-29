/**
 * Plugins for using Degu elements.
 */

import {
  DataType,
  NunjucksTemplateEngine,
  Pod,
  StaticFile,
  TemplateContext,
  Url,
} from '@amagaki/amagaki';

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
      result += literals[i] + escape(substitution.toString());
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
    engine.env.addGlobal('asset', DeguPlugin.asset);
  }

  /**
   * Returns a `<degu-image>` or `<degu-video>` depending on the requested file.
   *
   * Usage:
   * ```
   * {{asset(options)}}
   * ```
   */
  static asset(
    this: any,
    options: {
      url: string | StaticFile;
      altText: string;
      width?: number;
      height?: number;
      class?: string;
    }
  ) {
    let url = options.url;
    if (DataType.isStaticFile(options.url)) {
      const staticFile = options.url as StaticFile;
      url = `${staticFile.url.path}?fingerprint=${staticFile.fingerprint}`;
    }
    url = Url.relative(url as string, this.ctx.doc);
    // TODO: When `degu-video` is available, check `url` extension and output
    // the appropriate element.
    return html`
      <degu-image
        src="${url}"
        alt="${options.altText ?? ''}"
        ${options.class ? html`class="${options.class}"` : ''}
        ${options.width ? html`width="${options.width}"` : ''}
        ${options.height ? html`height="${options.height}"` : ''}
      ></degu-image>
    `;
  }
}
