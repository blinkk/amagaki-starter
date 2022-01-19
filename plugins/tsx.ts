import {PluginComponent, Pod, TemplateEngineComponent} from '@amagaki/amagaki';

import {addHook} from 'sucrase/dist/register';
import {h} from 'preact';
import render from 'preact-render-to-string';

export class TsxPlugin implements PluginComponent {
  config: Record<string, any>;
  pod: Pod;

  constructor(pod: Pod, config: Record<string, any>) {
    this.pod = pod;
    this.config = config;
    this.pod.engines.associate('.tsx', TsxTemplateEngine);
  }

  static register(pod: Pod, config: any) {
    addHook('.tsx', {
      transforms: ['typescript', 'jsx', 'imports'],
      jsxPragma: 'h',
      jsxFragmentPragma: 'Fragment',
    });
    pod.plugins.register(TsxPlugin, config);
  }
}

class TsxTemplateEngine implements TemplateEngineComponent {
  pod: Pod;

  constructor(pod: Pod) {
    this.pod = pod;
  }

  async render(path: string, context: any): Promise<string> {
    const modulePath = this.pod.getAbsoluteFilePath(path);
    if (this.pod.env.dev) {
      delete require.cache[require.resolve(modulePath)];
    }
    const renderer = require(modulePath);
    let vDom;
    if (typeof renderer?.default === 'function') {
      vDom = renderer.default(context);
    } else {
      vDom = renderer(context);
    }
    return render(vDom);
  }

  async renderFromString(template: string, context: any): Promise<string> {
    return '';
  }
}
