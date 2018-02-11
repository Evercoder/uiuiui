import React from 'react';
import chroma from 'chroma-js';

import { Checkerboard } from './';

import { opacityGradient } from '../util/style';

class Opacity extends React.Component {
	render() {

		let {
			color
		} = this.props;

		let hsl = chroma(color).hsl();

		console.log(opacityGradient(hsl));

		return (
			<div className='rc-spectrum rc-spectrum--opacity'>
				<Checkerboard/>
				<div 
					className='rc-spectrum'
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