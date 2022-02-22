/** @jsx */
import '@github/details-dialog-element';

import {DeguImage} from '@blinkk/degu/lib/components/image';
import {DeguVideo} from '@blinkk/degu/lib/components/video';
import {DeguYouTubeInline} from '@blinkk/degu/lib/components/youtube-inline';
import {DeguYouTubeModal} from '@blinkk/degu/lib/components/youtube-modal';
import {PartialHydrator} from '@amagaki/amagaki-engine-preact/dist/hydrator';
import Hero from './partials/Hero/Hero';

window.customElements.define('degu-image', DeguImage);
window.customElements.define('degu-video', DeguVideo);
window.customElements.define('degu-youtube-inline', DeguYouTubeInline);
window.customElements.define('degu-youtube-modal', DeguYouTubeModal);

// Modules that require hydration must be registered here.
PartialHydrator.register({
  components: [Hero],
});

class App {
  constructor() {
    DeguYouTubeModal.register(document.body);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
