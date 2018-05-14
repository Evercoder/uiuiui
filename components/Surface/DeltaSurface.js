import React from 'react';
import EventListener from 'react-event-listener';
import { scaleIdentity } from 'd3-scale';
import Surface from './Surface';
import { noop } from '../util/functions';

import './DeltaSurface.css';

class DeltaSurface extends React.Component {

	constructor(props) {
		super(props);
		
		this.start = this.start.bind(this);
		this.change = this.change.bind(this);
	}

	start(e) {
		this._initial_x = e.clientX;
		this._initial_y = e.clientY;
		e.preventDefault();
	}

	change({x, y}) {
		this.props.onChange({
			dx: x - this._initial_x,
			dy: y - this._initial_y
		});
	}

	render() {
		return (
			<Surface 
				className='uix-surface--delta'
				x_scale={scale_identity}
				y_scale={scale_identity}
				onStart={this.start}
				onChange={this.change}
				passive={this.props.passive}
				interacting={this.props.interacting}
			>
				{ this.props.children }
			</Surface>
		)
	}
}

const scale_identity = scaleIdentity();

DeltaSurface.defaultProps = {
	onChange: noop,
	passive: false,
	interacting: false
};

export default DeltaSurface;