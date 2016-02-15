import * as React from 'react';


export default class Green extends React.Component<any, void> {
	render() {
		const { children, params } = this.props;
		const id = params.id;

    return (
      <div id="green">
        Green (route id = {id})
      </div>
    );
	}
};
