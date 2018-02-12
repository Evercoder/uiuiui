import React from 'react';
import EventListener from 'react-event-listener';
import { scaleLinear } from 'd3-scale';

const initial_state = {
	interacting: false
};

class Surface extends React.PureComponent {

	constructor(props) {
		super(props);

		this.register = this.register.bind(this);

		this.startInteraction = this.startInteraction.bind(this);
		this.doInteraction = this.doInteraction.bind(this);
		this.endInteraction = this.endInteraction.bind(this);

		this.state = initial_state;
	}

	register(wrapper) {
		this.wrapper = wrapper;
	}

	startInteraction(e) {
		this.setState({
			interacting: true
		});
		this.props.onStartInteraction();
		this.onChange(e);
		e.stopPropagation();
	}

	doInteraction(e) {
		this.onChange(e);
		e.preventDefault();
	}

	endInteraction(e) {
		this.setState({
			interacting: false
		});
		this.props.onEndInteraction();
	}

	onChange(e) {
		if (this.wrapper) {
			// TODO this could be cached on startInteraction() for better performance
			let rect = this.wrapper.getBoundingClientRect();
			this.props.onChange({
				x: this.props.x_scale.domain([rect.left, rect.right])(e.clientX), 
				y: this.props.y_scale.domain([rect.top, rect.bottom])(e.clientY)
			});
		}
	}

	render() {

		let {
			tabIndex,
			className
		} = this.props;

		let {
			interacting
		} = this.state;

		return (
			<div 
				className={`rc-surface ${className || ''}`}
				ref={this.register}
				onMouseDownCapture={this.startInteraction}
			>
				{
					interacting &&
						<EventListener 
							target='document'
							onMouseMove={this.doInteraction}
							onMouseUp={this.endInteraction}
						/>
				}

				{ this.props.children }
			</div>
		);
	}
}

Surface.defaultProps = {
	className: undefined,
	onStartInteraction: () => {},
	onEndInteraction: () => {},
	onChange: ({x, y}) => {},
	x_scale: scaleLinear().range([0, 100]).clamp(true),
	y_scale: scaleLinear().range([0, 100]).clamp(true)
};

export default Surface;