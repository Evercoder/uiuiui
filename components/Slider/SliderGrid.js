import React from 'react';

import { PadGrid } from '../Pad';

class SliderGrid extends React.PureComponent {
	render() {
		let {
			x_step,
			y_step,
			vertical
		} = this.props;

		let slider_props = {
			[vertical ? 'x_step' : 'y_step']: 0
		}

		return <PadGrid 
			className={`
				uiuiui-slider__grid
				${ this.props.interacting ? 'uiuiui-slider__grid--interacting' : '' }
			`}
			{...this.props} 
			{...slider_props} 
		/>;
	}
}

export default SliderGrid;