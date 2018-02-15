import React from 'react';

class PadHandle extends React.PureComponent {
	render() {
		let {
			x,
			y,
			x_scale,
			y_scale,
			interacting,
			className
		} = this.props;

		let style = {
			left: x_scale.invert(x) + '%',
			top: y_scale.invert(y) + '%'
		};

		return (
			<span
				className={`
					uiuiui-pad__handle 
					${ interacting ? 'uiuiui-pad__handle--interacting': '' }
					${ className || '' }
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