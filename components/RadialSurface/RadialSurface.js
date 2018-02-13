import React from 'react';
import EventListener from 'react-event-listener';

import { scaleLinear } from 'd3-scale';

import { polar_scale } from '../util/math';
import { noop } from '../util/functions';

import Surface from '../Surface';

const x_scale = scaleLinear().range([-50, 50]).clamp(true);
const y_scale = scaleLinear().range([50, -50]).clamp(true);

class RadialSurface extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange({x, y}) {

		let { r, t } = polar_scale(x, y);
		
		this.props.onChange({
			r: Math.min(r, 50),
			t: t
		});
	}

	render() {
		return (
			<Surface
				className='rc-surface--radial'
				onChange={this.onChange}
				onInteractionStart={this.props.onInteractionStart}
				onInteractionEnd={this.props.onInteractionEnd}
				x_scale={x_scale}
				y_scale={y_scale}
				passive={this.props.passive}
			>
				{ this.props.children }
			</Surface>
		);
	}
}

RadialSurface.defaultProps = {
	onChange: noop,
	onInteractionStart: undefined,
	onInteractionEnd: undefined,
	passive: false
};

export default RadialSurface;