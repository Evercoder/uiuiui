import React from 'react';

import { hueGradient } from '../util/style';

class Hue extends React.PureComponent {
	render() {

		let {
			direction
		} = this.props;

		return (
			<div 
				className='rc-spectrum rc-spectrum--hue'
				style={
					{
						background: hueGradient(direction)
					}
				}
			></div>
		);
	}
};

Hue.defaultProps = {
	direction: 'to right'
};

export default Hue;