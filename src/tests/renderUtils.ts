import { Block, renderDOM, Store } from '../core';
import {registerComponent} from "core";
import * as components from 'components';

import { defaultState } from '../store';

import Router from 'core/Router/Router';

type RenderBlockParams<T> = {
  Block: Block<T>;
  props: T;
  state?: Partial<AppState>;
}

export async function renderBlock<P extends Object>({ Block, props, state = defaultState }: RenderBlockParams<P>) {
  Object.values(components).forEach((Component: any) => {
    registerComponent(Component);
  });

  document.body.innerHTML = '<div id="app"></div>';

  renderDOM(new Block(props as P));

  /**
   * Ждем вызова componentDidMount,
   * медота жизненного цикла компонента,
   * который вызывается через 100мс в Block.getContent
   */
  await sleep();

}

export async function step(name: string, callback: () => void) {
  await callback();
}
function sleep(ms: number = 200) {
    return new Promise(r => setTimeout(r, ms));
}
