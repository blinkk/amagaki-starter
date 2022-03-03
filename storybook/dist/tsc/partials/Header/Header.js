/** @jsx h */
import Asset from '../../components/Asset/Asset';
import Button from '../../components/Button/Button';
import { getClassName } from '../../utils/partials';
import { h } from 'preact';
function Header({ partial, doc }) {
    var _a, _b, _c, _d, _e, _f, _g;
    return (h("div", { className: getClassName('header', partial.options) },
        h("div", { className: "header__grid" },
            h("div", { className: "header__grid__logo" },
                h("a", { href: (_c = (_b = (_a = partial.logo) === null || _a === void 0 ? void 0 : _a.doc) === null || _b === void 0 ? void 0 : _b.url) === null || _c === void 0 ? void 0 : _c.path },
                    h(Asset, { ...(_d = partial.logo) === null || _d === void 0 ? void 0 : _d.image }))),
            h("div", { className: "header__grid__links" }, partial.nav.map(item => {
                var _a, _b, _c;
                return (h("a", { href: (_a = item.url) === null || _a === void 0 ? void 0 : _a.path, className: `header__grid__links__link ${((_b = item.url) === null || _b === void 0 ? void 0 : _b.path) === ((_c = doc.url) === null || _c === void 0 ? void 0 : _c.path) &&
                        'header__grid__links__link--active'}` }, item.fields.navTitle));
            })),
            h("div", { className: "header__grid__buttons" },
                h("div", { className: "header__grid__buttons__desktop-buttons" }, (_e = partial.buttons) === null || _e === void 0 ? void 0 : _e.map(button => (h(Button, { ...button })))),
                h("details", { className: "header__mobile-nav" },
                    h("summary", { className: "header__mobile-nav__summary" },
                        h(Button, { label: "Menu", ariaLabel: "Toggle menu" })),
                    h("details-dialog", { className: "header__mobile-nav__dialog" },
                        h("div", { className: "header__mobile-nav__dialog__links" }, (_f = partial.nav) === null || _f === void 0 ? void 0 : _f.map(item => {
                            var _a;
                            return (h("a", { href: (_a = item.url) === null || _a === void 0 ? void 0 : _a.path, className: "header__mobile-nav__dialog__links__link" }, item.fields.navTitle));
                        })),
                        h("div", { className: "header__mobile-nav__buttons" }, (_g = partial.buttons) === null || _g === void 0 ? void 0 : _g.map(button => (h(Button, { ...button }))))))))));
}
export default Header;
//# sourceMappingURL=Header.js.map