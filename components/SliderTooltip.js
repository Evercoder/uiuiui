import React from 'react';

class SliderTooltip extends React.PureComponent {
	render() {
		let {
			value,
			scale,
			interacting
		} = this.props;

		if (!interacting) {
			return null;
		}

		let handle_styles = {
			left: scale.invert(value) + '%'
		};

		return (
			<span
				className='rc-slider__tooltip'
				style={handle_styles}
			>
				{value}
			</span>
			
		);
	}
}

SliderTooltip.defaultProps = {

};

export default SliderTooltip;