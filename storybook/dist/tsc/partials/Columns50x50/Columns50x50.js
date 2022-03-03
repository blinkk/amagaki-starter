import Asset from '../../components/Asset/Asset';
import Button from '../../components/Button/Button';
import { getClassName } from '../../utils/partials';
import { h } from 'preact';
function Columns50x50({ partial }) {
    var _a, _b;
    return (h("div", { className: getClassName('columns-50x50', partial.options) },
        h("div", { className: "columns-50x50__grid" },
            partial.secondary && (h("div", { className: "columns-50x50__grid__secondary" }, (_a = partial.secondary.assets) === null || _a === void 0 ? void 0 : _a.map(asset => (h("div", { className: "columns-50x50__grid__secondary__asset" },
                h(Asset, { ...asset })))))),
            partial.primary && (h("div", { className: "columns-50x50__grid__primary" },
                partial.primary.eyebrow && (h("div", { className: "columns-50x50__grid__primary__eyebrow" }, partial.primary.eyebrow)),
                partial.primary.title && (h("div", { className: "columns-50x50__grid__primary__title", role: "heading", "aria-level": 2 }, partial.primary.title)),
                partial.primary.body && (h("div", { className: "columns-50x50__grid__primary__body" }, partial.primary.body)), (_b = partial.primary.buttons) === null || _b === void 0 ? void 0 :
                _b.map(button => (h("div", { className: "columns-50x50__grid__primary__buttons" },
                    h(Button, { ...button })))))))));
}
export default Columns50x50;
//# sourceMappingURL=Columns50x50.js.map