import React from 'react';
import PadHandle from '../Pad/PadHandle';

import './SliderHandle.css';

class SliderHandle extends React.PureComponent {
	render() {
		let slider_props = {
			[this.props.vertical ? 'x' : 'y']: 50
		};
		return (
			<PadHandle
				className={`
					uix-slider__handle
					${this.props.interacting ? 'uix-slider__handle--interacting' : ''}
				`}
				{...this.props}
				{...slider_props}
			/>
		);
	}
}

export default SliderHandle;
