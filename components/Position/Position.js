import React from 'react';
import EventListener from 'react-event-listener';

import { noop } from '../util/functions';

class Position extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.props.onChange({
			x: e.clientX,
			y: e.clientY,
			event: e
		});
	}

	render() {
		return (
			this.props.interacting ? 
				<EventListener
					target='document'
					onMouseMove={this.onChange} 
				/> : null
		)
	}
}

Position.defaultProps = {
	onChange: noop
};

export default Position;