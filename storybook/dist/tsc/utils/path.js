import { DataType } from '@amagaki/amagaki';
const ABSOLUTE_URL_REGEX = new RegExp('^(//|[a-z]+:)', 'i');
// Adopted from node's `path`.
function trimArray(arr) {
    const lastIndex = arr.length - 1;
    let start = 0;
    for (; start <= lastIndex; start++) {
        if (arr[start])
            break;
    }
    let end = lastIndex;
    for (; end >= 0; end--) {
        if (arr[end])
            break;
    }
    if (start === 0 && end === lastIndex)
        return arr;
    if (start > end)
        return [];
    return arr.slice(start, end + 1);
}
function relativePath(from, to) {
    const fromParts = trimArray(from.split('/'));
    const toParts = trimArray(to.split('/'));
    const length = Math.min(fromParts.length, toParts.length);
    let samePartsLength = length;
    for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
        }
    }
    let outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push('..');
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join('/');
}
export class Url {
    /**
     * Creates Url instance. If host, scheme, and port are supplied options, those
     * values will be used. By default, a reference to the pod's environment is
     * used instead.
     */
    constructor(options) {
        this.path = options.path;
        this.env = options.env;
        this._host = options.host;
        this._scheme = options.scheme;
        this._port = options.port;
    }
    get host() {
        var _a;
        return this._host || ((_a = this.env) === null || _a === void 0 ? void 0 : _a.host);
    }
    get scheme() {
        var _a;
        return this._scheme || ((_a = this.env) === null || _a === void 0 ? void 0 : _a.scheme);
    }
    get port() {
        var _a;
        return this._port || ((_a = this.env) === null || _a === void 0 ? void 0 : _a.port);
    }
    toString() {
        if (this.port) {
            return `${this.scheme}://${this.host}:${this.port}${this.path}`;
        }
        return `${this.scheme}://${this.host}${this.path}`;
    }
    /**
     * Returns a URL relative to another URL. Accepts both `Document` objects
     * (i.e. for returning the URL of one document relative to another) or URLs as
     * strings. Accepts both full URLs or paths only.
     * @param other The `Document` or URL being linked to.
     * @param base The `Document` or URL being linked from.
     * @returns The URL of `other` relative to `base`.
     */
    static relative(other, base) {
        var _a, _b;
        const otherUrl = (DataType.isDocument(other) ? (_a = other.url) === null || _a === void 0 ? void 0 : _a.path : other);
        const baseUrl = (DataType.isDocument(base) ? (_b = base.url) === null || _b === void 0 ? void 0 : _b.path : base);
        if (!otherUrl || !baseUrl || ABSOLUTE_URL_REGEX.test(otherUrl)) {
            return otherUrl;
        }
        const result = typeof baseUrl === 'string' && typeof otherUrl === 'string'
            ? relativePath(baseUrl, otherUrl)
            : undefined;
        // Relative URL couldn't be determined, return an absolute URL.
        if (result === undefined) {
            return otherUrl;
        }
        if (!result || result === '/') {
            return otherUrl.endsWith('/') ? './' : '.';
        }
        return otherUrl.endsWith('/') ? `./${result}/` : `./${result}`;
    }
}
//# sourceMappingURL=path.js.map