import Asset, {AssetOptions} from '../../components/asset/asset';
import Button, {ButtonOptions} from '../../components/button/button';
import {Document, Pod} from '@amagaki/amagaki';

import React from 'react';

interface FooterOptions {
  nav: {
    url: {path: string};
    fields: Record<string, any>;
  }[];
}

function Footer({
  partial,
  doc,
  pod,
}: {
  partial: FooterOptions;
  doc: Document;
  pod: Pod;
}) {
  return (
    <div className="footer">
      <div className="footer__grid">
        <div className="footer__grid__links">
          {partial.nav?.map(item => (
            <a href="{item.url.path}" className="header__grid__links__link">
              {item.fields.navTitle}
            </a>
          ))}
        </div>
        <div className="footer__grid__aside">
          {doc.locales && (
            <div className="footer__grid__aside__switcher">
              <div className="footer__grid__aside__switcher__label">
                <span className="material-icons">language</span>
              </div>
              <div className="footer__grid__aside__switcher__form">
                <select onChange="window.location.href = this.value">
                  {[...doc.locales].map(locale => (
                    <option
                      value="{{localizedDoc.url.path}}"
                      selected={
                        pod.doc(doc.podPath, locale).locale === doc.locale
                      }
                    >
                      {locale.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
