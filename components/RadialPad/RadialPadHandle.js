import React from 'react';

import { polar_scale } from '../util/numbers';

class RadialPadHandle extends React.Component {
	render() {
		let {
			r,
			t,
			r_scale,
			t_scale,
			interacting
		} = this.props;

		let { x, y } = polar_scale.invert(r_scale.invert(r) / 2, t_scale.invert(t));

		console.log(x,y);

		let handle_styles = {
			left: (x + 50) + '%',
			top: (y + 50) + '%'
		};

		return (
			<div 
				className='rc-radialpad__handle'
				style={handle_styles}
			>

			</div>
		);
	}
}

RadialPadHandle.defaultProps = {};

export default RadialPadHandle;