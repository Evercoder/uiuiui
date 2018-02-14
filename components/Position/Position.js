import React from 'react';
import EventListener from 'react-event-listener';

import { noop } from '../util/functions';

class Position extends React.PureComponent {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onDone = this.onDone.bind(this);
	}

	onChange(e) {
		this.props.onChange({
			x: e.clientX,
			y: e.clientY,
			event: e
		});
	}

	onDone(e) {
		this.props.onDone({
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
					onMouseUp={this.onDone}
				/> : null
		)
	}
}

Position.defaultProps = {
	onChange: noop,
	onDone: noop
};

export default Position;