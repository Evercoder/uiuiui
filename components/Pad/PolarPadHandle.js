import React from 'react';
import scalePolar from '../util/scalePolar';

import './PolarPadHandle.css';

class PolarPadHandle extends React.Component {
	render() {
		let {
			r,
			t,
			r_scale,
			t_scale,
			interacting
		} = this.props;

		let { x, y } = scalePolar.invert(r_scale.invert(r), t_scale.invert(t));

		let handle_styles = {
			left: (x + 50) + '%',
			top: (50 - y) + '%'
		};

		return (
			<div 
				className='uix-polarpad__handle'
				style={handle_styles}
			>

			</div>
		);
	}
}

PolarPadHandle.defaultProps = {};

export default PolarPadHandle;