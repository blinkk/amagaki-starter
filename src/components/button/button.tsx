import React from 'react';
import {getClassName} from '../../utils/partials';

export enum ButtonStyles {
  HighEmphasis = 'high-emphasis',
  MediumEmphasis = 'medium-emphasis',
  LowEmphasis = 'low-emphasis',
}

export interface ButtonOptions {
  label: string;
  url?: string;
  ariaLabel?: string;
  onClick?: any;
  options?: ButtonStyles[];
}

function Button({label, url, ariaLabel, options, onClick}: ButtonOptions) {
  return (
    <a
      className={getClassName('button', options)}
      href={url}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <span className="button__label">{label}</span>
    </a>
  );
}

export default Button;
