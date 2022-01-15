import React from 'react';

enum ButtonStyles {
  HighEmphasis = 'high-emphasis',
  MediumEmphasis = 'medium-emphasis',
  LowEmphasis = 'low-emphasis',
}

export interface ButtonOptions {
  label: string;
  url?: string;
  ariaLabel?: string;
  options?: ButtonStyles[];
}

function getClassName(base: string, options?: ButtonStyles[]) {
  if (!options) {
    return base;
  }
  return `${base} ${options.map(option => `${base}--${option}`).join(' ')}`;
}

function Button({label, url, ariaLabel, options}: ButtonOptions) {
  return (
    <a
      className={getClassName('button', options)}
      href={url}
      aria-label={ariaLabel}
    >
      <span className="button__label">{label}</span>
    </a>
  );
}

export default Button;
