import React from 'react';

class PadHandle extends React.PureComponent {
	render() {
		let {
			x,
			y,
			x_scale,
			y_scale,
			interacting
		} = this.props;

		let handle_styles = {};
		handle_styles['left'] = x_scale.invert(x) + '%';
		handle_styles['top'] = y_scale.invert(y) + '%';

		return (
			<span
				className={`rc-pad__handle ${ interacting ? 'rc-pad__handle--interacting': ''}`}
				style={handle_styles}
			/>
			
		);
	}
}

PadHandle.defaultProps = {

};

export default PadHandle;