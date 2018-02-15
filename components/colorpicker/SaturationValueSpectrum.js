import React from 'react';

import { valueSaturationGradient } from '../util/style';


class SaturationValueSpectrum extends React.PureComponent {
	render() {
		let { hue } = this.props;
		return (
			<div 
				className='uiuiui-spectrum uiuiui-spectrum--saturation-value'
				style={{ background: valueSaturationGradient(hue) }}
			>

			</div>
		);
	}
};

SaturationValueSpectrum.defaultProps = {
	hue: 0
};

export default SaturationValueSpectrum;