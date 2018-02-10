import React from 'react';

class OpacitySpectrum extends React.PureComponent {
	render() {
		let { 
			hue, 
			saturation, 
			value 
		} = this.props;
		return (
			<div className='rc-spectrum rc-spectrum--opacity'></div>
		);
	}
};

OpacitySpectrum.defaultProps = {
	hue: 0,
	saturation: 0,
	value: 0
};

export default OpacitySpectrum;