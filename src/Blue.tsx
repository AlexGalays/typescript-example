import * as React from 'react';
import { api as router } from 'abyssa';
import connect from 'fluxx/lib/ReactConnector';

import Transition from './util/ContentTransition';
import store from './store';
import { incrementBlue } from './action';


interface ParentProps {
	params: { id: string }
}

interface StoreProps {
	count: number
}

type Props = ParentProps & StoreProps & React.Props<Blue>;

class Blue extends React.Component<Props, void> {
	render() {
		const { count, params: { id } } = this.props;

		return (
      <div id="blue">
        <h1>Blue screen</h1>

        <a href={ router.link('app.blue.green', { id }) } data-nav="mousedown">Green</a>
        <a href={ router.link('app.blue.red', { id }) } data-nav="mousedown">Red</a>

				<div className="increment">
					<span>Count: { count }</span>
					<button onClick={ incrementBlue }>Increment</button>
				</div>

        <Transition>
					{ this.props.children }
				</Transition>
      </div>
		);
	}
};


export default connect(Blue, store, (state): StoreProps => (
	{ count: state.blue.count }
));
