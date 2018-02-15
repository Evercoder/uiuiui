import React from 'react';

class PadTooltip extends React.PureComponent {
	render() {
		let {
			x,
			y,
			x_scale,
			y_scale,
			interacting,
			className,
			label
		} = this.props;

		if (!interacting) {
			return null;
		}

		let style = {
			top: y_scale.invert(y) + '%',
			left: x_scale.invert(x) + '%'
		};

		return (
			<span 
				className={`
					uiuiui-pad__tooltip ${className || ''}
				`}
				style={style}
			>
				{ label(x,y) }
			</span>
		);
	}
}

PadTooltip.defaultProps = {
	label: (x, y) => `${x}:${y}`
};

export default PadTooltip;