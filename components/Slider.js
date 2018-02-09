import React from 'react';
import EventListener from 'react-event-listener';

import { scaleLinear } from 'd3-scale';

import './Slider.css';

const initial_state = {
	visible: false,
	sliding: false
};

class Slider extends React.Component {

	constructor(props) {
		super(props);
		this.startSlide = this.startSlide.bind(this);
		this.doSlide = this.doSlide.bind(this);
		this.endSlide = this.endSlide.bind(this);
		this.__register_wrapper = this.__register_wrapper.bind(this);
		this.state = {
			...initial_state,
			transient_value: props.value
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			transient_value: props.value
		});
	}

	startSlide(e) {
		this.setState({ 
			sliding: true,
			transient_value: this.value_scale(e.clientX)
		});
	}

	doSlide(e) {
		this.setState({
			transient_value: this.value_scale(e.clientX)
		});
	}

	endSlide(e) {
		this.setState({ sliding: false });
	}

	__register_wrapper(el) {
		this.__slider_wrapper = el;
		if (el) {
			this.setState({ visible: true });
			let rect = this.__slider_wrapper.getBoundingClientRect();
			let { min, max } = this.props;

			this.value_scale = scaleLinear()
				.domain([rect.left, rect.right])
				.range([min, max])
				.clamp(true);

			this.position_scale = scaleLinear()
				.domain([min, max])
				.range([0, 100])
				.clamp(true);
		} else {
			this.setState({ visible: false });
		}
		
	}

	render() {

		let {
			sliding,
			visible,
			transient_value
		} = this.state;

		let {
			min,
			max
		} = this.props;

		let rect, scale, slider_handle_style;
		if (visible && this.position_scale) {
			slider_handle_style = {
				left: this.position_scale(transient_value) + '%'
			};
		}

		return (
			<div 
				className='rc-slider' 
				ref={this.__register_wrapper}
				onMouseDown={this.startSlide}
				tabIndex='0'
			>
				{
					visible && 
						<span 
							className='rc-slider__handle'
							style={slider_handle_style}
							tabIndex='0'
						/>
				}
				

				{
					sliding && 
						<EventListener 
							target='document'
							onMouseMove={this.doSlide}
							onMouseUp={this.endSlide}
						/>
				}
			</div>
		);
	}
}

Slider.defaultProps = {
	min: 0,
	max: 100,
	step: 1,
	value: 50
};

export default Slider;