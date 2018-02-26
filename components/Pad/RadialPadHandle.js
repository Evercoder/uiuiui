import React from 'react';

import { polar_scale } from '../util/math';

class RadialPadHandle extends React.Component {
	render() {
		let {
			r,
			t,
			r_scale,
			t_scale,
			interacting
		} = this.props;

		let { x, y } = polar_scale.invert(r_scale.invert(r), t_scale.invert(t));

		let handle_styles = {
			left: (x + 50) + '%',
			top: (50 - y) + '%'
		};

		return (
			<div 
				className='uix-radialpad__handle'
				style={handle_styles}
			>

			</div>
		);
	}
}

RadialPadHandle.defaultProps = {};

export default RadialPadHandle;