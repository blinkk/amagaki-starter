/** @jsx */
import '@github/details-dialog-element';

import {DeguImage} from '@blinkk/degu/lib/components/image';
import {DeguVideo} from '@blinkk/degu/lib/components/video';
import {DeguYouTubeInline} from '@blinkk/degu/lib/components/youtube-inline';
import {DeguYouTubeModal} from '@blinkk/degu/lib/components/youtube-modal';
import Hero from './partials/hero/hero';
import {h} from 'preact';
import {hydrate} from 'preact';

window.customElements.define('degu-image', DeguImage);
window.customElements.define('degu-video', DeguVideo);
window.customElements.define('degu-youtube-inline', DeguYouTubeInline);
window.customElements.define('degu-youtube-modal', DeguYouTubeModal);

class App {
  constructor() {
    // Insert global code here.
    // Module-specific code should be implemented using custom elements.
    DeguYouTubeModal.register(document.body);

    // TODO: Hydrate all elements automatically.
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
      const containerEl = heroEl.closest(
        'page-module-container'
      ) as HTMLElement;
      const pageModuleEl = heroEl.closest('page-module');
      const contextEl = pageModuleEl?.querySelector('page-module-context');
      const rehydrate = () => {
        console.log('hydrated', heroEl);
        const context = JSON.parse(contextEl?.textContent ?? '');
        hydrate(<Hero partial={context} />, containerEl);
      };
      rehydrate();
      const contextObserver = new MutationObserver(rehydrate);
      contextEl &&
        contextObserver.observe(contextEl, {
          characterData: true,
          characterDataOldValue: true,
          attributes: false,
          childList: false,
          subtree: true,
        });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
