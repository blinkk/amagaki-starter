import Asset, {AssetOptions} from '../../components/asset/asset';
import Button, {ButtonOptions} from '../../components/button/button';

import {Document} from '@amagaki/amagaki';
import {getClassName} from '../../utils/partials';
import {h} from 'preact';

interface SimpleIntroOptions {
  options?: string[];
  images?: AssetOptions[];
  title?: string;
  body?: string;
  buttons?: ButtonOptions[];
}

function SimpleIntro({partial}: {partial: SimpleIntroOptions; doc: Document}) {
  return (
    <div className={getClassName('simple-intro', partial.options)}>
      <div className="simple-intro__grid">
        <div className="simple-intro__grid__content">
          {partial.title && (
            <div
              className="simple-intro__grid__content__title"
              role="heading"
              aria-level={2}
            >
              {partial.title}
            </div>
          )}
          {partial.body && (
            <div className="simple-intro__grid__content__body">
              {partial.body}
            </div>
          )}
          {partial.buttons && (
            <div className="simple-intro__grid__content__buttons">
              {partial.buttons?.map(button => (
                <Button {...button} />
              ))}
            </div>
          )}
          {partial.images && (
            <div className="simple-intro__grid__content__images">
              {partial.images?.map(image => (
                <Asset {...image} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimpleIntro;
