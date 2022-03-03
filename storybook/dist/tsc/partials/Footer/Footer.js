import { getClassName } from '../../utils/partials';
import { h } from 'preact';
function Footer({ partial, doc, pod, }) {
    var _a;
    return (h("div", { className: getClassName('footer', partial.options) },
        h("div", { className: "footer__grid" },
            h("div", { className: "footer__grid__links" }, (_a = partial.nav) === null || _a === void 0 ? void 0 : _a.map(item => (h("a", { href: "{item.url.path}", className: "header__grid__links__link" }, item.fields.navTitle)))),
            h("div", { className: "footer__grid__aside" }, doc.locales && (h("div", { className: "footer__grid__aside__switcher" },
                h("div", { className: "footer__grid__aside__switcher__label" },
                    h("span", { className: "material-icons" }, "language")),
                h("div", { className: "footer__grid__aside__switcher__form" },
                    h("select", null, [...doc.locales].map(locale => (h("option", { value: "{{localizedDoc.url.path}}", selected: pod.doc(doc.podPath, locale).locale === doc.locale }, locale.id)))))))))));
}
export default Footer;
//# sourceMappingURL=Footer.js.map