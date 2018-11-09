import React from 'react';

import './SliderProgress.css';

class SliderProgress extends React.PureComponent {
	render() {
		let { x, y, x_scale, y_scale, vertical, interacting } = this.props;

		let style = {};
		if (vertical) {
			style['height'] = 100 - y_scale.invert(y) + '%';
		} else {
			style['width'] = x_scale.invert(x) + '%';
		}

		return (
			<span
				className={`
					uix-slider__progress 
					${interacting ? 'uix-slider__progress--interacting' : ''}
				`}
				style={style}
			/>
		);
	}
}

export default SliderProgress;
