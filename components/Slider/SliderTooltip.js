import React from 'react';

class SliderTooltip extends React.PureComponent {
	render() {
		let {
			x,
			y,
			x_scale,
			y_scale,
			interacting,
			vertical
		} = this.props;

		if (!interacting) {
			return null;
		}

		let style = {
			[vertical ? 'top' : 'left']: (vertical ? y_scale.invert(y) : x_scale.invert(x)) + '%'
		};

		return (
			<span className='rc-slider__tooltip' style={style}>
				{vertical ? y : x}
			</span>
		);
	}
}

export default SliderTooltip;