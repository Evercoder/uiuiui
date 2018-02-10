import React from 'react';
import EventListener from 'react-event-listener';

import { scaleLinear } from 'd3-scale';

import { to_step } from './util/numbers';

import './Pad.css';

import Surface from './Surface';

const initial_state = {
	transient_x: null,
	transient_y: null,
	interacting: false
};

class Pad extends React.PureComponent {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onStartInteraction = this.onStartInteraction.bind(this);
		this.onEndInteraction = this.onEndInteraction.bind(this);
		this.state = {
			...initial_state,
			transient_x: props.x,
			transient_y: props.y
		}
		this.computed_props(props);
	}

	componentWillReceiveProps(props) {
		this.setState({
			transient_x: props.x,
			transient_y: props.y
		});
		this.computed_props(props);
	}

	computed_props(props) {
		this.x_scale = scaleLinear()
			.domain([0, 100])
			.range([props.x_start, props.x_end])
			.clamp(true);

		this.y_scale = scaleLinear()
			.domain([0, 100])
			.range([props.y_start, props.y_end])
			.clamp(true);
	}

	format_x(value) {
		return to_step(value, this.props.x_step, this.props.x_precision);
	}

	format_y(value) {
		return to_step(value, this.props.y_step, this.props.y_precision);
	}

	onChange({x, y}) {
		let x_val = this.format_x(this.x_scale(x));
		let y_val = this.format_y(this.y_scale(y));
		if (x_val !== this.state.transient_x || y_val !== this.state.transient_y) {
			this.setState({
				transient_x: x_val,
				transient_y: y_val
			});
			this.props.onChange({ x: x_val, y: y_val });
		}
	}

	onStartInteraction() {
		this.setState({
			interacting: true
		});
	}

	onEndInteraction() {
		this.setState({
			interacting: false
		});
	}

	offset_x(dir) {
		this.setState(
			previous_state => {
				let proposed_value = previous_state.transient_x + this.props.x_step * dir;
				return { 
					transient_x: this.format_x(
						this.x_scale(
							this.x_scale.invert(proposed_value)
						)
					) 
				};
			},
			() => {
				this.props.onChange({ x: this.state.transient_x, y: this.state.transient_y });
			}
		);
	}

	offset_y(dir) {
		this.setState(
			previous_state => {
				let proposed_value = previous_state.transient_y + this.props.y_step * dir;
				return { 
					transient_y: this.format_y(
						this.y_scale(
							this.y_scale.invert(proposed_value)
						)
					) 
				};
			},
			() => {
				this.props.onChange({ x: this.state.transient_x, y: this.state.transient_y });
			}
		);
	}

	onKeyDown(e) {
		switch (e.key) {
			case 'ArrowUp':
				this.offset_y(-1);
				break;
			case 'ArrowDown':
				this.offset_y(1);
				break;
			case 'ArrowLeft':
				this.offset_x(-1);
				break;
			case 'ArrowRight':
				this.offset_x(1);
				break;
		}
	}

	render() {

		let {
			transient_x,
			transient_y,
			interacting
		} = this.state;

		return (
			<div 
				className='rc-pad'
				tabIndex='0'
				onKeyDown={this.onKeyDown}
			>
				<Surface
					onStartInteraction={this.onStartInteraction}
					onEndInteraction={this.onEndInteraction} 
					onChange={this.onChange}
				>
				{ 
					React.Children.map(
						this.props.children, 
						child => React.cloneElement(child, {
							x: transient_x,
							y: transient_y,
							x_scale: this.x_scale,
							y_scale: this.y_scale,
							interacting: interacting
						})
					) 
				}
				</Surface>
			</div>
		);
	}
}

Pad.defaultProps = {
	x_start: 0,
	x_end: 100,
	y_start: 0,
	y_end: 100,
	x_step: 1,
	y_step: 1,
	x_precision: 0,
	y_precision: 0,
	x: 50,
	y: 50
};

export default Pad;