import React from 'react';
import EventListener from 'react-event-listener';
import { scaleLinear } from 'd3-scale';

import { Position } from '../Position';

import { noop } from '../util/functions';

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

		this.insert = this.insert.bind(this);

		this.state = initial_state;
		
	}

	register(wrapper) {
		this.wrapper = wrapper;
	}

	startInteraction(e) {
		this.setState({
			interacting: true
		});
		this.props.onStartInteraction(e);
		this.onChange(e);
		e.stopPropagation();
	}

	doInteraction(e) {
		this.onChange(e);
		e.event.preventDefault();
	}

	endInteraction(e) {
		this.setState({
			interacting: false
		});
		this.props.onEndInteraction(e);
	}

	scale(e) {
		if (this.wrapper) {
			// TODO this could be cached on startInteraction() for better performance
			let rect = this.wrapper.getBoundingClientRect();
			return {
				x: this.props.x_scale.domain([rect.left, rect.right])(e.x || e.clientX), 
				y: this.props.y_scale.domain([rect.top, rect.bottom])(e.y || e.clientY)
			}
		}
	}

	onChange(e) {
		this.props.onChange(this.scale(e), this.props.property);
	}

	insert(e) {
		this.props.onInsert(this.scale(e), this.props.property);
	}

	render() {

		let {
			className,
			passive
		} = this.props;

		let interacting = passive ? 
			this.props.interacting : 
			this.state.interacting;

		return (
			<div 
				className={`rc-surface ${className || ''}`}
				ref={this.register}
				onMouseDownCapture={passive ? null : this.startInteraction}
				onDoubleClick={passive ? this.insert : null}
			>
				<Position 
					interacting={interacting} 
					onChange={this.doInteraction}
					onDone={this.endInteraction}
				/>

				{ this.props.children }
			</div>
		);
	}
}

const linear_percentage_x = scaleLinear().range([0, 100]).clamp(true);
const linear_percentage_y = scaleLinear().range([0, 100]).clamp(true);

Surface.defaultProps = {
	property: undefined,
	className: undefined,
	onStartInteraction: noop,
	onEndInteraction: noop,
	onChange: noop,
	onInsert: noop,
	x_scale: linear_percentage_x,
	y_scale: linear_percentage_y,
	passive: false
};

export default Surface;