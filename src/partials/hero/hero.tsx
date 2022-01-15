import Asset, {AssetOptions} from '../../components/asset/asset';
import Button, {ButtonOptions} from '../../components/button/button';

import React from 'react';
import {getClassName} from '../../utils/partials';

interface HeroOptions {
  options?: string[];
  title?: string;
  body?: string;
  assets?: AssetOptions[];
  buttons?: ButtonOptions[];
}

function Hero({partial}: {partial: HeroOptions}) {
  return (
    <div className={getClassName('hero', partial.options)}>
      <div className="hero__grid">
        <div className="hero__grid__content">
          <div
            className="hero__grid__content__title"
            aria-level={1}
            role="heading"
          >
            {partial.title}
          </div>
          <div className="hero__grid__content__body">{partial.body}</div>
          {partial.buttons && (
            <div className="hero__grid__content__buttons">
              {partial.buttons.map(button => (
                <div className="hero__grid__content__buttons__button">
                  <Button {...button} />
                </div>
              ))}
            </div>
          )}
          {partial.assets && (
            <div className="hero__grid__content__assets">
              {partial.assets.map(asset => (
                <Asset {...asset} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
