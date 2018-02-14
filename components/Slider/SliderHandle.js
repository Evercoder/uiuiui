import React from 'react';

class SliderHandle extends React.PureComponent {
	render() {
		let {
			x,
			y,
			x_scale,
			y_scale,
			vertical,
			interacting
		} = this.props;

		let style = {
			[vertical ? 'top' : 'left']: (
				vertical ? y_scale.invert(y) : x_scale.invert(x) 
			) + '%'
		};

		return (
			<span
				className={`
					rc-slider__handle 
					${ interacting ? 'rc-slider__handle--interacting' : '' }
				`}
				style={style}
			/>
			
		);
	}
}

export default SliderHandle;