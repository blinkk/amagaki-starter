/** @jsx h */
import Asset from '../../components/Asset/Asset';
import Button from '../../components/Button/Button';
import { getClassName } from '../../utils/partials';
import { h } from 'preact';
function SimpleIntro({ partial }) {
    var _a, _b;
    return (h("div", { className: getClassName('simple-intro', partial.options) },
        h("div", { className: "simple-intro__grid" },
            h("div", { className: "simple-intro__grid__content" },
                partial.title && (h("div", { className: "simple-intro__grid__content__title", role: "heading", "aria-level": 2 }, partial.title)),
                partial.body && (h("div", { className: "simple-intro__grid__content__body" }, partial.body)),
                partial.buttons && (h("div", { className: "simple-intro__grid__content__buttons" }, (_a = partial.buttons) === null || _a === void 0 ? void 0 : _a.map(button => (h(Button, { ...button }))))),
                partial.images && (h("div", { className: "simple-intro__grid__content__images" }, (_b = partial.images) === null || _b === void 0 ? void 0 : _b.map(image => (h(Asset, { ...image })))))))));
}
export default SimpleIntro;
//# sourceMappingURL=SimpleIntro.js.map