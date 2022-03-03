import Asset from '../../components/Asset/Asset';
import Button from '../../components/Button/Button';
import { getClassName } from '../../utils/partials';
import { h } from 'preact';
function PromoBanner({ partial }) {
    var _a, _b;
    return (h("div", { className: getClassName('promo-banner', partial.options) },
        h("div", { className: "promo-banner__wrap" },
            partial.assets && (h("div", { className: "promo-banner__wrap__assets" }, (_a = partial.assets) === null || _a === void 0 ? void 0 : _a.map(asset => (h(Asset, { ...asset }))))),
            h("div", { className: "promo-banner__wrap__content" },
                partial.title && (h("div", { className: "promo-banner__wrap__content__title", role: "heading", "aria-level": 3 }, partial.title)),
                partial.body && (h("div", { className: "promo-banner__wrap__content__body" }, partial.body)), (_b = partial.buttons) === null || _b === void 0 ? void 0 :
                _b.map(button => (h("div", { className: "promo-banner__wrap__content__buttons" },
                    h(Button, { ...button }))))))));
}
export default PromoBanner;
//# sourceMappingURL=PromoBanner.js.map