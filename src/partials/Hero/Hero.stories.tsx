/** @jsx h */

import '../../components/Button/Button.sass';
import './Hero.sass';

import Hero, {HeroProps} from './Hero';

import {ButtonOptions} from '../../components/Button/Button';
import {h} from 'preact';

export default {
  title: 'Partials/Hero',
  component: Hero,
};

const Template = (partial: HeroProps) => {
  return <Hero partial={partial} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Lorem ipsum dolor',
  body:
    'Eu mollit ullamco nisi eu ipsum aliqua occaecat excepteur ullamco magna consectetur. Adipisicing ipsum laborum sunt eu qui laborum pariatur aliqua duis dolore id.',
  buttons: [
    {
      label: 'Learn more',
      options: [ButtonOptions.HighEmphasis],
    },
    {
      label: 'Learn more',
      options: [ButtonOptions.LowEmphasis],
    },
  ],
};
