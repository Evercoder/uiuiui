import React from 'react';

class SliderTooltip extends React.PureComponent {
	render() {
		let {
			value,
			scale,
			interacting,
			vertical
		} = this.props;

		if (!interacting) {
			return null;
		}

		let style = {
			[vertical ? 'top' : 'left']: scale.invert(value) + '%'
		};

		return (
			<span className='rc-slider__tooltip' style={style}>
				{value}
			</span>
		);
	}
}

export default SliderTooltip;