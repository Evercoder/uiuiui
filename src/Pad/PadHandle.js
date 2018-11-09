import React from 'react';
import './PadHandle.css';

class PadHandle extends React.PureComponent {
	render() {
		let { x, y, x_scale, y_scale, interacting, className } = this.props;

		let style = {
			left: x_scale.invert(x) + '%',
			top: y_scale.invert(y) + '%'
		};

		return (
			<span
				className={`
					uix-pad__handle 
					${interacting ? 'uix-pad__handle--interacting' : ''}
					${className || ''}
				`}
				style={style}
			/>
		);
	}
}

PadHandle.defaultProps = {
	className: undefined
};

export default PadHandle;
