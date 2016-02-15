/* Translate + fade transition for an only child */

import * as React from 'react';

declare var require: any;
require('gsap/src/uncompressed/plugins/CSSPlugin');
require('gsap/src/uncompressed/TweenLite');
const { TweenLite, Power1 } = window as any;

import SwapTransition from './SwapTransition';


interface Props {
  children?: any;
}

export default class ContentTransition extends React.Component<Props, {}> {

  render() {
    return(
      <SwapTransition { ...this.props } enter={ enter } exit={ exit } />
    );
  }
};

export function enter(el: Element) {
  const from = { css: { x: 30, opacity: 0 } };
  const to = { css: { x: 0, opacity: 1 }, delay: 0.08, ease: Power1.easeOut };

  return TweenLite.fromTo(el, 0.18, from, to);
}

export function exit(el: Element) {
  const from = { css: { x: 0, opacity: 1 } };
  const to = { css: { x: 30, opacity: 0 }, ease: Power1.easeIn };

  return TweenLite.fromTo(el, 0.13, from, to);
}
