import React from 'react';
import EventListener from 'react-event-listener';
import { scaleLinear } from 'd3-scale';

const initial_state = {
	interacting: false
};

import './Pad.css';

class Pad extends React.PureComponent {

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
		if (wrapper) {

			let rect = wrapper.getBoundingClientRect();
			
			this.x_scale = scaleLinear()
				.domain([rect.left, rect.right])
				.range([0, 100])
				.clamp(true);

			this.y_scale = scaleLinear()
				.domain([rect.top, rect.bottom])
				.range([0, 100])
				.clamp(true);
		
		} else {
			this.wrapper_rectangle = null;
		}
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
		this.props.onChange({
			x: this.x_scale(e.clientX), 
			y: this.y_scale(e.clientY)
		});
	}

	render() {

		let {
			tabIndex
		} = this.props;

		let {
			interacting
		} = this.state;

		return (
			<div 
				className='rc-pad' 
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

Pad.defaultProps = {
	responsive: false,
	onStartInteraction: () => {},
	onEndInteraction: () => {},
	onChange: (coords) => {}
};

export default Pad;