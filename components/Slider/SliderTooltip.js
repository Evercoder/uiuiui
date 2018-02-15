import React from 'react';

import { PadTooltip } from '../Pad';

const show_x = (x, y) => x;
const show_y = (x, y) => y;

class SliderTooltip extends React.PureComponent {
	render() {
		let slider_props = {
			[this.props.vertical ? 'x' : 'y'] : 50,
			label: this.props.vertical ? show_y : show_x
		};

		return (
			<PadTooltip 
				className='uiuiui-slider__tooltip' 
				{...this.props}
				{...slider_props}
			/>
		);
	}
}

export default SliderTooltip;