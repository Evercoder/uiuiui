import React from 'react';

class SliderProgress extends React.PureComponent {
	render() {
		let {
			value,
			scale,
			vertical
		} = this.props;

		let handle_styles = {};
		if (vertical) {
			handle_styles['height'] = (100 - scale.invert(value)) + '%';
		} else {
			handle_styles['width'] = scale.invert(value) + '%';
		}

		return (
			<span
				className='rc-slider__progress'
				style={handle_styles}
			/>
			
		);
	}
}

SliderProgress.defaultProps = {

};

export default SliderProgress;