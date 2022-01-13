import '@github/details-dialog-element';
import { DeguImage } from '@blinkk/degu/lib/components/image';
import { DeguVideo } from '@blinkk/degu/lib/components/video';
import { DeguYouTubeInline } from '@blinkk/degu/lib/components/youtube-inline';
import { DeguYouTubeModal } from '@blinkk/degu/lib/components/youtube-modal';
// @ts-ignore
import { listen as quickLinkListen } from 'quicklink';
window.customElements.define('degu-image', DeguImage);
window.customElements.define('degu-video', DeguVideo);
window.customElements.define('degu-youtube-inline', DeguYouTubeInline);
window.customElements.define('degu-youtube-modal', DeguYouTubeModal);
class App {
    constructor() {
        // Insert global code here.
        // Module-specific code should be implemented using custom elements.
        DeguYouTubeModal.register(document.body);
        quickLinkListen();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
//# sourceMappingURL=main.js.map