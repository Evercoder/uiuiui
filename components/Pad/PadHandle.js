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

		let style = {
			left: x_scale.invert(x) + '%',
			top: y_scale.invert(y) + '%'
		};

		return (
			<span
				className={`
					rc-pad__handle 
					${ interacting ? 'rc-pad__handle--interacting': '' }
				`}
				style={style}
			/>
		);
	}
}

export default PadHandle;