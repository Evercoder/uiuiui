import React from 'react';

class SliderHandle extends React.PureComponent {
	render() {
		let {
			value,
			scale,
			interacting
		} = this.props;

		let handle_styles = {
			left: scale.invert(value) + '%'
		};

		return (
			<span
				className={`rc-slider__handle ${ interacting ? 'rc-slider__handle--interacting': ''}`}
				style={handle_styles}
			/>
			
		);
	}
}

SliderHandle.defaultProps = {

};

export default SliderHandle;