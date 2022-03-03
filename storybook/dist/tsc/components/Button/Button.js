/** @jsx h */
import { getClassName } from '../../utils/partials';
import { h } from 'preact';
export var ButtonOptions;
(function (ButtonOptions) {
    ButtonOptions["HighEmphasis"] = "high-emphasis";
    ButtonOptions["MediumEmphasis"] = "medium-emphasis";
    ButtonOptions["LowEmphasis"] = "low-emphasis";
})(ButtonOptions || (ButtonOptions = {}));
function Button({ label, url, ariaLabel, options, onClick }) {
    return (h("a", { className: getClassName('button', options), href: url, "aria-label": ariaLabel, onClick: onClick },
        h("span", { className: "button__label" }, label)));
}
export default Button;
//# sourceMappingURL=Button.js.map