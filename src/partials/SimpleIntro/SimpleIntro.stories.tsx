/** @jsx h */

import '../../components/Button/Button.sass';
import './SimpleIntro.sass';

import SimpleIntro, {SimpleIntroProps} from './SimpleIntro';

import {ButtonOptions} from '../../components/Button/Button';
import {h} from 'preact';

export default {
  title: 'Partials/SimpleIntro',
  component: SimpleIntro,
};

const Template = (partial: SimpleIntroProps) => {
  return <SimpleIntro partial={partial} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Lorem ipsum dolor',
  body:
    'Eu mollit ullamco nisi eu ipsum aliqua occaecat excepteur ullamco magna consectetur. Adipisicing ipsum laborum sunt eu qui laborum pariatur aliqua duis dolore id.',
  buttons: [
    {
      label: 'Learn more',
      options: [ButtonOptions.MediumEmphasis],
    },
  ],
};
