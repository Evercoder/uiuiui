import React from 'react';
import PropTypes from 'prop-types';

import './PadTooltip.css';

class PadTooltip extends React.PureComponent {
	render() {
		let { x, y, x_scale, y_scale, interacting, className, label } = this.props;

		if (!interacting) {
			return null;
		}

		let style = {
			top: y_scale.invert(y) + '%',
			left: x_scale.invert(x) + '%'
		};

		return (
			<span
				className={`
					uix-pad__tooltip ${className || ''}
				`}
				style={style}
			>
				{label(x, y)}
			</span>
		);
	}
}

PadTooltip.propTypes = {
	label: PropTypes.func
};

PadTooltip.defaultProps = {
	label: (x, y) => `${x}:${y}`
};

export default PadTooltip;
