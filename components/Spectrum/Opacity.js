import React from 'react';
import chroma from 'chroma-js';

import { Checkerboard } from './';

import { opacityGradient } from '../util/style';

class Opacity extends React.PureComponent {
	render() {

		let {
			color
		} = this.props;

		let hsl = chroma(color).hsl();

		return (
			<div className='uix-spectrum uix-spectrum--opacity'>
				<Checkerboard/>
				<div 
					className='uix-spectrum'
					style={
						{
							background: opacityGradient(hsl)
						}
					}
				></div>
			</div>
		);
	}
}

Opacity.defaultProps = {
	color: "#000"
}

export default Opacity;