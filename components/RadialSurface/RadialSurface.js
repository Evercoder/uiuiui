import React from 'react';
import EventListener from 'react-event-listener';

import { scaleLinear } from 'd3-scale';

import { polar_scale } from '../util/numbers';

import Surface from '../Surface';

class RadialSurface extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange({x, y}) {

		let {r, t} = polar_scale(x - 50, y - 50);

		console.log(x, y, r, t);

		this.props.onChange({
			r: r * 2,
			t: t
		});
	}

	render() {
		return (
			<Surface
				onChange={this.onChange}
				onInteractionStart={this.props.onInteractionStart}
				onInteractionEnd={this.props.onInteractionEnd}
			>
				{ this.props.children }
			</Surface>
		);
	}
}

RadialSurface.defaultProps = {
	onChange: ({r, t}) => {},
	onInteractionStart: undefined,
	onInteractionEnd: undefined
};

export default RadialSurface;