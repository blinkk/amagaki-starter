/**
 * Plugins for using Degu elements.
 */

import {NunjucksTemplateEngine, Pod} from '@amagaki/amagaki';

import {SafeString} from 'nunjucks/src/runtime';

export class DeguPlugin {
  pod: Pod;
  engine: NunjucksTemplateEngine;

  constructor(pod: Pod) {
    this.pod = pod;
    this.engine = pod.engines.getEngineByExtension(
      '.njk'
    ) as NunjucksTemplateEngine;
  }

  static register(pod: Pod) {
    const plugin = new DeguPlugin(pod);
    plugin.engine.env.addGlobal('degu', {
      asset: (options => plugin.asset(options)) as any,
    });
  }

  /** Returns a safe string that can be used within a page. */
  markup(html: string, context: Record<string, any>): SafeString {
    return new SafeString(
      this.engine.env.renderString(html.trim(), {options: context})
    );
  }

  /** Returns a `<degu-image>` or `<degu-video>` depending on the . */
  asset(options: {
    url: string;
    altText: string;
    width?: number;
    height?: number;
    class?: string;
  }) {
    // TODO: When `degu-video` is available, check `url` extension and output
    // the appropriate element.
    return this.markup(
      `
        <degu-image
          src="{{options.url}}"
          alt="{{options.altText|default('')}}"
          {% if options.class %}
            class="{{options.class}}"
          {% endif %}
          {% if options.width %}
            width="{{options.width}}"
          {% endif %}
          {% if options.height %}
            height="{{options.height}}"
          {% endif %}
        ></degu-image>
      `,
      options
    );
  }
}
