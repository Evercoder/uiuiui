import React from 'react';
import PropTypes from 'prop-types';

import range from '../util/range';

import './BandPadProgress.css';

class BandPadProgress extends React.PureComponent {
	render() {
		let { bands, values } = this.props;

		return (
			<div className="uix-bandpad__progress">
				{range(bands).map(idx => {
					let band_style = {
						height: `${values[idx]}%`,
						width: `${100 / bands}%`,
						left: `${(100 / bands) * idx}%`
					};

					return (
						<div key={idx} className="uix-bandpad__progress-band" style={band_style} />
					);
				})}
			</div>
		);
	}
}

BandPadProgress.propTypes = {};

BandPadProgress.defaultProps = {};

export default BandPadProgress;
