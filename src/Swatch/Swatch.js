import React from 'react';
import PropTypes from 'prop-types';

import './Swatch.css';

const Swatch = ({ className, color, title, children }) => (
	<div
		className={`
			uix-swatch
			${className || ''}
		`}
		title={title}
	>
		{children}
		<div className="uix-swatch__inner" style={{ backgroundColor: color }} />
	</div>
);

Swatch.propTypes = {};

export default Swatch;
