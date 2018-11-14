import React from 'react';
import PropTypes from 'prop-types';

import range from '../util/range';

import './PadGrid.css';

class PadGrid extends React.PureComponent {
	render() {
		let { x_step, y_step, className } = this.props;

		let width = 100;
		let height = 100;

		let x_steps = range(x_step ? Math.floor(width / x_step) : 0).slice(1);
		let y_steps = range(y_step ? Math.floor(height / y_step) : 0).slice(1);

		let x_path = x_steps.map(step => `M ${step * x_step} 0 v ${height}`).join(' ');
		let y_path = y_steps.map(step => `M 0 ${step * y_step} h ${width}`).join(' ');

		return (
			<svg
				className={`
					uix-pad__grid
					${className || ''}
				`}
				viewBox={`0 0 ${width} ${height}`}
				preserveAspectRatio="none"
			>
				<rect className="uix-pad__grid-background" x="0" y="0" width="100%" height="100%" />
				<path className="uix-pad__grid-lines uix-pad__grid-lines--x" d={x_path} />

				<path className="uix-pad__grid-lines uix-pad__grid-lines--y" d={y_path} />
			</svg>
		);
	}
}

PadGrid.propTypes = {};

PadGrid.defaultProps = {};

export default PadGrid;
