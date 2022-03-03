/** @jsx h */
import Asset from '../../components/Asset/Asset';
import Button from '../../components/Button/Button';
import { getClassName } from '../../utils/partials';
import { h } from 'preact';
function activateLasers() {
    console.log('it worked!');
}
function Hero({ partial, }) {
    return (h("div", { className: getClassName('hero', partial.options) },
        h("div", { className: "hero__grid" },
            h("div", { className: "hero__grid__content" },
                h("div", { className: "hero__grid__content__title", "aria-level": 1, role: "heading" }, partial.title),
                h("div", { className: "hero__grid__content__body" }, partial.body),
                h("div", { className: "hero__grid__content__body" },
                    h("br", null),
                    h(Button, { onClick: activateLasers, label: "Activate lasers" })),
                partial.buttons && (h("div", { className: "hero__grid__content__buttons" }, partial.buttons.map((button, i) => (h("div", { key: i, className: "hero__grid__content__buttons__button" },
                    h(Button, { ...button })))))),
                partial.assets && (h("div", { className: "hero__grid__content__assets" }, partial.assets.map(asset => (h(Asset, { ...asset })))))))));
}
export default Hero;
//# sourceMappingURL=Hero.js.map