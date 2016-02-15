import * as React from 'react';
import connect from 'fluxx/lib/ReactConnector';

import store from './store';
import { incrementRed } from './action';


interface StoreProps {
	count: number
}

class Red extends React.Component<StoreProps, void> {
	render() {
    return (
			<div id="red">
				<div className="increment">
					<span>Count: { this.props.count }</span>
					<button onClick={ incrementRedBy10 }>Increment</button>
				</div>
			</div>
		);
	}
};

export default connect(Red, store, (state): StoreProps => (
	{ count: state.blue.red.count }
));

function incrementRedBy10() {
	incrementRed(10);
}
