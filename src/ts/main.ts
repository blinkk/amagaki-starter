import {DeguImage} from '@blinkk/degu/lib/lit/image';
import {DeguVideo} from '@blinkk/degu/lib/lit/video';

window.customElements.define('degu-image', DeguImage);
window.customElements.define('degu-video', DeguVideo);

class App {
  constructor() {
    // Insert global code here.
    // Module-specific code should be implemented using custom elements.
  }
}

new App();
