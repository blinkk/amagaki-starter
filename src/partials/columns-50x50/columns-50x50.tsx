import Asset, {AssetOptions} from '../../components/asset/asset';
import Button, {ButtonOptions} from '../../components/button/button';

import {getClassName} from '../../utils/partials';
import {h} from 'preact';

export interface Columns5050Options {
  options?: string[];
  primary?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    buttons?: ButtonOptions[];
  };
  secondary?: {
    assets?: AssetOptions[];
  };
}

function Columns5050({partial}: {partial: Columns5050Options}) {
  return (
    <div className={getClassName('columns-50x50', partial.options)}>
      <div className="columns-50x50__grid">
        {partial.secondary && (
          <div className="columns-50x50__grid__secondary">
            {partial.secondary.assets?.map(asset => (
              <div className="columns-50x50__grid__secondary__asset">
                <Asset {...asset} />
              </div>
            ))}
          </div>
        )}
        {partial.primary && (
          <div className="columns-50x50__grid__primary">
            {partial.primary.eyebrow && (
              <div className="columns-50x50__grid__primary__eyebrow">
                {partial.primary.eyebrow}
              </div>
            )}
            {partial.primary.title && (
              <div
                className="columns-50x50__grid__primary__title"
                role="heading"
                aria-level={2}
              >
                {partial.primary.title}
              </div>
            )}
            {partial.primary.body && (
              <div className="columns-50x50__grid__primary__body">
                {partial.primary.body}
              </div>
            )}
            {partial.primary.buttons?.map(button => (
              <div className="columns-50x50__grid__primary__buttons">
                <Button {...button} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Columns5050;
