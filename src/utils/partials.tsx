/** @jsx */
import {ComponentType, h} from 'preact';
import {render} from 'preact';

type PartialOptions = string[];

export function getClassName(base: string, options?: PartialOptions) {
  if (!options) {
    return base;
  }
  return `${base} ${options.map(option => `${base}--${option}`).join(' ')}`;
}

type PartialComponentType = ComponentType<{partial: Record<string, any>}>;

export interface PartialHydratorOptions {
  components: Record<string, PartialComponentType>;
}

export class PartialHydrator {
  components: Record<string, PartialComponentType>;

  constructor(options: PartialHydratorOptions) {
    this.components = options.components;
  }

  static register(options: PartialHydratorOptions) {
    const manager = new PartialHydrator(options);
    document.addEventListener('DOMContentLoaded', () => {
      manager.hydratePartials();
    });
    return manager;
  }

  hydratePartialFromContext(
    name: string,
    contextEl: HTMLElement,
    containerEl: HTMLElement
  ) {
    try {
      const getContext = () => JSON.parse(contextEl?.textContent ?? '');
      const Element = this.components[name];
      if (Element) {
        render(<Element partial={getContext()} />, containerEl);
      }
    } catch (err) {
      console.error(`Error initializing partial: ${name}`);
      throw err;
    }
  }

  watchAndRehydrate(
    name: string,
    contextEl: HTMLElement,
    containerEl: HTMLElement
  ) {
    const contextObserver = new MutationObserver(() => {
      this.hydratePartialFromContext(name, contextEl, containerEl);
    });
    contextObserver.observe(contextEl, {
      characterData: true,
      characterDataOldValue: true,
      attributes: false,
      childList: false,
      subtree: true,
    });
  }

  hydratePartials() {
    const els = Array.from(
      document.querySelectorAll('page-module')
    ) as HTMLElement[];
    for (const el of els) {
      const contextEl = el.querySelector('page-module-context') as HTMLElement;
      const containerEl = el.querySelector(
        'page-module-container'
      ) as HTMLElement;
      const partialName = el?.getAttribute('partial') as string;
      contextEl &&
        this.hydratePartialFromContext(partialName, contextEl, containerEl);
      contextEl && this.watchAndRehydrate(partialName, contextEl, containerEl);
    }
  }
}
