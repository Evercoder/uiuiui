import React from 'react';

class SliderProgress extends React.PureComponent {
	render() {
		let {
			value,
			scale
		} = this.props;

		let handle_styles = {
			width: scale.invert(value) + '%'
		};

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