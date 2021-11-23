import * as dom from '@blinkk/degu/lib/dom/dom';
import * as is from '@blinkk/degu/lib/is/is';
console.log('Add JS here');
class App {
    test() {
        if (is.mobile()) {
            dom.event(document.documentElement, 'test', {});
        }
    }
}
const app = new App();
app.test();
//# sourceMappingURL=main.js.map