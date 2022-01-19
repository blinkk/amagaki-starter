import {getClassName} from '../../utils/partials';
import {h} from 'preact';

enum SpacerStyles {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export interface SpacerOptions {
  options?: SpacerStyles[];
}

function Spacer({partial}: {partial: SpacerOptions}) {
  return <div className={getClassName('spacer', partial.options)}></div>;
}

export default Spacer;
