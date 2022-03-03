/** @jsx h */
import { h } from 'preact';
function getUrl(item, context) {
    var _a;
    // TODO: Support relative URLs.
    if ((_a = item === null || item === void 0 ? void 0 : item.url) === null || _a === void 0 ? void 0 : _a.path) {
        return item.url.path;
    }
    return item;
}
function Asset({ url, altText, width, height, className, context, }) {
    return (h("degu-image", { src: getUrl(url, context), alt: altText, width: width, height: height, className: className }));
}
export default Asset;
//# sourceMappingURL=Asset.js.map