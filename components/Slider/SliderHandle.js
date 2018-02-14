import React from 'react';

class SliderHandle extends React.PureComponent {
	render() {
		let {
			value,
			scale,
			vertical,
			interacting
		} = this.props;

		let style = {
			[vertical ? 'top' : 'left']: scale.invert(value) + '%'
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