import React from 'react';
import PropTypes from 'prop-types';
import PadHandle from '../Pad/PadHandle';

import './SliderHandle.css';

class SliderHandle extends React.PureComponent {
	render() {
		let slider_props = {
			[this.props.vertical ? 'x' : 'y']: 50
		};
		let { className, ...others } = this.props;
		return (
			<PadHandle
				className={`
					uix-slider__handle
					${className}
					${this.props.interacting ? 'uix-slider__handle--interacting' : ''}
				`}
				{...others}
				{...slider_props}
			/>
		);
	}
}

SliderHandle.propTypes = {
	className: PropTypes.string
};

SliderHandle.defaultProps = {
	className: ''
};

export default SliderHandle;
