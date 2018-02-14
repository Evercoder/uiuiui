import React from 'react';

class SliderProgress extends React.PureComponent {
	render() {
		let {
			value,
			scale,
			vertical,
			interacting
		} = this.props;

		let style = {};
		if (vertical) {
			style['height'] = (100 - scale.invert(value)) + '%';
		} else {
			style['width'] = scale.invert(value) + '%';
		}

		return (
			<span
				className={`
					rc-slider__progress 
					${ interacting ? 'rc-slider__progress--interacting' : '' }
				`}
				style={style}
			/>
			
		);
	}
}

export default SliderProgress;