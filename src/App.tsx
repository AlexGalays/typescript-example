import * as React from 'react';
import { api as router } from 'abyssa';

import Transition from './util/ContentTransition';


interface Props extends React.Props<App> {};

export default class App extends React.Component<Props, {}> {
	render() {
		return (
			<div>
				<header>
				  <a href={ router.link('app.index') } data-nav="mousedown">Index</a>
				  <a href={ router.link('app.blue', { id: 33 }) } data-nav="mousedown">Blue</a>
				</header>

				<main>
					<Transition>
						{ this.props.children }
					</Transition>
				</main>
			</div>
		);
	}
};
