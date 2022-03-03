export function getClassName(base, options) {
    if (!options) {
        return base;
    }
    return `${base} ${options.map(option => `${base}--${option}`).join(' ')}`;
}
//# sourceMappingURL=partials.js.map