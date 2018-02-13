import React from 'react';
import EventListener from 'react-event-listener';

import { scaleIdentity } from 'd3-scale';

import Surface from '../Surface';

import { noop } from '../util/functions';

class DeltaSurface extends React.Component {

	constructor(props) {
		super(props);
		
		this.startInteraction = this.startInteraction.bind(this);
		this.doInteraction = this.doInteraction.bind(this);
	}

	startInteraction(e) {
		this._initial_x = e.clientX;
		this._initial_y = e.clientY;
		e.preventDefault();
	}

	doInteraction({x, y}) {
		this.props.onChange({
			x: x - this._initial_x,
			y: y - this._initial_y
		});
	}

	render() {
		return (
			<Surface 
				className='rc-deltasurface'
				x_scale={identity_scale}
				y_scale={identity_scale}
				onStartInteraction={this.startInteraction}
				onChange={this.doInteraction}
			>
				{ this.props.children }
			</Surface>
		)
	}
}

const identity_scale = scaleIdentity();

DeltaSurface.defaultProps = {
	onChange: noop
};

export default DeltaSurface;