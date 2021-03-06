import React from 'react';
import PropTypes from 'prop-types';

import PadTooltip from '../Pad/PadTooltip';

import './SliderTooltip.css';

const show_x = (x, y) => x;
const show_y = (x, y) => y;

class SliderTooltip extends React.PureComponent {
	render() {
		let slider_props = {
			[this.props.vertical ? 'x' : 'y']: 50,
			label: this.props.vertical ? show_y : show_x
		};

		return <PadTooltip className="uix-slider__tooltip" {...this.props} {...slider_props} />;
	}
}

SliderTooltip.propTypes = {};

export default SliderTooltip;
