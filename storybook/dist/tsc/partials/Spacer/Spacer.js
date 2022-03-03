import { getClassName } from '../../utils/partials';
import { h } from 'preact';
var SpacerOptions;
(function (SpacerOptions) {
    SpacerOptions["Small"] = "small";
    SpacerOptions["Medium"] = "medium";
    SpacerOptions["Large"] = "large";
})(SpacerOptions || (SpacerOptions = {}));
function Spacer({ partial }) {
    return h("div", { className: getClassName('spacer', partial.options) });
}
export default Spacer;
//# sourceMappingURL=Spacer.js.map